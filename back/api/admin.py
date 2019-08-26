from django.contrib import admin

from django.contrib.auth.models import User, Group
from .models import Decision, DecisionAdmin, Authority, AuthorityAdmin

# Register your models here.
admin.site.register(Decision, DecisionAdmin)
admin.site.register(Authority, AuthorityAdmin)

# Clean useless model
admin.site.unregister(User)
admin.site.unregister(Group)
