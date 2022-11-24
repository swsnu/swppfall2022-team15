from django.db import models

from account.models import User
from core.models import TimeStampedModel
from notifications.models import EnumNotificationType


class NMessage(TimeStampedModel):
    """Model definition for NMessages."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=32, choices=EnumNotificationType.choices)
    content = models.JSONField()
