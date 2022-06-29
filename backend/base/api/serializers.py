from rest_framework.serializers import ModelSerializer, SerializerMethodField
# from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator, ValidationError
from django.contrib.auth.models import update_last_login

# from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_auth.registration.serializers import RegisterSerializer

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.authentication import JWTAuthentication
import re
from six import text_type
from allauth.account.adapter import get_adapter
from django.conf import settings

from django.contrib.auth.models import  User
import jwt
# from rest_framework_jwt.utils import jwt_payload_handler, jwt_encode_handler
from profiles.models import Profile
from profiles.serializers import GetCurrentUserProfileSerializer

from base.models import Note
# from base.models import Note, User
# from .error_messages import errors
# from .error import errors
from base.apps import errors


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher')

# class CreateUserSerializer(RegisterSerializer):
class CreateUserSerializer(ModelSerializer):
# class CreateUserSerializer(ModelSerializer, RegisterSerializer):
# class CreateUserSerializer(RegisterSerializer, ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
        validators=[RegexValidator(
            regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$",
            message=errors['password']['weak_password'])],
        error_messages={
            "max_length": errors['password']['max_length'],
            "min_length": errors['password']['min_length'],
            "blank": errors['password']['blank'],
            "required": errors['password']['required']
        }
    )

    username = serializers.CharField(
        required=True,
        error_messages={
            "required": errors['username']['required'],
            "blank": errors['username']['blank'],
            "invalid": errors['username']['invalid']
        }
    )
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def email_validate(email):
        regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

        if not re.match(regex, email):
            raise serializers.ValidationError(errors['email']['invalid'])
            
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(
            queryset=User.objects.all(), message=errors['email']['unique']),
            email_validate],
        error_messages={
            "required": errors['email']['required'],
            "blank": errors['email']['blank'],
            "invalid": errors['email']['invalid']
        }
    )

    # id = serializers.ModelField(model_field=User._meta.get_field('id'), required=False)

    password = serializers.CharField(min_length=8, required=True, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True, required=True)
    tokens = serializers.SerializerMethodField()

    # is_student = serializers.BooleanField(required=False)
    # is_teacher = serializers.BooleanField(required=False)

    class Meta:
        model = User
        # fields = ('email', 'username', 'password', 'password2', 'tokens', 'is_student', 'is_teacher')
        # fields = ('id', 'email', 'first_name', 'last_name', 'username', 'password', 'password2', 'tokens', 'is_student', 'is_teacher')
        fields = ('id', 'email', 'first_name', 'last_name', 'username', 'password', 'password2', 'tokens')
        extra_kwargs = {'password': {'write_only': True}}

    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        refresh['email'] = user.email
        refresh['username'] = user.username
        # refresh['first_name'] = user.first_name
        # refresh['last_name'] = user.last_name

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def validate_username(self, username):

        uname = "^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"

        if User.objects.filter(username=username.lower()).exists():
            # raise serializers.ValidationError(errors['username']['unique'])
            raise ValidationError(errors['username']['unique'])

        if not re.match(uname, username):
            # raise serializers.ValidationError(errors['username']['invalid'])
            raise ValidationError(errors['username']['invalid'])

        return username.lower()



    # def create(self, validated_data):
    # # def save(self, *args, **kwargs):
    #     password = validated_data.pop('password', None)
    #     password2 = validated_data.pop('password2', None)
        
    #     instance = self.Meta.model(**validated_data)

    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()

    #     # return instance
    #     self.instance = instance
    #     return self.instance
    
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            # is_student=validated_data['is_student'],
            # is_teacher=validated_data['is_teacher'],
            password=validated_data['password'])
        return user


