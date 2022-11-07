from noti_manager.settings.base import *  # pylint: disable=W0401,W0614


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] + MIDDLEWARE

INSTALLED_APPS += [
    'corsheaders',
]

REST_FRAMEWORK.update({
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
})

# CORS
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
