from django.urls import path
from . import views

urlpatterns = [
    path('', views.link_input),
    path('<id>',views.link_output),
]
