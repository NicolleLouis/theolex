from urllib.request import Request

from django.shortcuts import render

# Create your views here.
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse


def get_all_results(request):
    return JsonResponse({
        "hits": [
            {
                "title": "DPA - Nestlé vs NY",
                "text": "Texte intégrale du jugement (Long), à terme peut etre un fichier à télécharger",
                "date": "25/07/2019",
                "amount": "100$",
                "labels": [
                    "Endettement Excessif",
                    "Défaut de conseil"
                ]
            },
        ]
    })


urlpatterns = [
    path('get_all_results', get_all_results),
]

