import datetime

from django.db.models import Count
from django.db.models.functions import Trunc
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from core.permissions import IsOwner
from notifications.models import NotificationConfig, Notification
from notifications.models import Reservation
from notifications.serializers import (
    NotificationConfigCreateSerializer,
    ReservationSerializer,
    NotificationConfigSerializer,
)


class NotificationConfigViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationConfigSerializer
    queryset = NotificationConfig.objects.all()

    def create(self, request, *args, **kwargs):
        serializers = NotificationConfigCreateSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()

        return Response(
            # data=serializers.data,
            status=status.HTTP_201_CREATED
        )


class NotificationViewSet(ListModelMixin, GenericViewSet):
    @action(detail=True, methods=['get'], permission_classes=[AllowAny, IsAuthenticated, IsOwner])
    def getAll(self, request):
        notifications = Notification.objects.filter(
            notification_config__notification__project__user=request.user
        )
        return Response(data=notifications, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def metrics(self, request):
        def convert(metric):
            result = dict()
            
            result['status'] = metric['status']
            result['time'] = datetime.datetime.strftime(metric['time'], '%Y-%m-%d %H:%M:%S')
            result['count'] = metric['count']
            
            return result

        start_time = request.query_params.get('start')
        end_time = request.query_params.get('end')

        interval = request.query_params.get('interval')

        metrics = Notification.objects.filter(
            updated_at__range=(start_time, end_time)
        ).annotate(
            time=Trunc('updated_at', interval)
        ).values('status', 'time').annotate(
            count=Count('time')
        ).order_by('time', 'status', 'count',)
        response = list(map(convert, metrics))

        return Response(data=response, status=status.HTTP_200_OK)


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
