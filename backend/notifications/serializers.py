from rest_framework import serializers

from .models import NotificationConfig, Reservation
from .services import task_bulk_create_notification


class NotificationConfigSerializer(serializers.ModelSerializer):

    message = serializers.IntegerField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type',)


class ReservationCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    notification_config = serializers.IntegerField()
    reserved_at = serializers.DateTimeField()
    target_users = serializers.ListField()

    class Meta:
        model = Reservation
        fields = ('id', 'notification_config', 'reserved_at', 'target_users',)

    def create(self, validated_data):
        target_users: list[int] = validated_data.get('target_users')
        notification_config_id = validated_data.get('notification_config')
        reserved_at = validated_data.get('reserved_at')

        task_bulk_create_notification.delay(reserved_at, target_users, notification_config_id)

    def update(self, instance, validated_data):
        pass
