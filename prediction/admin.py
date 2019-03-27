from django.contrib import admin

from django.contrib.auth.models import User, Group
from .models import TextAnalysed, TextAnalysedAdmin, TextAnalysedImport,\
    TextAnalysedImportAdmin, PatternCollection, PatternCollectionAdmin, \
    Pattern, PatternAdmin, PatternRule, PatternRuleAdmin, PatternDetected, PatternDetectedAdmin


# Register your models here.
admin.site.register(TextAnalysedImport, TextAnalysedImportAdmin)
admin.site.register(TextAnalysed, TextAnalysedAdmin)
admin.site.register(PatternCollection, PatternCollectionAdmin)
admin.site.register(Pattern, PatternAdmin)
admin.site.register(PatternRule, PatternRuleAdmin)
admin.site.register(PatternDetected, PatternDetectedAdmin)

admin.site.unregister(User)
admin.site.unregister(Group)
