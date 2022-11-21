from rest_framework import serializers
from .models import NotificationConfig, EnumNotificationStatus


class NotificationSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')
    status = serializers.CharField(default=EnumNotificationStatus.PENDING)

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'status', 'type',)
