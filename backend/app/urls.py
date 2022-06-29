from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),

    path('api/', include('base.api.urls')),
    path('api/', include('profiles.urls', namespace='profiles')),

    path('assignments/', include('assignment.assignments.urls')),
    path('graded-assignments/', include('assignment.graded_assignments.urls')),
    
    path('', include('django_prometheus.urls')),

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]


if settings.DEBUG:
    # print('MEDIA_URL   for debug ---> ', settings.MEDIA_URL, 'DEBUG', settings.DEBUG, 'MEDIA_ROOT', settings.MEDIA_ROOT)
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )

    # print('STATIC_URL  for not debug ---> ', settings.STATIC_URL, 'DEBUG', settings.DEBUG, 'STATIC_ROOT', settings.STATIC_ROOT)
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )

    # import debug_toolbar
    # urlpatterns = [
    #     path('__debug__/', include(debug_toolbar.urls)),
    # ] + urlpatterns


# if not settings.DEBUG:
#     # print('MEDIA_URL   for debug ---> ', settings.MEDIA_URL, 'DEBUG', settings.DEBUG, 'MEDIA_ROOT', settings.MEDIA_ROOT)
#     urlpatterns += static(
#         settings.MEDIA_URL,
#         document_root=settings.MEDIA_ROOT,
#     )


# if settings.DEBUG: 
#     # print('STATIC_URL  for not debug ---> ', settings.STATIC_URL, 'DEBUG', settings.DEBUG, 'STATIC_ROOT', settings.STATIC_ROOT)
#     urlpatterns += static(
#         settings.STATIC_URL,
#         document_root=settings.STATIC_ROOT
#     )

urlpatterns += [re_path(r"^.*",
                        TemplateView.as_view(template_name="index.html"))]
