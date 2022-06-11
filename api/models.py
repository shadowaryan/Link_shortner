from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(models.Model):
    # username = models.CharField(max_length=32,unique=True)
    email = models.EmailField(max_length=128,unique=True)
    password = models.CharField(max_length=128)



class Url(models.Model):
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    original_url = models.CharField(max_length=512)
    short_url = models.CharField(max_length=32)
    counts = models.IntegerField(max_length=2)

    def __str__(self):
        return self.original_url