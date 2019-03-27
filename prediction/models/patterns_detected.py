from django.db import models
from django.contrib import admin

from prediction.models.judgment import Judgement


class PatternDetected(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200, null=True)
    judgement = models.ForeignKey(
        Judgement,
        null=True,
        on_delete=models.CASCADE
    )
    input_text = models.TextField(blank=True, null=True)
    abstract = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.label

    def to_json(self):
        return {
            'label': self.label,
            'judgement': self.judgement.to_json()
        }

    def to_str(self):
        message = "PatternDetected: " + str(self.label) + "\n"
        message += "Règle métier: " + str(self.input_text) + "\n"
        message += "Abstract: " + str(self.abstract)
        return message


#########
# Admin #
#########

class PatternDetectedAdmin (admin.ModelAdmin):
        list_display = (
            'id',
            'label',
            'abstract',
            'judgement'
        )


##########
# Inline #
##########

class PatternDetectedInline(admin.TabularInline):
    model = PatternDetected
