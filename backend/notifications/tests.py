from unittest import mock

from django.test import TestCase

from model_bakery import baker
from rest_framework.test import APITestCase

from account.models import User
from nmessages.models import NMessage
from notifications.models import EnumNotificationType
from notifications.services import task_send_api_notification
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


class ServiceTest(TestCase):

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
