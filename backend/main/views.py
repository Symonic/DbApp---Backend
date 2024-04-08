from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class HomeView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):

        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)
    
class LogoutView(APIView):
    
    permission_classes = (IsAuthenticated, )

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)