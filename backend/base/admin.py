from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import Group
# from django.contrib.auth.models import  User

# Register your models here.
from .models import Note
# from .models import Note, User
# from .models import Note, User, Student


# class User(BaseUserAdmin):
# # class UserAdmin(BaseUserAdmin):
#     add_fieldsets = (
#         (None, {
#             'fields': ('email', 'username', 'is_student', 'is_teacher', 'password', 'confirm')
#         }),
#         ('Permissions', {
#             'fields': ('is_superuser', 'is_staff')
#         })
#     )
#     fieldsets = (
#         (None, {
#             'fields': ('email', 'username', 'is_student', 'is_teacher', 'password')
#         }),
#         ('Permissions', {
#             'fields': ('is_superuser', 'is_staff')
#         })
#     )
#     list_display = ['email', 'username', 'is_student', 'is_teacher']
#     search_fields = ('email', 'username')
#     ordering = ('email',)


admin.site.register(Note)
# admin.site.register(Student)
# admin.site.register(User)
# admin.site.register(User, UserAdmin)
# admin.site.register(UserAdmin)
# admin.site.unregister(Group)
