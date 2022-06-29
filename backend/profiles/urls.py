from django.urls import path

from .views import (
    ProfileRetrieveAPIView, ProfilesListAPIView,
    ProfileFollowUserAPIView, ProfileMyFollowingAPIView,
    GetMyProfileAPIView
)

app_name = 'profiles'

urlpatterns = [
    path('profiles/me/',
         GetMyProfileAPIView.as_view(),
         name='my_profile'),
    path('profiles/follow/',
         ProfileMyFollowingAPIView.as_view(),
         name='my_following'),
    path('profiles/<username>/', ProfileRetrieveAPIView.as_view()),
    path('profiles/', ProfilesListAPIView.as_view()),
    path('profiles/follow/<username>/',
         ProfileFollowUserAPIView.as_view(),
         name='follow_user'
         )
]
