from django.db import models

# Create your models here.
class Url(models.Model):
    original_url = models.CharField(max_length=512)
    short_url = models.CharField(max_length=32)

    def __str__(self):
        return self.original_url