from rest_framework.viewsets import ModelViewSet

from nmessages.models import NMessage
from nmessages.serializers import NMessageSerializer


class NMessageViewSet(ModelViewSet):
    queryset = NMessage.objects.all()
    serializer_class = NMessageSerializer

    def list(self, request, *args, **kwargs):
        if project_id := request.query_params.get('projectId'):
            self.queryset = self.queryset.filter(project_id=int(project_id))
        return super().list(request, *args, **kwargs)
