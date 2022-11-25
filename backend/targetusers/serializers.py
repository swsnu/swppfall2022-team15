from rest_framework import serializers

from targetusers.models import TargetUser


class TargetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetUser
        fields = '__all__'


class SlackTargetUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    api_key = serializers.CharField(write_only=True)

    class Meta:
        model = TargetUser
        fields = ('user', 'api_key', 'name', 'data', 'notification_type')
        extra_kwargs = {
            'data': {'read_only': True},
        }

    def create(self, validated_data):
        validated_data['data'] = {
            'api_key': validated_data.pop('api_key')
        }
        return super().create(validated_data)
