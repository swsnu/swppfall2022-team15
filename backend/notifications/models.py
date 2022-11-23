from django.db import models

from core.models import TimeStampedModel


class EnumReservationStatus(models.TextChoices):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationStatus(models.TextChoices):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationType(models.TextChoices):
    HTTP = 'HTTP'
    SLACK = 'SLACK'
    EMAIL = 'EMAIL'
    SMS = 'SMS'


class NotificationConfig(TimeStampedModel):
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    nmessage = models.ForeignKey('nmessages.NMessage', on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=EnumNotificationType.choices)


class Notification(TimeStampedModel):
    reservation = models.ForeignKey('Reservation', on_delete=models.CASCADE, null=True)  # should not be nullable
    target_user = models.ForeignKey('targetusers.TargetUser', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=EnumNotificationStatus.choices)
    request = models.JSONField()
    response = models.JSONField()


class Reservation(TimeStampedModel):
    notification_config = \
        models.ForeignKey('notifications.NotificationConfig', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=EnumReservationStatus.choices)
    reserved_at = models.DateTimeField(auto_now_add=True)
