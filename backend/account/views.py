from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from account.serializers import SignUpSerializer


class SignUpView(CreateAPIView):
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(None, status=status.HTTP_201_CREATED)
