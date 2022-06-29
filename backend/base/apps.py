from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'


from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsVerifiedUser(BasePermission):
    """
    Custom permission class to allow only users who have verified their email.
    """
    message = ("The email linked to your account has not been verified."
               " Please verify your account using the email verification link "
               "if you would like to enjoy all our features.")

    def has_permission(self, request, view):
        """
        Ensure the create, update and delete methods are only accessible for verified users
        """
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_verified


errors = {
    'password': {
        'required': 'A password is required to complete registration',
        'invalid': 'The provided password is invalid',
        'blank': 'A password is required to complete registration',
        'min_length': 'Please ensure that your password has at least 8 characters',
        'max_length': 'Please ensure your password does not exceed 128 characters',
        'weak_password': 'Please ensure password contains at least 1 uppercase, 1 lowercase and 1 special character'
    },
    'email': {
        'required': 'Email must be provided to complete registration',
        'invalid': 'The provided email is invalid',
        'blank': 'Email must be provided to complete registration',
        'unique': 'Provided email is already in use'
    },
    'username': {
        'required': 'A username is required to complete registration',
        'invalid': 'The provided username is invalid',
        'blank': 'A username is required to complete registration',
        'unique': 'Provided username is already in use'
    }
}
