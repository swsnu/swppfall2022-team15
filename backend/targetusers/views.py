from rest_framework.viewsets import ModelViewSet

from targetusers.models import TargetUser
from targetusers.serializers import TargetUserSerializer


class TargetUserViewSet(ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer
