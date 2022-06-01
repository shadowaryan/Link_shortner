from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse

from hashlib import md5
import random
import string


from .models import Url
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
    x= request.POST.get("email")
    print(x)
    return HttpResponse("hello"+x)