from django.db import models
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class Decision(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=True)
    text = models.TextField(null=True)
    monetary_sanction = models.FloatField(null=True)
    # A supprimer quand on aura les modèles sous jacents? Ou au moins Enum et pas texte
    type = models.TextField(null=True)
    decision_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'name': self.name,
            'text': self.text,
            'monetary_sanction': self.monetary_sanction,
            'type': self.type,
            'decision_date': self.decision_date,
        }


class DecisionResource(resources.ModelResource):
    class Meta:
        model = Decision

    # Modify instance to customize
    def before_save_instance(self, instance, using_transactions, dry_run):
        pass


class DecisionAdmin(ImportExportModelAdmin):
    resource_class = DecisionResource
    list_display = (
        'name',
        'text',
        'monetary_sanction',
        'type',
        'decision_date',
    )
