from noti_manager.settings.base import *  # pylint: disable=W0401,W0614


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] + MIDDLEWARE

INSTALLED_APPS += [
    'corsheaders',
]

# CORS
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True


# CELERY
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
