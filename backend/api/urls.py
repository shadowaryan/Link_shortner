from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', views.create_short_link),
    path('redirect/<id>',views.redirect_shortlink),
    path('signup/', views.signup),
    # path('<user>',views.user_sign),
    path('user/', views.out),
    path('url/', views.url),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('header/',views.req_data),
    # path('login_verification/',views.login_verification),
    path('link-stats/<int:id>',views.link_stats),
]
