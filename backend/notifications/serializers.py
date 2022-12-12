from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from dateutil.rrule import rrulestr

from notifications.models import NotificationConfig, Reservation, EnumNotificationMode, Notification
from notifications.services import task_bulk_create_notification

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

        reservation_time = []
        if notification_config.mode == EnumNotificationMode.RESERVATION:
            rrule = validated_data.get('rrule')
            reservation_time += rrulestr(rrule)[:settings.MAX_RESERVATION_COUNT]
        elif notification_config.mode == EnumNotificationMode.IMMEDIATE:
            reservation_time += [datetime.now()]

        for time in reservation_time:
            task_bulk_create_notification.delay(
                time,
                target_users,
                notification_config.id,
                notification_config.mode
            )

        return notification_config


class ReservationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    notification_config = serializers.IntegerField()

    class Meta:
        model = Reservation
        fields = ('id', 'notification_config', 'rrule', 'target_users',)


class NotificationSerializer(serializers.ModelSerializer):
    target = serializers.CharField(source='target_user')
    class Meta:
        model = Notification
        fields = ('id', 'reservation', 'target', 'status', 'request', 'response',)


class NotificationListSerializer(serializers.ModelSerializer):
    target = serializers.CharField(source='target_user.name')
    project = serializers.CharField(source='reservation.notification_config.project.name')

    class Meta:
        model = Notification
        fields = ('id', 'project', 'target', 'status', 'created_at')
