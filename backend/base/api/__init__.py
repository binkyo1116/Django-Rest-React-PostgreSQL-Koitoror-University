from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from django.contrib.auth.models import User

from django.utils.translation import gettext_lazy as _
# from rest_framework import HTTP_HEADER_ENCODING, authentication



class MyJWTAuthentication(JWTAuthentication):  #pragma: no cover
    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError:
            raise InvalidToken(_('Token contained no recognizable user identification'))

        try:
            user = User.objects.get(**{api_settings.USER_ID_FIELD: user_id})
        except User.DoesNotExist:
            raise AuthenticationFailed(_('User not found'), code='user_not_found')

        if not user.is_active:
            raise AuthenticationFailed(_('User is inactive'), code='user_inactive')

        # if not user.password[-10:] == validated_token['hash']:
        #     raise AuthenticationFailed(_('User changed password'), code='user_inactive')

        return user

