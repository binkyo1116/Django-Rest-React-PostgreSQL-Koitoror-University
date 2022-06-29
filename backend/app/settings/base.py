import os
from datetime import timedelta

import mimetypes
mimetypes.add_type("text/css", ".css", True)
mimetypes.add_type("text/javascript", ".js", True)

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
# print('BASE_DIR  ---> ', BASE_DIR)

SECRET_KEY = os.environ.get('SECRET_KEY')


ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]

CORS_ORIGIN_WHITELIST = [
    u'http://127.0.0.1',
    u'http://localhost',
    u'https://127.0.0.1',
    u'https://localhost',
]


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # 'allauth.socialaccount.providers.google',

    'corsheaders',

    'rest_auth',
    'rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt.token_blacklist',

    'app',
    'core',
    'base',
    # 'base.apps.BaseConfig',
    'profiles',
    'assignment',

]

SIMPLE_JWT = {
    # 'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=90),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app.urls'

X_FRAME_OPTIONS = 'ALLOWALL'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [os.path.join(BASE_DIR, 'frontend/build'), os.path.join(BASE_DIR, 'frontend/build/static'), os.path.join(BASE_DIR, 'frontend/staticfiles')],
        'DIRS': [os.path.join(BASE_DIR, 'frontend/build'), os.path.join(BASE_DIR, 'frontend/build/static')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

WHITENOISE_MIMETYPES = {
    '.xsl': 'application/xml'
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build/static'), os.path.join(BASE_DIR, 'frontend/build')]
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build/static')]
# STATIC_ROOT = '/vol/web/static'
# STATIC_TMP = '/vol/web/static'
# MEDIA_ROOT = '/vol/web/media'

STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/staticfiles')
STATIC_TMP = os.path.join(BASE_DIR, 'frontend/static')

os.makedirs(STATIC_ROOT, exist_ok=True)
os.makedirs(STATIC_TMP, exist_ok=True)

# DEFAULT_AUTO_FIELD='django.db.models.AutoField'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# SITE_ID = 1
SITE_ID = 2

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
        'base.api.MyJWTAuthentication',


    ),
}

AUTHENTICATION_BACKENDS = (
   "django.contrib.auth.backends.ModelBackend",
   "allauth.account.auth_backends.AuthenticationBackend"
)

CSRF_COOKIE_NAME = "csrftoken"
# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# SESSION_EXPIRE_AT_BROWSER_CLOSE = True

ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_VERIFICATION = 'none'
# AUTH_USER_MODEL = 'base.User'

ACCOUNT_USERNAME_REQUIRED = False

# REST_AUTH_SERIALIZERS = {
#     'USER_DETAILS_SERIALIZER': 'base.serializers.UserSerializer',
#     'TOKEN_SERIALIZER': 'base.serializers.TokenSerializer',
#     'LOGIN_SERIALIZER': 'base.serializers.LoginSerializer',
#     'JWT_SERIALIZER': 'base.serializers.JWTSerializer',
#     'USER_DETAILS_SERIALIZER': 'base.serializers.UserDetailsSerializer',
#     'PASSWORD_RESET_SERIALIZER': 'base.serializers.PasswordResetSerializer',
#     'PASSWORD_RESET_CONFIRM_SERIALIZER': 'base.serializers.PasswordResetConfirmSerializer',
#     'PASSWORD_CHANGE_SERIALIZER': 'base.serializers.PasswordChangeSerializer',
    
# }


REST_AUTH_REGISTER_SERIALIZERS = {
    # 'REGISTER_SERIALIZER': 'base.api.serializers.CustomRegisterSerializer',
    # 'REGISTER_SERIALIZER': 'base.api.serializers.RegisterUserSerializer',
    'REGISTER_SERIALIZER': 'base.api.serializers.CreateUserSerializer',

}
