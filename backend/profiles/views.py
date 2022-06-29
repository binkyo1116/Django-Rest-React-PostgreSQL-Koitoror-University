from rest_framework import status
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly)
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User

# from base.models import User
# from base.apps import IsVerifiedUser
from .exceptions import IsVerifiedUser
# from core.utils import send_notifications
from .exceptions import ProfileDoesNotExist
from .models import CustomFollows
from .models import Profile
from .renderers import ProfileJSONRenderer
from .response_messages import PROFILE_MSGS, FOLLOW_USER_MSGS, get_followers_found_message
from .serializers import GetProfileSerializer, GetCurrentUserProfileSerializer
from .utils import get_user_following_data


class ProfileRetrieveAPIView(RetrieveAPIView):
    """
    Class endpoint for retreving a single user profile
    """
    permission_classes = (IsAuthenticated,)
    renderer_classes = (ProfileJSONRenderer,)
    serializer_class = GetProfileSerializer

    def get(self, request, username, *args, **kwargs):
        """ function to retrieve a requested profile """
        try:
            profile = Profile.objects.select_related('user').get(
                user__username=username
            )
        except Profile.DoesNotExist:
            raise ProfileDoesNotExist

        serializer = self.serializer_class(profile)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetMyProfileAPIView(APIView):
    """
    Class endpoint for retrieving my user profile
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = GetCurrentUserProfileSerializer

    def get(self, request):
        """
        Get current user profile

        Params
        -------
        request: Object with request data and functions.

        Returns
        --------
        Response object:
        {
            "message": "message body",
            "profile": Current user profile details
        }
                OR
        {
            "errors": "error details body"
        }
        """
        current_user = request.user
        user_profile = self.serializer_class(current_user.profile)
        return Response({
            "message": PROFILE_MSGS['MY_PROFILE'],
            "profile": user_profile.data
        }, status=status.HTTP_200_OK)


class ProfilesListAPIView(ListAPIView):
    """This class allows authenticated users to get all profiles
    Get:
    Profiles
    """
    permission_classes = (IsAuthenticated,)
    queryset = Profile.objects.all()
    serializer_class = GetProfileSerializer


class ProfileMyFollowingAPIView(APIView):
    """
    Allows the current user to view list
    of their followers and those they follow.
    """
    permission_classes = (IsAuthenticated, IsVerifiedUser,)

    def get(self, request):
        """
        Return a current user's followers and those they are following.

        Params
        -------
        request: Object with request data and functions.

        Returns
        --------
        Response object:
        {
            "message": "message body",
            "following": List,
            "followers": List,
            "followingCount": Int,
            "followersCount": Int
        }
                OR
        {
            "errors": "error details body"
        }
        """
        # Retrieve the user from the request if they have been authenticated
        current_user = request.user
        # Get the following & followers username list
        # And the following & followers count for the current user
        user_following_data = get_user_following_data(current_user)
        # Return the follower details for the current user
        return Response(
            {
                "message": FOLLOW_USER_MSGS['MY_FOLLOWERS_SUCCESSFUL'],
                "following": user_following_data["following"],
                "followers": user_following_data["followers"],
                "followingCount": user_following_data["followingCount"],
                "followersCount": user_following_data["followersCount"]
            },
            status=status.HTTP_200_OK
        )


class ProfileFollowUserAPIView(APIView):
    """
    A view that allows users to follow each other
    if the user is authenticated and verified.

    """
    permission_classes = (IsAuthenticatedOrReadOnly, IsVerifiedUser,)

    def get(self, request, username):
        """
        View to return a users following i.e followers and those they are
        following.

        Params
        -------
            request: Object with request data and functions.
            username: String providing the user to follow.

        Returns
        --------
        Response object:
            {
                "message": "message body",
                "following": List,
                "followers": List,
                "followingCount": Int,
                "followersCount": Int
            }
            OR
            {
                "errors": "error details body"
            }
        """
        # Retrieve the user from the user table if the user exists
        try:
            user_details = User.objects.get(username=username)
            # Get the following & followers username list
            # And the following & followers count for the current user
            user_following_data = get_user_following_data(user_details)
            # Return the follower details in a response object
            return Response(
                {
                    "message": get_followers_found_message(username),
                    "following": user_following_data["following"],
                    "followers": user_following_data["followers"],
                    "followingCount": user_following_data["followingCount"],
                    "followersCount": user_following_data["followersCount"]
                },
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"errors": FOLLOW_USER_MSGS['USER_NOT_FOUND']},
                status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request, username):
        """
        View method used to allow the authenticated user to follow another user

        Params
        -------
        request: Object with request data and functions.
        username: String providing the user to follow.

        Returns
        --------
        Response object:
            {
                "message": "message body",
                "following": List,
                "followers": List,
                "followingCount": Int,
                "followersCount": Int
            }
            OR
            {
                "errors": "error details body"
            }
        """

        # Retrieve the user from the user table if the user exists
        try:
            user_details = User.objects.get(username=username)
            current_user = request.user
            # If a user is trying to follow themselves then stop the request
            if user_details.profile.id == current_user.profile.id:
                return Response(
                    {"errors": FOLLOW_USER_MSGS['CANNOT_FOLLOW_SELF']},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Otherwise follow the author the current user has indicated
            current_user.profile.follows.add(user_details.profile)

            # notify user of new follower
            send_notifications(request,
                               notification_type="user_followed",
                               instance=current_user,
                               recipients=[user_details])

            # Get the following & followers username list
            # And the following & followers count for the current user
            user_following_data = get_user_following_data(current_user)
            return Response(
                {
                    "message": FOLLOW_USER_MSGS['USER_FOLLOW_SUCCESSFUL'],
                    "following": user_following_data["following"],
                    "followers": user_following_data["followers"],
                    "followingCount": user_following_data["followingCount"],
                    "followersCount": user_following_data["followersCount"]
                },
                status=status.HTTP_201_CREATED
            )
        except User.DoesNotExist:
            return Response(
                {"errors": FOLLOW_USER_MSGS['USER_NOT_FOUND']},
                status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, username):
        """
        Used to allow the authenticated user to unfollow another user

        Params
        -------
        request: Object with request data and functions.
        username: String providing the user to unfollow.

        Returns
        --------
        Response object:
            {
                "message": "message body",
                "followingCount": Int,
                "followersCount": Int
            }
            OR
            {
                "errors": "error details body"
            }
        """

        # Retrieve the user from the user table if the user exists
        try:
            user_to_unfollow = User.objects.get(username=username)
            current_user = request.user
            # If a user is trying to unfollow themselves then stop the request
            if user_to_unfollow.profile.id == current_user.profile.id:
                return Response(
                    {"errors": FOLLOW_USER_MSGS['CANNOT_UNFOLLOW_SELF']},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Check if the user to be unfollowed
            # is in the current users following list
            try:
                profile_id = user_to_unfollow.profile.id
                user_being_followed = CustomFollows.objects.get(
                    to_profile_id=profile_id,
                    from_profile_id=current_user.profile.id
                )
            # If not tell the user the request can't happen
            # Because they don't follow the user
            except Exception as e:
                return Response(
                    {
                        "errors": FOLLOW_USER_MSGS['USER_UNFOLLOWED_ALREADY']
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Otherwise unfollow the user as requested
            current_user.profile.follows.remove(user_to_unfollow.profile)
            # Get the following & followers username list
            # And the following & followers count for the current user
            user_following_data = get_user_following_data(current_user)
            return Response(
                {
                    "message": FOLLOW_USER_MSGS['USER_UNFOLLOW_SUCCESSFUL'],
                    "following": user_following_data["following"],
                    "followers": user_following_data["followers"],
                    "followingCount": user_following_data["followingCount"],
                    "followersCount": user_following_data["followersCount"]
                },
                status=status.HTTP_200_OK
            )
        # End request if we cannot find the user we want to unfollow.
        except User.DoesNotExist:
            return Response(
                {"errors": FOLLOW_USER_MSGS['USER_NOT_FOUND']},
                status=status.HTTP_404_NOT_FOUND
            )
