from django.db import models
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ManyToManyWidget


class Decision(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(
        null=True,
        blank=True
    )
    text = models.TextField(
        null=True,
        blank=True
    )
    monetary_sanction = models.FloatField(
        null=True,
        blank=True
    )
    # A supprimer quand on aura les modèles sous jacents? Ou au moins Enum et pas texte
    type = models.TextField(
        null=True,
        blank=True
    )
    decision_date = models.DateTimeField(
        null=True,
        blank=True
    )
    authority = models.ForeignKey(
        'Authority',
        blank=True,
        null=True,
        on_delete=models.SET_NULL
    )
    violations = models.ManyToManyField('Violation')

    def __str__(self):
        return str(self.name)

    def to_json(self):
        return {
            'name': self.name,
            'text': self.text,
            'monetary_sanction': self.monetary_sanction,
            'type': self.type,
            'decision_date': self.decision_date,
            'authority_name': self.authority.name if self.authority else None,
            # ToDo: unmock me
            'violations': ["mock", "todo"]
        }


class DecisionResource(resources.ModelResource):
    class Meta:
        model = Decision
        fields = [
            'id',
            'name',
            'text',
            'monetary_sanction',
            'type',
            'decision_date',
        ]


class DecisionAdmin(ImportExportModelAdmin):
    resource_class = DecisionResource
    list_display = (
        'name',
        'get_authority_name',
        'monetary_sanction',
        'type',
        'decision_date',
    )

    def get_authority_name(self, instance):
        return instance.authority.name if instance.authority else None
    get_authority_name.short_description = "authority"
