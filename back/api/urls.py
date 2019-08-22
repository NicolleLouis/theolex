from django.urls import path
from .views import get_all_decisions, get_filter_values

urlpatterns = [
    path('get_all_results', get_all_decisions),
    path('get_filter_values', get_filter_values),
]
