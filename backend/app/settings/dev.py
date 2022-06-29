'''Use this for development'''

from .base import *

ALLOWED_HOSTS += [
    '*',
    'localhost:3000',
    'localhost:5000',
    'localhost:8000',
    'kubernetes.docker.internal'
    '127.0.0.1:3000',
    '127.0.0.1:5000',
    '127.0.0.1:8000',
]

# print('ALLOWED_HOSTS_DEV  ---> ', ALLOWED_HOSTS)

CORS_ALLOW_ALL_ORIGINS = True

CORS_ORIGIN_WHITELIST += [
    u'http://localhost:3000',
    u'http://localhost:5000',
    u'http://localhost:8000',
    u'http://kubernetes.docker.internal',
    u'http://127.0.0.1:3000',
    u'http://127.0.0.1:5000',
    u'http://127.0.0.1:8000',

    u'https://localhost:3000',
    u'https://localhost:5000',
    u'https://localhost:8000',
    u'https://kubernetes.docker.internal',
    u'https://127.0.0.1:3000',
    u'https://127.0.0.1:5000',
    u'https://127.0.0.1:8000',
]

# DEBUG = True
DEBUG = os.environ.get('DEBUG')

WSGI_APPLICATION = 'app.wsgi.dev.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
    }
}
