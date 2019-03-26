from django.shortcuts import render
import json


def home(request):
    return render(request, 'home.html')
