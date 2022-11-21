from rest_framework.viewsets import ModelViewSet

from core.views import CreateByNotificationTypeMixin
from notifications.models import EnumNotificationType
from targetusers.models import TargetUser
from targetusers.serializers import TargetUserSerializer, SlackTargetUserSerializer


class TargetUserViewSet(CreateByNotificationTypeMixin, ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer

    def list(self, request, *args, **kwargs):
        if project_id := request.query_params.get('projectId'):
            self.queryset = self.queryset.filter(project_id=int(project_id))
        return super().list(request, *args, **kwargs)

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
        if self.request.data['notification_type'] == EnumNotificationType.SLACK:
            return SlackTargetUserSerializer
