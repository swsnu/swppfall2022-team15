from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action

from core.permissions import IsOwner
from nmessages.models import NMessage
from notifications.models import Reservation
from notifications.serializers import NotificationConfigSerializer, ReservationCreateSerializer
from notifications.services import task_send_api_notification, ApiNotificationDto
from notifications.models import Notification
from targetusers.models import TargetUser


class NotificationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = NotificationConfigSerializer
    queryset = Notification.objects.all()

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
        notifications = Notification.objects.filter(
            notification_config__notification__project__user=request.user
        )
        return Response(data=notifications, status=status.HTTP_200_OK)


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = ReservationCreateSerializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)