# class RegisterUserSerializer(ModelSerializer):
class RegisterUserSerializer(RegisterSerializer, TokenObtainPairSerializer, JWTAuthentication):
    """Serializer for creating user objects."""
    # tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        # fields = '__all__'
        # fields = ('id', 'password', 'email', 'tokens')
        # extra_kwargs = {'password': {'write_only': True}}
        # fields = ('id', 'username', 'password', 'email', 'tokens')
        # fields = ('id', 'username', 'password', 'email', 'token')
        fields = ('username', 'password', 'email')
        # fields = ('username', 'password', 'email', 'tokens')
        # fields = ('email', 'password', 'token')
        # fields = '__all__'
        # extra_kwargs = {'password': {'write_only': True}}
        # extra_kwargs = {'password': {'write_only': True,
        #                              'min_length': 5,
        #                              'style': {
        #                                  'input_type': 'password'
        #                              }}}

    # def get_tokens(self, user):
    #     tokens = RefreshToken.for_user(user)
    #     refresh = text_type(tokens)
    #     access = text_type(tokens.access_token)
    #     data = {
    #         "refresh": refresh,
    #         "access": access
    #     }
    #     return data

    # def get_auth_token(self, obj):
    #     payload = jwt_payload_handler(obj)
    #     token = jwt_encode_handler(payload)
    #     return token
 
    # def create_token(user):
    #     payload = jwt_payload_handler(user)
    #     token = jwt.encode(payload, settings.SECRET_KEY)
    #     return token.decode('unicode_escape')

    # def create(self, validated_data):
    #     print('VALIDATED DATA -------------->  ',self.validated_data)
    #     user = User(
    #         email=self.validated_data['email']
    #     )
    #     user.set_password(self.validated_data['password'])
    #     user.save()    
    #     return user

    # def create(self, validated_data):
    #     """Create a new user with encrypter password"""
    #     user = User.objects.create_user(**validated_data)
    #     return user  
 
    

    # def get_cleaned_data(/

    def create(self, request):
    # def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.save()
        adapter.save_user(request, user, self)
        return user

    def update(self, instance, validated_data):
        """Update a user setting the password correctly"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField(required=False)
    is_teacher = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher')
        # fields = ('email', 'username', 'password')

    def get_cleaned_data(self, request):
        return {
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            # 'confirm': self.validated_data.get('confirm', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', '')
        }

    def save(self, request):
    # def create(self, request):

        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.save()
        adapter.save_user(request, user, self)
        return user


# class TokenSerializer(ModelSerializer):
#     user_type = SerializerMethodField()

#     class Meta:
#         model = Token
#         fields = ('key', 'user', 'user_type')

#     def get_user_type(self, obj):
#         serializer_data = UserSerializer(
#             obj.user
#         ).data
#         is_student = serializer_data.get('is_student')
#         is_teacher = serializer_data.get('is_teacher')
#         return {
#             'is_student': is_student,
#             'is_teacher': is_teacher
#         }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # token = serializers.SerializerMethodField()
    user_type = serializers.SerializerMethodField()


    # @classmethod
    # def get_token(cls, user):
    def get_token(self, user):
        
        # print('THIS IS THE USER   --->  ---->  ----->', user)
        # print('THIS IS THE USER TYPE   --->  ---->  ----->', type(user) )

        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        # ...

        profile = Profile.objects.get(user_id=user.id)
        serializer_data = GetCurrentUserProfileSerializer(profile).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        
        token['is_student'] = is_student
        token['is_teacher'] = is_teacher

        return token

    # def get_user_type(self, user):
    # # def get_user_type(self, obj):
    #     # token = super().get_token(user)

    #     profile = Profile.objects.get(
    #             user_id=user.id
    #         )
            
    #     serializer_data = GetCurrentUserProfileSerializer(profile).data
            
    #     is_student = serializer_data.get('is_student')
    #     is_teacher = serializer_data.get('is_teacher')
    #     return {
    #         'is_student': is_student,
    #         'is_teacher': is_teacher
    #     }

    class Meta:
        model = User
        fields = '__all__'
        # fields = ('token', 'is_student', 'is_teacher', 'user_type')
    