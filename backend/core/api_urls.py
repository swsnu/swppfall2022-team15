from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from account.views import SignUpView, UserView
from nmessages.views import NMessageViewSet
from notifications.views import NotificationViewSet
from project.views import ProjectViewSet
from targetusers.views import TargetUserViewSet

urlpatterns = [
    path('api/signin/', obtain_auth_token, name='signin'),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/user/', UserView.as_view(), name='user'),
]

# ViewSet
router = DefaultRouter()
# project app
router.register(r'project', ProjectViewSet, basename='project')
# target user app
router.register(r'targetuser', TargetUserViewSet, basename='targetuser')
# message app
router.register(r'message', NMessageViewSet, basename='nmessage')
# notification app
router.register(r'notification', NotificationViewSet, basename='notification')

urlpatterns += router.urls
