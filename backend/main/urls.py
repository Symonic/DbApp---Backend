from django.contrib import admin
from django.urls import path

from main.views import HomeView, LogoutView

#AUTH
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('home/', HomeView.as_view(), name = 'home'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name = 'token_refresh'),
    path('logout/', LogoutView.as_view(), name = 'logout')
]
