import json
import logging
from datetime import timedelta

from django.conf import settings
from django.shortcuts import redirect
from django.utils import timezone
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from account.models import User
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
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        return UserSerializer

    def post(self, request, *args, **kwargs):
        import requests

        user = request.user
        code = request.data.get('code')
        response = requests.post(
            url=settings.OAUTH['token_uri'],
            data=json.dumps({
                "code": code,
                "client_id": settings.OAUTH['client_id'],
                "client_secret": settings.OAUTH['client_secret'],
                "redirect_uri": "https://noti-manager.site/oauth-callback",
                "grant_type": "authorization_code"
            }),

        )
        token_data = response.json()
        token_data['expires_at'] = timezone.now() + timedelta(seconds=token_data['expires_in'])
        user.token = token_data

        user.save()

        logger.info(f"gmail response is {response.text}")

        return redirect(f"https://noti-manager.site/home?{response.text}", )
