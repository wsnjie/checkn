from django.db import models

# Create your models here.
class Place(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=100)
    auth_id = models.CharField(max_length=100)
    lon = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    friends = models.ManyToManyField(
        "self", default=1, related_name="friends_list", blank=True
    )
    status = models.CharField(max_length=100)
    place = models.ForeignKey(
        Place,
        default=1,
        on_delete=models.CASCADE,
        related_name="place_name",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

