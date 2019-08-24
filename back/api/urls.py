from django.urls import path
from .views import get_decisions, get_filter_values

urlpatterns = [
    path('get_decisions', get_decisions),
    path('get_filter_values', get_filter_values),
]
