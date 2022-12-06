from rest_framework import serializers

from notifications.models import EnumNotificationType
from targetusers.models import TargetUser


class TargetUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TargetUser
        fields = ('user', 'name', 'data', 'notification_type',)

    def validate(self, attrs):
        notification_type = attrs.get('notification_type')
        data = attrs['data']
        if notification_type == EnumNotificationType.SLACK:
            if 'api_key' not in data:
                raise serializers.ValidationError('No API key provided')
        elif notification_type == EnumNotificationType.WEBHOOK:
            if 'auth' == 'Bearer' and 'token' not in data:
                raise serializers.ValidationError('No token provided')
            elif 'auth' == 'Basic' and ('username' not in data or 'password' not in data):
                raise serializers.ValidationError('No username or password provided')
            elif 'auth' == 'API_KEY' and ('key' not in data or 'value' not in data):
                raise serializers.ValidationError('No key or value provided')
        elif notification_type == EnumNotificationType.EMAIL:
            raise serializers.ValidationError('No email provided')

        return super().validate(attrs)
