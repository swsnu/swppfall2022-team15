import datetime

from django.db.models import Count, F, Q
from django.db.models.functions import Trunc
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from core.paginator import CustomPageNumberPagination
from core.permissions import IsOwner
from notifications.models import NotificationConfig, Notification
from notifications.models import Reservation
from notifications.serializers import (
    NotificationConfigCreateSerializer,
    ReservationSerializer,
    NotificationConfigSerializer, NotificationSerializer, NotificationListSerializer,
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
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = (IsAuthenticated, )

    def get_serializer_class(self):
        if self.action == 'list':
            return NotificationListSerializer
        return self.serializer_class

    def get_queryset(self):
        projectId = self.request.query_params.get('projectId')
        ##noti_type = self.request.query_params.get('type')
        ##target = self.request.query_params.get('target')
        status = self.request.query_params.get('status')

        q=Q()
        q &= Q(reservation__notification_config__project__user=self.request.user)
        ##if projectId:
        ##    q &= Q(reservation__notification_config__project__id=projectId)
        ##if noti_type:
        ##    q &= Q(reservation__notification_config__type=noti_type)
        ##if target:
        ##    q &= Q(reservation__notification_config__target=target)
        if status:
            q &= Q(status=status)

        return self.queryset.filter(q)

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
            result['project'] = metric['project']
            result['type'] = metric['type']
            return result

        start_time = request.query_params.get('start')
        end_time = request.query_params.get('end')
        
        interval = request.query_params.get('interval')

        projectId = request.query_params.get('projectId')
        noti_type = request.query_params.get('type')

        q=Q()
        q &= Q(reservation__notification_config__project__user=request.user)
        q &= Q(updated_at__range=(start_time, end_time))
        if projectId:
            q &= Q(reservation__notification_config__project_id=projectId)
        if noti_type:
            q &= Q(reservation__notification_config__type=noti_type)

        metrics = Notification.objects.select_related('reservation__notification_config').filter(q).annotate(
            time=Trunc('updated_at', interval),
            project=F('reservation__notification_config__project_id'),
            type=F('reservation__notification_config__type'),
        ).values('status', 'time', 'project', 'type').annotate(
            count=Count('time')
        ).order_by('time', 'status', 'count', 'project', 'type')

        response = list(map(convert, metrics))

        return Response(data=response, status=status.HTTP_200_OK)


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def list(self, request, notification_config_id):
        queryset = self.filter_queryset(self.get_queryset().filter(
            notification_config_id=notification_config_id
        ))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


