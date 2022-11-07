from django.urls import path, include
from rest_framework import routers

from notifications.views import NotificationViewSet

router = routers.SimpleRouter()
router.register(r'', NotificationViewSet, basename='notification')


urlpatterns = [
    path('', include(router.urls)),
]
