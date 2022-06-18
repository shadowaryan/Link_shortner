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

from .models import HeaderData, Url, User
from .serializers import UserSerializer,UrlSerializer,HeaderDataSerializer

# Create your views here.

def create_short_link(request):
    if request.method == 'POST':
        original_url = request.POST.get('original_url')
        print(original_url)
        # short_url = md5(original_url.encode()).hexdigest()[:5]
        letters = string.ascii_letters
        length = 6
        short_url = ''.join((random.choice(letters+string.digits)) for x in range(length))
        print(short_url)
        print("ok")
        if Url.objects.filter(original_url=original_url).exists() == False:
            url = Url(original_url=original_url,short_url=short_url,counts=0,user=User.objects.get(id='1'))
            print('here')
            url.save()
            
            return render(request,'api/index.html',{
            'original_url' : original_url,
            'short_url' : request.get_host() + '/' + short_url
            })
            
        else :
            print('no')
            return render(request,'api/index.html',{'original_url' : 'Given Url : ' +'\''+original_url+'\''+'  '+' is already in database.'})

    return render(request,'api/index.html')

def visitor_ip_address(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print(ip)


def redirect_shortlink(request,id):
    try:
        obj = Url.objects.get(short_url=id)
        header = request.headers
        hdata = HeaderData(url=Url.objects.get(id=obj.id) ,header_data=header)
        counts = obj.counts+1
        obj.counts = counts
        obj.save()
        hdata.save()
        print(obj.counts)
        visitor_ip_address(request)
        return redirect(obj.original_url)
    except:
        return redirect(create_short_link)


# def user_sign(request,user):
#     try:
#         obj = User.objects.get(user=username)
#         user_id = obj.id
#         return redirect(link_input(request,user_id))
#     except:
#         return HttpResponse("no user found")

def storing_user_info(request):
    # print(request.JSON)
    req_data = json.loads(request.body.decode('utf-8'))
    data = User.objects.create_user(email=req_data['email'],password=req_data['password'],username=req_data['username'])
    # data.save()
    print(req_data)
    return HttpResponse("hello")


@api_view(['GET'])
def out(request):
    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data,many=True)
        return Response(serializer.data)


@api_view(['GET'])
def url(request):
    if request.method == 'GET':
        data = Url.objects.all()
        serializer = UrlSerializer(data,many=True)
        return Response(serializer.data)

@api_view(['GET'])
def req_data(request):
    if request.method == 'GET':
        data = HeaderData.objects.all()
        serializer = HeaderDataSerializer(data,many=True)
        return Response(serializer.data)

def login_verification(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode('utf-8'))
        try:
            if User.objects.filter(email=req_data['email'],password=req_data['password']).exists():
                return redirect(create_short_link)
        except:
            return HttpResponse("login failed")