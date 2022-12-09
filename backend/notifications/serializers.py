from datetime import datetime

from django.conf import settings
from rest_framework import serializers

from notifications.models import NotificationConfig, Reservation, EnumNotificationMode
from notifications.services import task_bulk_create_notification

from dateutil.rrule import rrulestr


class NotificationConfigSerializer(serializers.ModelSerializer):
    message = serializers.CharField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type', 'rrule',)

class NotificationConfigCreateSerializer(serializers.ModelSerializer):
    message = serializers.IntegerField(source='nmessage_id')
    target_users = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type', 'rrule', 'target_users', 'mode',)
        extra_kwargs = {
            'target_users': {'write_only': True, },
        }

    def create(self, validated_data):
        target_users: list[int] = validated_data.pop('target_users')

        notification_config = super().create(validated_data)

        rrule = validated_data.get('rrule')
        rrule = rrulestr(rrule)[:settings.MAX_RESERVATION_COUNT]

        if notification_config.mode == EnumNotificationMode.RESERVATION:
            for time in rrule:
                task_bulk_create_notification.delay(time, target_users, notification_config.id)
        elif notification_config.mode == EnumNotificationMode.IMMEDIATE:
            task_bulk_create_notification.delay(None, target_users, notification_config.id)

        return notification_config


class ReservationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    notification_config = serializers.IntegerField()

    class Meta:
        model = Reservation
        fields = ('id', 'notification_config', 'rrule', 'target_users',)
