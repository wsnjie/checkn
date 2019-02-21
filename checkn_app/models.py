from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    auth_id = models.CharField(max_length=100)
    lon = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    friends = models.ManyToManyField(
        "self", default=1, related_name="friends_list", blank=True, null=True
    )
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name
