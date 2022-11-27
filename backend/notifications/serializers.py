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

        reservations = [
            Reservation(notification_config_id=notification_config_id)
        ]

        # TODO bulk create 가 어떻게 날아가는지 쿼리 확인 필요
        Reservation.objects.bulk_create(reservations)

        for reservation in reservations:
            task_bulk_create_notification.delay(target_users, reservation.id)

        return reservations

    def update(self, instance, validated_data):
        pass
