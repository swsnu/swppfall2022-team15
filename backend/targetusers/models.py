from django.db import models

from core.models import TimeStampedModel
from notifications.models import EnumNotificationType


class TargetUser(TimeStampedModel):
    """Model definition for TargetUser."""
    name = models.CharField(max_length=32)
    notification_type = models.CharField(max_length=32, choices=EnumNotificationType.choices)
    endpoint = models.CharField(max_length=255)
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    data = models.JSONField()
