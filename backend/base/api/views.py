from django.http import JsonResponse
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import NoteSerializer, RegisterUserSerializer, CreateUserSerializer, MyTokenObtainPairSerializer
from profiles.serializers import GetCurrentUserProfileSerializer
from base.models import User
# from django.contrib.auth.models import User
from profiles.models import Profile


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/signup/'
        # '/api/auth/signup/'
    ]

    return Response(routes)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes([AllowAny])
class UserListView(generics.ListCreateAPIView):
# class UserListView(generics.CreateAPIView):
    """Handles creating and listing Users."""
    queryset = User.objects.all()

    # def create(self, request, *args, **kwargs):
    def post(self, request):

        print(request.data)
        serializer = RegisterUserSerializer(data=request.data)
        
        # if serializer.is_valid():
        serializer.is_valid()
        #     self.create(serializer)
        #     # self.perform_create(serializer)
        user = serializer.create(request)
        if user:
        #     print('SERIALIZER ........ ',serializer.data)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data = request.data)
        serializer_class = GetCurrentUserProfileSerializer

        if serializer.is_valid(raise_exception=True):
        # if serializer.is_valid():
            # serializer.save(request)
            serializer.save()

            current_user = serializer.data
            # print('CURRENT USER   ----->  ', type(current_user['id']))
            profile = Profile.objects.get(
                user_id=current_user['id']
            )
            
            user_profile = serializer_class(profile)
            # user_profile = self.serializer_class(current_user.id)
            return Response(
                {"user": current_user,
                "profile": user_profile.data},
                status=status.HTTP_201_CREATED
                )
        # print('SERIALIZER ERRORS  --------->',serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

