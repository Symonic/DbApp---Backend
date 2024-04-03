from django.contrib import admin
from django.urls import path

from main.views import login

urlpatterns = [
    path('login/', login)
]
