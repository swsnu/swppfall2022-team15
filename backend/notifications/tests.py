import json
from unittest import mock
from unittest.mock import call

from django.test import TestCase
from django.utils import timezone

from model_bakery import baker
from rest_framework.test import APITestCase

from account.models import User
from nmessages.models import NMessage
from notifications.models import (
    EnumNotificationType,
    NotificationConfig,
    Reservation,
    Notification,
    EnumNotificationStatus, EnumReservationStatus,
)
from notifications.services import (
    task_send_api_notification,
    task_spawn_notification_by_chunk,
    task_handle_chunk_notification,
    cron_task_handle_reservation,
    task_bulk_create_notification,
)
from project.models import Project
from targetusers.models import TargetUser


class NotificationAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_create_notification(self):
        # Given
        project = baker.make(Project)
        message = baker.make(NMessage)
        target = baker.make(TargetUser)

        # When
        response = self.client.post(
            '/api/notification/',
            data={
                'message': message.id,
                'target': target.id,
                'project': project.id,
                'type': EnumNotificationType.HTTP,
            }
        )

        # Then
        self.assertEqual(response.status_code, 201)


class ReservationAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    @mock.patch('notifications.services.task_bulk_create_notification.delay')
    def test_create(self, mocked_task_bulk_create_notification):
        # Given
        notification_config = baker.make(NotificationConfig, type=EnumNotificationType.HTTP)
        target_users = baker.make(
            TargetUser, notification_type=EnumNotificationType.HTTP, _quantity=10
        )

        # When
        target_user_ids = [target_user.id for target_user in target_users]
        reserved_at_data = [
            timezone.now() + timezone.timedelta(minutes=minute)
            for minute in range(10)
        ]
        data = [
            {
                'notification_config': notification_config.id,
                'target_users': target_user_ids,
                'reserved_at': reserved_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            }
            for reserved_at in reserved_at_data
        ]
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            '/api/reservation/',
            data=json.dumps(data),
            content_type='application/json',
        )

        # Then
        self.assertEqual(response.status_code, 201)
        self.assertEqual(mocked_task_bulk_create_notification.call_count, 10)


class TaskSendApiNotificationTest(TestCase):

    @mock.patch('requests.post', return_value=mock.Mock(status_code=200))
    def test_task_send_api_notification(self, _):
        # Given
        notification = {
            'endpoint': 'http://localhost:8000/api/message/',
            'headers': {
                'Content-Type': 'application/json',
            },
            'data': '{"project": 1, "content": "test"}',
        }

        # When
        response = task_send_api_notification(notification)

        # Then
        self.assertEqual(response, None)


class TaskHandleReservationTestCase(TestCase):
    @mock.patch('notifications.services.task_handle_chunk_notification.delay')
    def test_task_spawn_notification_by_chunk(self, mocked_task_spawn_notification_by_chunk):
        # Given
        notification_config = baker.make(NotificationConfig)
        reservation = baker.make(Reservation, notification_config=notification_config)
        baker.make(
            Notification,
            reservation=reservation,
            _quantity=150
        )

        # When
        task_spawn_notification_by_chunk(reservation.id)

        # Then
        calls = [
            call(list(range(1, 100 + 1))),
            call(list(range(101, 150 + 1))),
        ]
        mocked_task_spawn_notification_by_chunk.assert_has_calls(calls)


class TaskHandleChunkNotificationTestCase(TestCase):
    @mock.patch('notifications.services.task_send_api_notification.delay')
    def test_task_handle_chunk_notification(self, mocked_task_send_api_notification):
        # Given
        target_user = baker.make(TargetUser, notification_type=EnumNotificationType.HTTP)
        notification_config = baker.make(NotificationConfig, type=EnumNotificationType.HTTP)
        reservation = baker.make(Reservation, notification_config=notification_config)
        notifications = baker.make(
            Notification,
            reservation=reservation,
            target_user=target_user,
            status=EnumNotificationStatus.PENDING,
            _quantity=2,
        )

        # When
        task_handle_chunk_notification([notification.id for notification in notifications])

        # Then
        self.assertEqual(mocked_task_send_api_notification.call_count, 2)


class CronTaskHandleReservationTestCase(TestCase):

    @mock.patch('notifications.services.task_spawn_notification_by_chunk.delay')
    def test_cron_handle_reservation(self, mocked_task_spawn_notification_by_chunk):
        # Given
        baker.make(Reservation, status=EnumReservationStatus.PENDING)

        # When
        cron_task_handle_reservation()

        # Then
        mocked_task_spawn_notification_by_chunk.assert_called_once()


class TaskBulkCreateNotification(TestCase):
    def test_create_notification(self):
        # Given
        notification_config = baker.make(NotificationConfig)
        target_users = baker.make(TargetUser, _quantity=2)

        # When
        reserved_at = timezone.now()
        target_user_ids = [target_user.id for target_user in target_users]
        task_bulk_create_notification(reserved_at, target_user_ids, notification_config.id)

        # Then
        self.assertTrue(Reservation.objects.exists())
        self.assertEqual(Notification.objects.count(), 2)
