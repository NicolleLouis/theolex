from django.db import models
from import_export.admin import ImportExportModelAdmin

from prediction.models.pattern_collection import PatternCollection


class Pattern(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200, null=True)
    is_atomic = models.BooleanField(default=True)
    pattern_collection = models.ForeignKey(
        PatternCollection,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.label


class PatternAdmin (ImportExportModelAdmin):
    from prediction.models.pattern_rule import PatternRuleInline

    list_display = (
        'label',
        'is_atomic',
        'pattern_collection'
    )
    inlines = [
        PatternRuleInline,
    ]
