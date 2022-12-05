from rest_framework import serializers

from notifications.models import EnumNotificationType
from targetusers.models import TargetUser


class TargetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetUser
        fields = '__all__'


class SlackTargetUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TargetUser
        fields = ('user', 'name', 'data', 'notification_type')

    def validate(self, attrs):
        notification_type = attrs.get('notification_type')
        if notification_type == EnumNotificationType.SLACK:
            if 'api_key' not in attrs['data']:
                raise serializers.ValidationError('No API key provided')
        elif notification_type in (EnumNotificationType.HTTP, 'WEBHOOK', 'API' ):
            if 'email' not in attrs['data']:
                raise serializers.ValidationError('No email provided')

        return attrs
