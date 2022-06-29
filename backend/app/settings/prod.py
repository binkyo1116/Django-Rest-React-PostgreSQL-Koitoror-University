'''Use this for production'''
import os
from .base import *

# DEBUG = False
DEBUG = os.environ.get('DEBUG')

# ALLOWED_HOSTS += os.environ.get('ALLOWED_HOSTS_PROD')
ALLOWED_HOSTS += os.environ.get('ALLOWED_HOSTS_PROD').split(',')
# print('ALLOWED_HOSTS_PROD  ---> ', ALLOWED_HOSTS)

# CORS_ORIGIN_WHITELIST += os.environ.get('CORS_ORIGIN_WHITELIST')
CORS_ORIGIN_WHITELIST += os.environ.get('CORS_ORIGIN_WHITELIST').split(',')

WSGI_APPLICATION = 'app.wsgi.prod.application'

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
        'PORT': os.environ.get('DB_PORT'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'