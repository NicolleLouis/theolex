from django.db import models
from django.contrib import admin

from prediction.models.mail import Mail


class MailArgument(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200, null=True)
    mail = models.ForeignKey(
        Mail,
        null=True,
        on_delete=models.CASCADE
    )
    is_applicable = models.BooleanField(default=True)
    input_text = models.TextField(blank=True, null=True)
    abstract = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.label

    def to_str(self):
        message = "Argument: " + str(self.label) + "\n"
        message += "Règle métier: " + str(self.input_text) + "\n"
        message += "Abstract: " + str(self.abstract)
        return message


class MailArgumentAdmin (admin.ModelAdmin):
        list_display = (
            'id',
            'label',
            'abstract',
            'mail',
        )
