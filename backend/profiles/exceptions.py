from rest_framework.exceptions import APIException
from rest_framework.permissions import BasePermission, SAFE_METHODS


class ProfileDoesNotExist(APIException):
    status_code = 400
    default_detail = 'The requested profile does not exist.'


class UserIsNotAuthenticated(APIException):
    status_code = 403
    default_detail = 'You should be logged in to proceed.'


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
