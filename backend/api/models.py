from ipaddress import ip_address
from turtle import update
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# class User(models.Model):
#     # username = models.CharField(max_length=32,unique=True)
#     email = models.EmailField(max_length=128,unique=True)
#     password = models.CharField(max_length=128)

class BaseModel(models.Model):
    """
    Base model that other models will inherit from.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class User(AbstractUser, BaseModel):
    email = models.EmailField(max_length=128,unique=True)
    password = models.CharField(max_length=128)
    username = models.CharField(max_length=128,unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []



class Url(BaseModel):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    original_url = models.CharField(max_length=512)
    short_url = models.CharField(max_length=32)


    def __str__(self):
        return self.original_url


class Redirect(BaseModel):
    url = models.ForeignKey(Url,on_delete=models.CASCADE)
    header_data = models.CharField(max_length=2048)
    ip_address = models.CharField(max_length=32)