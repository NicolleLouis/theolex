from django.db import models
from django.contrib import admin


class Decision(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=True)
    # A remplacer par l'URL?
    text = models.TextField(null=True)
    monetary_sanction = models.FloatField(null=True)
    # A supprimer quand on aura les modèles sous jacents? Ou au moins Enum et pas texte
    type = models.TextField(null=True)
    decision_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.name


class DecisionAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'text',
        'monetary_sanction',
        'type',
        'decision_date',
    )
