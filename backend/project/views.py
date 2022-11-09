from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from core.permissions import IsOwner
from project.models import Project
from project.serializers import ProjectSerializer

from notifications.serializers import NotificationSerializer

class ProjectViewSet(ModelViewSet):
    # TODO: Add permission classes
    permission_classes = (AllowAny, IsAuthenticated, IsOwner,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all().order_by('-pk')

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    @action(detail=True, methods=['get'], permission_classes=[AllowAny, IsAuthenticated, IsOwner])
    def notification(self, request, pk):
        project = self.get_object()
        notifications = project.notification_set.all()
        serializer = NotificationSerializer(notifications, many=True)
        
        return Response(serializer.data)