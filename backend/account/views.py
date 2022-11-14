from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from account.serializers import SignUpSerializer, UserSerializer


class SignUpView(CreateAPIView):
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(None, status=status.HTTP_201_CREATED)


class UserView(GenericAPIView):
    """
    로그인된 유저의 프로필 정보를 조회하는 API
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
