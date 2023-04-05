from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db.models import Count

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from hashlib import md5
import random
import string
import json
from operator import itemgetter

from .models import Redirect, Url, User
from .serializers import UserSerializer,UrlSerializer,RedirectSerializer

# Create your views here.
@api_view(['POST'])
def create_short_link(request):
    user = User.objects.get(id=1)
    req_data = json.loads(request.body.decode('utf-8'))
    original_url = req_data['original_url']
    print(original_url)
    # short_url = md5(original_url.encode()).hexdigest()[:5]
    letters = string.ascii_letters
    length = 6
    short_url = ''.join((random.choice(letters+string.digits)) for x in range(length))
    print(short_url)
    print("ok")
    if Url.objects.filter(user=user,original_url=original_url).exists() == False:
        url = Url(original_url=original_url,short_url=short_url,user=user)
        url.save()
        print("added")
        
        return Response({
            'original_url': url.original_url,
            'short_url': 'http://localhost:8000/redirect/'+url.short_url,
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





#no of click on specific date
#id is of user auth user id

@api_view(['GET'])
@permission_classes([AllowAny])
def link_stats(request,id):
    user = User.objects.get(id=1)
    # latest = (Url.objects.last()).id
    # latest = latest+1
    # print(latest)
    # resp = {}
    # total = (Redirect.objects.last()).id
    # for x in range(latest):
    #     if Redirect.objects.filter(url=x).exists()==True:
    #         url = Url.objects.get(id=x,user=user)
    #         # redirect_ = Redirect.objects.filter(url=url)
    #         redirects = url.redirect_set.all()
    #         # print(x)
            

    #         for redirect in redirects:
    #             if redirect.created_at.strftime('%d-%m-%Y') not in resp:
    #                 resp[redirect.created_at.strftime('%d-%m-%Y')] = 1
    #             else:
    #                 resp[redirect.created_at.strftime('%d-%m-%Y')] += 1
    # resp['total_click'] = total
    # print(resp)
    # return Response(resp)

    urls = Url.objects.filter(user=user).all()
    resp = {}
    for url in urls:
        if url.redirect_set.all().exists()==True:
            redirects = url.redirect_set.all()
            for redirect in redirects:
                if redirect.created_at.strftime('%d-%m-%Y') not in resp:
                    resp[redirect.created_at.strftime('%d-%m-%Y')] = 1
                else:
                    resp[redirect.created_at.strftime('%d-%m-%Y')] += 1
    resp['total_click'] = Redirect.objects.filter(url__user=user).count()
    print(resp)
    return Response(resp)



#top5 redirect links

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def top_links_(request,id):
#     user = User.objects.get(id=1)
#     latest = (Url.objects.last()).id  #50
#     latest = latest+1
#     print(latest)
#     resp={}
#     for x in range(latest):  # 1,4,5,6
#         if Redirect.objects.filter(url=x).exists()==True:
#             url = (Url.objects.get(id=x)).original_url
#             count = Redirect.objects.filter(url=x).count()
#             resp[url] = count
    
#     top_resp = dict(sorted(resp.items(), key = itemgetter(1), reverse = True)[:5])
#     print(top_resp)
#     return JsonResponse(top_resp)
@api_view(['GET'])
@permission_classes([AllowAny])
def top_links(request, id):
    user = User.objects.get(id=1)

    urls = Url.objects.filter(user=user).all()

    print(urls)

    resp = {}
    for url in urls:
        redirect_count = url.redirect_set.count()
        resp[url.original_url] = redirect_count

    top_resp = dict(sorted(resp.items(), key = itemgetter(1), reverse = True)[:5])
    print(top_resp)
    return Response(top_resp)




#recent 10 created links

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def recent_links_(request,id):
#     latest_id = (Url.objects.last()).id
#     resp = {}
#     for x in range(10): # 40 -> 50
#         resp_id = latest_id-x
#         resp[(Url.objects.get(id=resp_id)).original_url] = resp_id
#     print(resp)
#     return JsonResponse(resp)
@api_view(['GET'])
@permission_classes([AllowAny])
def recent_links(request, id):
    user = User.objects.get(id=1)
    urls = Url.objects.filter(user=user).all()

    resp = {}
    

    recent_urls = Url.objects.filter(user=user).order_by('-created_at').values('original_url', 'short_url')[:10]
    # print(recent_urls)
    new_urls = recent_urls

    for url in urls:
        redirect_count = url.redirect_set.count()
        resp[url.original_url] = redirect_count
    # print(resp)
    
    for url in recent_urls:
        url['clicks'] = resp.get(url.get('original_url'))

    return Response(recent_urls)

