from rest_framework import serializers

from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Project
        fields = ('id', 'project_type', 'name', 'user')
