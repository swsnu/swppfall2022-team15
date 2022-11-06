from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsOwner
from project.models import Project
from project.serializers import ProjectSerializer


class ProjectViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwner)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all().order_by('-pk')

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
