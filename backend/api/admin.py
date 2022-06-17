from django.contrib import admin

# Register your models here.

from .models import Url,User

admin.site.register(User)
admin.site.register(Url)