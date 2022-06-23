from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from hashlib import md5
import random
import string
import json

from .models import Redirect, Url, User
from .serializers import UserSerializer,UrlSerializer,RedirectSerializer

# Create your views here.
@api_view(['POST'])
def create_short_link(request):
    user = User.objects.get(id=1)
    original_url = request.POST.get('original_url')
    print(original_url)
    # short_url = md5(original_url.encode()).hexdigest()[:5]
    letters = string.ascii_letters
    length = 6
    short_url = ''.join((random.choice(letters+string.digits)) for x in range(length))
    print(short_url)
    print("ok")
    if Url.objects.filter(user=user,original_url=original_url).exists() == False:
        url = Url(original_url=original_url,short_url=short_url,counts=0,user=user)
        url.save()
        print("added")
        
        return Response({
            'original_url': url.original_url,
            'short_url': url.short_url,
        })
        
    else :
        print('no')
        return Response({'original_url' : 'Given Url : ' +'\''+original_url+'\''+'  '+' is already in database.'})

    # return render(request,'api/index.html')

def visitor_ip_address(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def redirect_shortlink(request,id):
    try:
        url = Url.objects.get(short_url=id)
        header_data = request.headers
        ip_address = visitor_ip_address(request)
        redirect_ = Redirect(url=url ,header_data=header_data, ip_address=ip_address)
        redirect_.save()
        return redirect(url.original_url)
    except:
        return redirect(create_short_link)


# def user_sign(request,user):
#     try:
#         obj = User.objects.get(user=username)
#         user_id = obj.id
#         return redirect(link_input(request,user_id))
#     except:
#         return HttpResponse("no user found")

@api_view(['GET'])
@permission_classes([AllowAny])
def signup(request):
    # print(request.JSON)
    req_data = json.loads(request.body.decode('utf-8'))
    User.objects.create_user(email=req_data['email'],password=req_data['password'],username=req_data['username'])
    return Response({'message':'user successfully added'})


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
        data = Redirect.objects.all()
        serializer = RedirectSerializer(data,many=True)
        return Response(serializer.data)

# def login_verification(request):
#     if request.method == 'POST':
#         req_data = json.loads(request.body.decode('utf-8'))
#         try:
#             if User.objects.filter(email=req_data['email'],password=req_data['password']).exists():
#                 return redirect(create_short_link)
#         except:
#             return HttpResponse("login failed")


@api_view(['GET'])
@permission_classes([AllowAny])
def link_stats(request,id):
    user = User.objects.get(id=1)
    url = Url.objects.get(id=id,user=user)
    # redirect_ = Redirect.objects.filter(url=url)
    redirects = url.redirect_set.all()
    
    resp = {}

    for redirect in redirects:
        if redirect.created_at.strftime('%d-%m-%Y') not in resp:
            resp[redirect.created_at.strftime('%d-%m-%Y')] = 1
        else:
            resp[redirect.created_at.strftime('%d-%m-%Y')] += 1

    return Response(resp)


    