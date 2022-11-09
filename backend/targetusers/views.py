from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from targetusers.models import TargetUser


# Create your views here.
class TargetUserViewSet(ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer
