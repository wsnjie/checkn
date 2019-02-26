from rest_framework import serializers
from .models import AppUser
from .models import Place
from django.contrib.auth.models import User


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ("id", "name")


class AppUserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True)

    class Meta:
        model = AppUser
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    app_user = AppUserSerializer()

    class Meta:
        model = User
        fields = ("id", "app_user")


class PlaceSerializer(serializers.ModelSerializer):
    users = AppUserSerializer(many=True)

    class Meta:
        model = Place
        fields = "__all__"
