from django.urls import path, include
from rest_framework import routers

from targetusers.views import TargetUserViewSet

router = routers.SimpleRouter()
router.register(r'', TargetUserViewSet, basename='targetuser')


urlpatterns = [
    path('', include(router.urls)),
]
