from __future__ import annotations

from urllib.parse import urljoin

import requests
from django.conf import settings

from noti_manager.celery import app
from notifications.models import Notification, EnumNotificationStatus


@app.task
def task_send_slack_notification(notification_data):
    url = urljoin(settings.SLACK_HOST, 'api/chat.postMessage')
    headers = {
        'Authorization': f'Bearer {notification_data["api_key"]}',
    }
    data = {
        'text': notification_data['text'],
        'channel': notification_data['channel']
    }
    try:
        response = requests.post(
            url,
            headers=headers,
            json=data,
            timeout=5
        )
        response.raise_for_status()
        data = response.json()
        if data['ok']:
            Notification.objects.filter(pk=notification_data['id']).update(
                status=EnumNotificationStatus.SUCCESS
            )
        else:
            Notification.objects.filter(pk=notification_data['id']).update(
                status=EnumNotificationStatus.FAILURE
            )

    except requests.exceptions.RequestException:
        Notification.objects.filter(pk=notification_data['id']).update(
            status=EnumNotificationStatus.FAILURE
        )
