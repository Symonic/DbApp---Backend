from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.

@api_view(['POST'])
def login(request):
    return Response({'Response':'Success'})