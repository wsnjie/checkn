from django.contrib import admin

from .models import User, Place


# Register your models here.
admin.site.register([User, Place])
