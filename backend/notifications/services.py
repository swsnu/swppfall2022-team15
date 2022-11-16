from __future__ import annotations

import json
from logging import getLogger
from typing import TypedDict

import requests

from core.exceptions import NotificationServiceException
from noti_manager.celery import app

logger = getLogger(__name__)


@app.task
def task_send_api_notification(notification: dict):
    """Send a notification to the notification service."""
    try:
        response = requests.post(
            url=notification['endpoint'],
            json=json.loads(notification['data']),
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
