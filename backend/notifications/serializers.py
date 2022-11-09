from rest_framework import serializers
from .models import Notification, EnumNotifcationStatus


class NotificationSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')
    status = serializers.CharField(default=EnumNotifcationStatus.PENDING)

    class Meta:
        model = Notification
        fields = ('id', 'message', 'project', 'status', 'type',)

