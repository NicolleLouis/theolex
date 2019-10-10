from django.db import models
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from api.services.decision.decision_service import DecisionService
from api.services.formatter import FormatterService


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
    document_link = models.TextField(
        null=True,
        blank=True
    )
    press_release_link = models.TextField(
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
    justice_type = models.TextField(
        null=True,
        blank=True
    )
    defendant = models.TextField(
        null=True,
        blank=True
    )
    decision_date = models.DateTimeField(
        null=True,
        blank=True
    )
    violations = models.ManyToManyField(
        'Violation',
        blank=True,
        related_name='decisions'
    )
    authorities = models.ManyToManyField(
        'Authority',
        blank=True,
        related_name='decisions'
    )
    organizations = models.ManyToManyField(
        'Organization',
        blank=True,
        related_name='decisions'
    )

    def __str__(self):
        return str(self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'text': self.text,
            'monetary_sanction': self.monetary_sanction,
            'justice_type': self.justice_type,
            'type': self.type,
            'decision_date': self.decision_date,
            'authorities': self.get_many_to_many_values("authorities"),
            'press_release_link': self.press_release_link,
            'document_link': self.document_link,
            'defendant': self.defendant,
            'tags': self.get_tags()
        }

    def to_json_benchmark(self):
        return {
            'name': self.name,
            'justice_type': self.justice_type,
            'type': self.type,
            'defendant': self.defendant,
            'monetary_sanction': FormatterService.format_monetary_amount(self.monetary_sanction),
            'decision_date': self.decision_date,
        }

    def get_tags(self):
        tags = []
        # Add monetary sanction
        if self.monetary_sanction:
            tags.append(
                {
                    "label": FormatterService.format_monetary_amount(self.monetary_sanction),
                    "color": "LightCoral"
                }
            )
        # Add violations
        tags.extend(DecisionService.convert_violations_to_tags(self))
        return tags

    def get_many_to_many_values(self, field_name):
        many_to_many_objects = self.__getattribute__(field_name).all()
        many_to_many_label = list(
            map(
                lambda many_to_many_object: str(many_to_many_object),
                many_to_many_objects
            )
        )
        return many_to_many_label


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
        'justice_type',
        'type',
        'decision_date',
        # 'get_violations',
        # 'get_authorities',
        # 'get_organizations'
    )

    def get_violations(self, decision):
        return decision.get_many_to_many_values("violations")
    get_violations.short_description = "Violations"

    def get_authorities(self, decision):
        return decision.get_many_to_many_values("authorities")
    get_authorities.short_description = "Authorities"

    def get_organizations(self, decision):
        return decision.get_many_to_many_values("organizations")
    get_organizations.short_description = "Organizations"
