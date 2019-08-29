from django.db import models
from import_export.admin import ImportExportModelAdmin


class Violation(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(
        null=True,
        blank=True
    )
    long_name = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.long_name if self.long_name else self.name

    def to_json(self):
        return {
            'name': self.name,
            'long_name': self.long_name,
        }


class ViolationAdmin(ImportExportModelAdmin):
    list_display = (
        'name',
        'long_name',
    )
