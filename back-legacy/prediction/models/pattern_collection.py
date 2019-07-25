from django.db import models
from django.contrib import admin


class PatternCollection(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.label


class PatternCollectionAdmin (admin.ModelAdmin):
        list_display = (
            'label',
        )
