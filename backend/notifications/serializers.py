from rest_framework import serializers

from notifications.models import NotificationConfig, Reservation
from notifications.services import task_bulk_create_notification

from dateutil.rrule import rrulestr


class NotificationConfigSerializer(serializers.ModelSerializer):
    message = serializers.IntegerField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type',)


class ReservationCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    notification_config = serializers.IntegerField()
    rrule = serializers.CharField()
    target_users = serializers.ListField()

    class Meta:
        model = Reservation
        fields = ('id', 'notification_config', 'rrule', 'target_users',)

    def create(self, validated_data):
        target_users: list[int] = validated_data.get('target_users')
        notification_config_id = validated_data.get('notification_config')
        rrule = validated_data.get('rrule')

        rrule = rrulestr(rrule)
        for time in rrule:
            task_bulk_create_notification.delay(time, target_users, notification_config_id)

    def update(self, instance, validated_data):
        pass
