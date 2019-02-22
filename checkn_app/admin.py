from django.contrib import admin

from .models import AppUser, Place


# Register your models here.
admin.site.register([AppUser, Place])
