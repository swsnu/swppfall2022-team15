from django.db import models
from enum import Enum


# TODO - state definition for notification, notification log, and reservation
class EnumNotifcationStatus(Enum):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationType(Enum):
    EMAIL = 'EMAIL'
    SMS = 'SMS'
    API = 'API'


class Notification(models.Model):
    message = models.TextField() # TODO - should be changed to foreign key to message 
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in EnumNotifcationStatus])
    type = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in EnumNotificationType])


class NotificationLog(models.Model):
    notification = models.ForeignKey('Notification', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in EnumNotifcationStatus])
    request = models.JSONField()
    response = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # TODO - add notification target user    


class Reservation(models.Model):
    notifcation = models.ForeignKey('Notification', on_delete=models.CASCADE)
    reserved_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in EnumNotifcationStatus])
    # TODO - add target user
