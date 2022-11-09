from __future__ import annotations

import dataclasses

import requests

from core.exceptions import NotificationServiceException

import json

def send_api_notification(notification: ApiNotificationDto):
    """Send a notification to the notification service."""
    try:
        response = requests.post(
            url=notification.endpoint,
            json=json.loads(notification.data),
            headers=notification.headers,
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise NotificationServiceException from e

    return response


@dataclasses.dataclass
class ApiNotificationDto:
    """Data transfer object for notifications."""
    endpoint: str
    headers: dict
    data: str
