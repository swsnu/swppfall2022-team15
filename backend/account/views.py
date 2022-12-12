import json
import logging

from django.conf import settings
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from account.serializers import SignUpSerializer, UserSerializer

logger = logging.getLogger(__name__)


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


class GmailView(GenericAPIView):
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        return UserSerializer

    def get(self, request, *args, **kwargs):
        import requests
        logger.info(f"request_query_parmas {request.query_params}")

        code = request.query_params.get('code')
        response = requests.post(
            url=settings.OAUTH['token_uri'],
            data=json.dumps({
                "code": code,
                "client_id": settings.OAUTH['client_id'],
                "client_secret": settings.OAUTH['client_secret'],
                "redirect_uri": "https://noti-manager.site:8000/api/gmail/",
                "grant_type": "authorization_code"
            }),

        )
        print(logger.info(f"gmail response is {response.text}"))
        logger.info(f"gmail response is {response.text}")
        return redirect(f"https://noti-manager.site/home?{response.text}", )
