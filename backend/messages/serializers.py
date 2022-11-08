from rest_framework import serializers

from messages.models import NMessage


class NMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NMessage
        fields = '__all__'
