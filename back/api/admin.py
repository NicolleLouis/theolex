from django.contrib import admin

from django.contrib.auth.models import User, Group
from .models import Decision, DecisionAdmin, Authority, AuthorityAdmin, Violation, ViolationAdmin, \
    Organization, OrganizationAdmin

# Register your models here.
admin.site.register(Decision, DecisionAdmin)
admin.site.register(Authority, AuthorityAdmin)
admin.site.register(Violation, ViolationAdmin)
admin.site.register(Organization, OrganizationAdmin)

# Clean useless model
admin.site.unregister(User)
admin.site.unregister(Group)
