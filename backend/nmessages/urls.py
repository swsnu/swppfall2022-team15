from django.urls import path, include
from rest_framework import routers

from nmessages.views import NMessageViewSet

router = routers.SimpleRouter()
router.register(r'', NMessageViewSet, basename='notification')


urlpatterns = [
    path('', include(router.urls)),
]
