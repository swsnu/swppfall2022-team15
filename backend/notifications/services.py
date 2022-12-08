from __future__ import annotations

import json
from datetime import timedelta
from logging import getLogger
from typing import TypedDict

import requests
from django.utils import timezone

from core.exceptions import NotificationServiceException
from noti_manager.celery import app
from notifications.models import (
    Notification,
    EnumNotificationStatus,
    EnumNotificationType,
    Reservation,
    EnumReservationStatus,
)
from notifications.slack.serializers import SlackNotificationSerializer
from notifications.slack.services import task_send_slack_notification
from notifications.sms.services import task_send_sms_notification

logger = getLogger(__name__)


@app.task
def task_send_api_notification(notification: dict):
    """Send a notification to the notification service."""
    try:
        response = requests.post(
            url=notification['endpoint'],
            json=notification['data'],
            headers=notification['headers'],
            timeout=5,
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise NotificationServiceException from e


class ApiNotificationDto(TypedDict):
    """Data transfer object for notifications."""
    endpoint: str
    headers: dict
    data: str


@app.task
def task_spawn_notification_by_chunk(reservation_id: int):
    reservation = Reservation.objects.select_related('notification_config').get(id=reservation_id)
    notification_ids = reservation.notification_set.values_list('id', flat=True)

    def split_notification_ids_by_chunk_size(ids: list[int], chunk_size) -> list[list[int]]:
        return [
            ids[offset:offset + chunk_size]
            for offset in range(0, len(ids), chunk_size)
        ]

    CHUNK_SIZE = 100
    notification_ids_by_chunk_size = \
        split_notification_ids_by_chunk_size(notification_ids, CHUNK_SIZE)
    for notification_ids in notification_ids_by_chunk_size:
        task_handle_chunk_notification.delay(notification_ids)

    reservation.status = EnumReservationStatus.SENDING
    reservation.save(update_fields=['status'])


@app.task
def task_handle_chunk_notification(notification_ids: list[int]):
    """Send a notification to the notification service."""
    notifications = Notification.objects \
        .filter(id__in=notification_ids, status=EnumNotificationStatus.PENDING) \
        .select_related('target_user', 'reservation')

    for notification in notifications:
        # TODO 하나의 클래스로 추상화 해서 바로 던지는 게 좋을 듯
        if notification.reservation.notification_config.type == EnumNotificationType.WEBHOOK:
            data = ApiNotificationDto(
                endpoint=notification.target_user.endpoint,
                headers=notification.target_user.data,
                data=notification.reservation.notification_config.nmessage.data,
            )
            task_send_api_notification.delay(data)
        elif notification.reservation.notification_config.type == EnumNotificationType.SLACK:
            task_send_slack_notification.delay(
                SlackNotificationSerializer(notification).data
            )
        elif notification.notificaiton_group.type == EnumNotificationType.SMS:
            task_send_sms_notification.delay()


@app.task
def cron_task_handle_reservation():
    # TODO (Jaeyoung) 분산락
    reservations = Reservation.objects \
        .filter(status=EnumReservationStatus.PENDING) \
        .filter(reserved_at__lte=timezone.now() + timedelta(minutes=1))

    for reservation in reservations:
        task_spawn_notification_by_chunk.delay(reservation.id)


@app.task
def task_bulk_create_notification(reserved_at, target_user_ids, notification_config_id):
    reservation = Reservation.objects.create(
        notification_config_id=notification_config_id,
        reserved_at=reserved_at,
        status=EnumReservationStatus.PENDING
    )

    notifications = [
        Notification(
            target_user_id=target_user_id,
            reservation_id=reservation.id,
            status=EnumNotificationStatus.PENDING,
        ) for target_user_id in target_user_ids
    ]
    Notification.objects.bulk_create(notifications)
