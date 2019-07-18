from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r'^banker_obligation_to_warn$',
        views.display_arguments_banker_obligation_to_warn,
        name='arguments_banker_obligation_to_warn'
    ),
    url(
        r'^invalidity_of_the_bond$',
        views.display_arguments_invalidity_of_the_bond,
        name='arguments_invalidity_of_the_bond'
    ),
    url(r'^is_favorable_result$', views.is_favorable_results, name='is_favorable_results'),
    url(r'^$', views.home, name='home'),
]
