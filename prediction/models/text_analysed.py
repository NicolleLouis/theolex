from django.db import models


class TextAnalysed(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=200, null=True, blank=True)
    text = models.TextField(blank=True, null=True)
    analysis_successful = models.BooleanField(default=True)
    error_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return 'Text number ' + str(self.id)
