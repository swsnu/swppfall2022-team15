from rest_framework import serializers

from .models import NotificationConfig


class NotificationConfigSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type',)
