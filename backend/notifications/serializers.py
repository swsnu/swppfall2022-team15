from rest_framework import serializers
from .models import NotificationConfig, EnumNotificationStatus


class NotificationConfigSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type',)
