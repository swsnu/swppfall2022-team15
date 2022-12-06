from rest_framework import serializers

from nmessages.models import NMessage


class NMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NMessage
        fields = '__all__'


class SlackNMessageSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    channel = serializers.CharField(write_only=True)
    message = serializers.CharField(write_only=True)

    class Meta:
        model = NMessage
        fields = ('user', 'channel', 'message', 'notification_type', 'data',)
        extra_kwargs = {
            'content': {'read_only': True},
        }

    def create(self, validated_data):
        validated_data['content'] = {
            'channel': validated_data.pop('channel'),
            'message': validated_data.pop('message')
        }
        return super().create(validated_data)
