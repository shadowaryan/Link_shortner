from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from hashlib import md5
import random
import string
import json

from .models import Url, User
from .serializers import UserSerializer,UrlSerializer

# Create your views here.

def link_input(request):
    if request.method == 'POST':
        original_url = request.POST.get('original_url')
        print(original_url)
        # short_url = md5(original_url.encode()).hexdigest()[:5]
        letters = string.ascii_letters
        length = 6
        short_url = ''.join((random.choice(letters+string.digits)) for x in range(length))
        print(short_url)
        print("ok")
        url = Url(original_url=original_url,short_url=short_url)

        url.save()
        return render(request,'api/index.html',{
            'original_url' : original_url,
            'short_url' : request.get_host() + '/' + short_url
        })

    print("hello")
    return render(request,'api/index.html')


def link_output(request,id):
    try:
        obj = Url.objects.get(short_url=id)
        return redirect(obj.original_url)
    except:
        return redirect(link_input)


# def user_sign(request,user):
#     try:
#         obj = User.objects.get(user=username)
#         user_id = obj.id
#         return redirect(link_input(request,user_id))
#     except:
#         return HttpResponse("no user found")

def req(request):
    # print(request.JSON)
    req_data = json.loads(request.body.decode('utf-8'))
    data = User(email=req_data['email'],password=req_data['password'])
    data.save()
    print(req_data)
    return HttpResponse("hello")


@api_view(['GET'])
def out(request):
    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data,many=True)
        return Response(serializer.data)