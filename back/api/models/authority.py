from django.db import models
from import_export.admin import ImportExportModelAdmin


class Authority(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(
        null=True,
        blank=True
    )
    jurisdiction = models.TextField(
        null=True,
        blank=True
    )
    type = models.TextField(
        null=True,
        blank=True
    )
    publication_website = models.TextField(
        null=True,
        blank=True
    )
    description = models.TextField(
        null=True,
        blank=True
    )
    country = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'name': self.name,
            'type': self.type,
            'country': self.country,
            'jurisdiction': self.jurisdiction,
        }


class AuthorityAdmin(ImportExportModelAdmin):
    list_display = (
        'name',
        'type',
        'country',
        'jurisdiction',
    )
