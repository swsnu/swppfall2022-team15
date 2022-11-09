from rest_framework import serializers

from targetusers.models import TargetUser


class TargetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetUser
        fields = '__all__'
