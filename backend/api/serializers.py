from rest_framework import serializers
from .models import User,Url,HeaderData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = '__all__'

class HeaderDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderData
        fields = '__all__'