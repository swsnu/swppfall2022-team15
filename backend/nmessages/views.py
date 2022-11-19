from rest_framework.viewsets import ModelViewSet

from nmessages.models import NMessage
from nmessages.serializers import NMessageSerializer


class NMessageViewSet(ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer
