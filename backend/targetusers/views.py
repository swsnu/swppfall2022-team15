from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from core.views import CreateByNotificationTypeMixin
from targetusers.models import TargetUser
from targetusers.serializers import TargetUserSerializer

class TargetUserViewSet(CreateByNotificationTypeMixin, ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer
    permission_classes = (IsAuthenticated,)

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
       return TargetUserSerializer

    # pylint: disable=R0801
    def get_queryset(self):
        queryset = self.queryset
        if 'notification_type' in self.request.query_params:
            notification_type = self.request.query_params['notification_type']
            queryset = queryset.filter(notification_type=notification_type)
        return queryset.filter(user=self.request.user)
