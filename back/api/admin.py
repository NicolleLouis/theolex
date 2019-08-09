from django.contrib import admin

from .models import Decision, DecisionAdmin

# Register your models here.
admin.site.register(Decision, DecisionAdmin)
