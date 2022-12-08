import base64
import hashlib
import hmac
import json
import time
from datetime import datetime

import requests
from django.conf import settings

from core.exceptions import NotificationServiceException
from noti_manager.celery import app


@app.task
def task_send_sms_notification():
    """Send a notification to the notification service."""

    headers = create_ncloud_headers()
    data = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": "01000000000", # phone number
        "content": "내용",
        "messages": [
            {
                "to": "01055409195",
                "content": "위의 content와 별도로 해당 번호로만 보내는 내용(optional)"
            }
        ]
    }

    try:
        response = requests.post(
            url=settings.NCLOUD_SMS_ENDPOINT,
            json=data,
            headers=headers,
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise NotificationServiceException from e


def create_ncloud_headers():
    """Create headers for ncloud sms service."""
    access_key = settings.NCLOUD_ACCESS_KEY
    secret_key = bytes(settings.NCLOUD_SECRET_KEY, 'UTF-8')

    method = 'POST'
    uri = '/sms/v2/services/{}/messages'.format(settings.NCLOUD_SERVICE_ID)
    timestamp = str(int(time.time() * 1000))
    message = f'{method} {uri}\n{timestamp}\n{access_key}'
    message = bytes(message, 'UTF-8')
    signature = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': access_key,
        'x-ncp-apigw-signature-v2': signature,
    }
