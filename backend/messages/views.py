from rest_framework.viewsets import ModelViewSet

from messages.models import NMessage
from messages.serializers import NMessageSerializer


class NMessageViewSet(ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer
