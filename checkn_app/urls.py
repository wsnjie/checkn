from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("appuser", views.AppUserView)

urlpatterns = [
    path("", include(router.urls)),
    path("current_user/", views.current_user),
]

