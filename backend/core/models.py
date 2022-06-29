from django.db import models
from django.utils.translation import ugettext_lazy as _

class Sample(models.Model):
    attachment = models.FileField()


class TimeStampModel(models.Model):

    # A timestamp representing when this object was created.
    # created_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)

    # A timestamp reprensenting when this object was last updated.
    # updated_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(
        _('updated at'), auto_now_add=False, auto_now=True)
        
    class Meta:
        abstract = True
