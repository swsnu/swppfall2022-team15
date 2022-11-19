from rest_framework import serializers
from .models import NotificationGroup, EnumNotificationStatus


class NotificationSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')
    status = serializers.CharField(default=EnumNotificationStatus.PENDING)

    class Meta:
        model = NotificationGroup
        fields = ('id', 'message', 'project', 'status', 'type',)
