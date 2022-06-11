from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', views.link_input),
    path('<id>',views.link_output),
    path('req/', views.req),
    # path('<user>',views.user_sign),
    path('user/', views.out),
    path('url/', views.url),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('header/',views.req_data)
]
