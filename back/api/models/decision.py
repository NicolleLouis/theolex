from django.db import models
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ManyToManyWidget

from api.constant import string_separator


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
    violations = models.ManyToManyField(
        'Violation',
        null=True,
        blank=True
    )

    def __str__(self):
        return str(self.name)

    def to_json(self):
        return {
            'name': self.name,
            'text': self.text,
            'monetary_sanction': self.monetary_sanction,
            'type': self.type,
            'decision_date': self.decision_date,
            'violations': self.get_violations()
        }

    def get_violations(self):
        violations = self.violations.all()
        violations_label = list(map(lambda violation: str(violation), violations))
        return string_separator.join(violations_label)


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
        'monetary_sanction',
        'type',
        'decision_date',
        'get_violations'
    )
