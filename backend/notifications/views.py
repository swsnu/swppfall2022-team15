from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny


class NotificationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
