from django.contrib import admin
from django.shortcuts import redirect

# Register your models here.

from .models import Url,User,Redirect

admin.site.register(User)
admin.site.register(Url)
admin.site.register(Redirect)