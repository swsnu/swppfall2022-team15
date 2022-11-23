from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action

from core.permissions import IsOwner
from nmessages.models import NMessage
from notifications.serializers import NotificationConfigSerializer
from notifications.services import task_send_api_notification, ApiNotificationDto
from targetusers.models import TargetUser


class NotificationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = NotificationConfigSerializer

    def create(self, request, *args, **kwargs):
        # save notification
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()

        # send notification
        targetuser_id = request.data.get('target')
        targetuser = TargetUser.objects.get(id=targetuser_id)

        headers = request.data.get('headers', {
            'Content-Type': 'application/json',
        })

        nmessage_id = request.data.get('message')
        nmessage = NMessage.objects.get(id=nmessage_id)
        api_dto = ApiNotificationDto(
            endpoint=targetuser.endpoint,
            headers=headers,
            data=nmessage.content,
        )

        task_send_api_notification.delay(api_dto)

        return Response(
            data=serializers.data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['get'], permission_classes=[AllowAny, IsAuthenticated, IsOwner])
    def getAll(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationConfigSerializer(notifications, many=True)

        return Response(serializer.data)

    

