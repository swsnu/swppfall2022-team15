import os

from noti_manager.settings.base import *  # pylint: disable=W0401,W0614

DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'noti_manager',
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': 'noti-manager.cgt0l9cbagk3.ap-northeast-2.rds.amazonaws.com',
    }
}