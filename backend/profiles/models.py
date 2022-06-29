# from cloudinary import CloudinaryImage
# from cloudinary.models import CloudinaryField
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

from core.models import TimeStampModel


class Profile(TimeStampModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user = models.OneToOneField(
    #     settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # first_name = models.CharField(
    #     'first name', max_length=30, blank=True, null=True)
    # last_name = models.CharField(
        # 'last name', max_length=30, blank=True, null=True)
    birth_date = models.DateField('birth date', null=True, blank=True)
    bio = models.TextField('bio', default='', null=True, blank=True)
    city = models.ForeignKey(
        'City',
        related_name="user_city",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        max_length=100, 
        default=''
    )
    # city = models.CharField(
    #     'city', 
    #     blank=True, 
    #     null=True,
    #     max_length=100, 
    #     default=''
    #     )
    country = models.CharField('country', blank=True,
                               null=True, max_length=100, default='')
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True
    )
    # phone = models.IntegerField('phone', blank=True, null=True, default=0)
    website = models.URLField('website', blank=True, null=True, default='')
    # image = CloudinaryField(
    #     'image',
    #     default="image/upload/t_media_lib_thumb/v1554230107/samples/people/boy-snow-hoodie.jpg")
    # Add a follows field to allow users to follow each other
    # symmetrical is False as if a user follows you,
    # then that does not automatically mean that you follow that user
    # related name for the user QuerySet filters 'followed_by'
    follows = models.ManyToManyField('Profile',
                                     through='CustomFollows',
                                     through_fields=(
                                         'from_profile', 'to_profile'),
                                     related_name="followed_by",
                                     symmetrical=False)
    is_teacher = models.BooleanField(
        'is_teacher', default=False, blank=True, null=True)
    is_student = models.BooleanField(
        'is_student', default=True, blank=True, null=True)

    def __str__(self):
        return self.user.username

    @property
    def get_username(self):
        return self.user.username

    # @property
    # def get_cloudinary_url(self):
    #     image_url = CloudinaryImage(str(self.image)).build_url(
    #         width=100, height=150, crop='fill')
    #     return image_url

    @property
    def followers(self):
        profiles = self.to_profile.all()
        return [profile.from_profile.user for profile in profiles]


"""
Signal receiver for 'post_save' signal sent by User model upon saving
"""


def create_profile(sender, **kwargs):
    if kwargs.get('created'):
        user_profile = Profile(user=kwargs.get('instance'))
        user_profile.save()


# connect the signal to the handler function
post_save.connect(create_profile, sender=settings.AUTH_USER_MODEL)


class CustomFollows(models.Model):
    from_profile = models.ForeignKey(Profile, on_delete=models.CASCADE,
                                     related_name="from_profile")
    to_profile = models.ForeignKey(Profile, on_delete=models.CASCADE,
                                   related_name="to_profile")

class City(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user = models.OneToOneField(
    #     settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    def __str__(self):
        return self.user.username
