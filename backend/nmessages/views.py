from rest_framework.viewsets import ModelViewSet

from core.views import CreateByNotificationTypeMixin
from nmessages.models import NMessage
from nmessages.serializers import NMessageSerializer, SlackNMessageSerializer
from notifications.models import EnumNotificationType


class NMessageViewSet(CreateByNotificationTypeMixin, ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
        if self.request.data['notification_type'] == EnumNotificationType.SLACK:
            return SlackNMessageSerializer
