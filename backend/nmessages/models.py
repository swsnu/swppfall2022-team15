from django.db import models

from core.models import TimeStampedModel
from notifications.models import EnumNotificationType


class NMessage(TimeStampedModel):
    """Model definition for NMessages."""
    notification_type = models.CharField(max_length=32, choices=EnumNotificationType.choices)
    content = models.JSONField()
