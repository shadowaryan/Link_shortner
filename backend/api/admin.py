from django.contrib import admin

# Register your models here.

from .models import Url,User,HeaderData

admin.site.register(User)
admin.site.register(Url)
admin.site.register(HeaderData)