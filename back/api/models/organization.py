from django.db import models
from import_export.admin import ImportExportModelAdmin


class Organization(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(
        unique=True,
        null=True,
        blank=True
    )
    company_type = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'name': self.name,
            'company_type': self.company_type,
        }


class OrganizationAdmin(ImportExportModelAdmin):
    list_display = (
        'name',
        'company_type',
    )
