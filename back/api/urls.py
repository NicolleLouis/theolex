from django.urls import path
from .views import get_all_decisions

urlpatterns = [
    path('get_all_results', get_all_decisions),
]
