from django.db import models

from core.models import TimeStampedModel


# TODO - state definition for notification, notification log, and reservation
class EnumNotifcationStatus(models.TextChoices):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationType(models.TextChoices):
    EMAIL = 'EMAIL'
    SMS = 'SMS'
    API = 'API'


class Notification(TimeStampedModel):
    # FIXME - shouldn't be nullable
    nmessage = models.ForeignKey('nmessages.NMessage', on_delete=models.CASCADE, null=True)
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=EnumNotifcationStatus.choices)
    type = models.CharField(max_length=20, choices=EnumNotificationType.choices)


class NotificationLog(TimeStampedModel):
    notification = models.ForeignKey('Notification', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=EnumNotificationType.choices)
    request = models.JSONField()
    response = models.JSONField()
    # TODO - add notification target user


class Reservation(TimeStampedModel):
    notifcation = models.ForeignKey('Notification', on_delete=models.CASCADE)
    reserved_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=EnumNotifcationStatus.choices)
    # TODO - add target user
