from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from notifications.serializers import NotificationSerializer


class NotificationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = NotificationSerializer
