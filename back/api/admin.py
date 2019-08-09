from django.contrib import admin

from django.contrib.auth.models import User, Group
from .models import Decision, DecisionAdmin

# Register your models here.
admin.site.register(Decision, DecisionAdmin)

# Clean useless model
admin.site.unregister(User)
admin.site.unregister(Group)
