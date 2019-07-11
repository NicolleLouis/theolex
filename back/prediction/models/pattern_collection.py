from django.db import models
from import_export.admin import ImportExportModelAdmin


class PatternCollection(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.label


class PatternCollectionAdmin (ImportExportModelAdmin):
        list_display = (
            'label',
        )
