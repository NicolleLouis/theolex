from django.urls import path
from .views import get_all_results

urlpatterns = [
    path('get_all_results', get_all_results),
]
