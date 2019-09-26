from django.urls import path
from .views import get_decisions, get_filter_values, get_amount_by_company, get_benchmark

urlpatterns = [
    path('get_decisions', get_decisions),
    path('get_filter_values', get_filter_values),
    path('get_amount_by_company', get_amount_by_company),
    path('get_benchmark', get_benchmark),
]
