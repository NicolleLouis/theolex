from django.contrib import admin

from django.contrib.auth.models import User, Group
from .models import Judgement, JudgementAdmin, JudgementImport,\
    JudgementImportAdmin, Mail, \
    MailAdmin, MailImport, MailImportAdmin, \
    JudgementAmount, JudgementAmountAdmin, PatternCollection, PatternCollectionAdmin, \
    Pattern, PatternAdmin, PatternRule, PatternRuleAdmin


# Register your models here.
admin.site.register(JudgementImport, JudgementImportAdmin)
admin.site.register(Judgement, JudgementAdmin)
admin.site.register(JudgementAmount, JudgementAmountAdmin)
admin.site.register(MailImport, MailImportAdmin)
admin.site.register(Mail, MailAdmin)
admin.site.register(PatternCollection, PatternCollectionAdmin)
admin.site.register(Pattern, PatternAdmin)
admin.site.register(PatternRule, PatternRuleAdmin)

admin.site.unregister(User)
admin.site.unregister(Group)
