from rest_framework import serializers
from .models import AppUser, Place
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "username"


class AppUserSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = AppUser
        fields = ("id", "name", "friends")

