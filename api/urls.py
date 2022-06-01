from django.urls import path
from . import views

urlpatterns = [
    path('', views.link_input),
    path('<id>',views.link_output),
    path('req/', views.req),
    # path('<user>',views.user_sign),
]
