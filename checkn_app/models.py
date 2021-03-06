from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Place(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AppUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="app_user")
    name = models.CharField(max_length=100, blank=True)
    lon = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    friends = models.ManyToManyField(
        "self", default=1, related_name="friends_list", blank=True
    )
    status = models.CharField(max_length=100, default="", blank="true")
    place = models.ForeignKey(
        Place,
        default="",
        on_delete=models.SET_NULL,
        related_name="user_list",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        AppUser.objects.create(user=instance, name=instance.username)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.app_user.save()
