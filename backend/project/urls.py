from django.urls import path, include
from rest_framework import routers

from project.views import ProjectViewSet

router = routers.SimpleRouter()
router.register(r'', ProjectViewSet, basename='project')


urlpatterns = [
    path('', include(router.urls)),
]
