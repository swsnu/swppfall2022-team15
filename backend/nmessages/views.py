from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from nmessages.models import NMessage
from nmessages.serializers import NMessageSerializer, SlackNMessageSerializer
from notifications.models import EnumNotificationType


class NMessageViewSet(ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer

    def create(self, request, *args, **kwargs):
        if not ('notification_type' in request.data and
                request.data['notification_type'] in EnumNotificationType):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_create_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
        if self.request.data['notification_type'] == EnumNotificationType.SLACK:
            return SlackNMessageSerializer
