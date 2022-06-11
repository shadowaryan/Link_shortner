from turtle import update
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(models.Model):
    # username = models.CharField(max_length=32,unique=True)
    email = models.EmailField(max_length=128,unique=True)
    password = models.CharField(max_length=128)



class Url(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    original_url = models.CharField(max_length=512)
    short_url = models.CharField(max_length=32)
    counts = models.IntegerField()


    def __str__(self):
        return self.original_url


class HeaderData(models.Model):
    updated = models.DateTimeField(auto_now=True)
    url = models.ForeignKey(Url,on_delete=models.CASCADE)
    header_data = models.CharField(max_length=2048)