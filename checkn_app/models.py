from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    auth_id = models.CharField(max_length=100)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    friends = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends")

    def __str__(self):
        return self.name
