from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from core.views import CreateByNotificationTypeMixin
from nmessages.models import NMessage
from nmessages.serializers import NMessageSerializer, SlackNMessageSerializer
from notifications.models import EnumNotificationType


class NMessageViewSet(CreateByNotificationTypeMixin, ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer
    permission_classes = (IsAuthenticated,)

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
        if self.request.data['notification_type'] == EnumNotificationType.SLACK:
            return SlackNMessageSerializer

    def get_queryset(self):
        queryset = self.queryset
        if 'notification_type' in self.request.query_params:
            notification_type = self.request.query_params['notification_type']
            queryset = queryset.filter(notification_type=notification_type)
        return queryset.filter(user=self.request.user)
