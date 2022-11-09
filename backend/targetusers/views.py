from rest_framework.viewsets import ModelViewSet

from targetusers.models import TargetUser
from targetusers.serializers import TargetUserSerializer


class TargetUserViewSet(ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer

    def list(self, request, *args, **kwargs):
        if project_id := request.query_params.get('projectId'):
            self.queryset = self.queryset.filter(project_id=int(project_id))
        return super().list(request, *args, **kwargs)
