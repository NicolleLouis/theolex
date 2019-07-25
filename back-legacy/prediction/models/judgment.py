from django.db import models


class Judgement(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=200, null=True, blank=True)
    jurisdiction = models.CharField(max_length=200, null=True, blank=True)
    jurisdiction_city = models.CharField(max_length=200, null=True, blank=True)
    is_favorable = models.BooleanField(default=True)
    text = models.TextField(blank=True, null=True)
    analysis_successful = models.BooleanField(default=True)
    error_message = models.TextField(blank=True, null=True)
    topic = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateTimeField(blank=True, null=True)
    claimant = models.CharField(blank=True, max_length=100, null=True)
    defendant = models.CharField(blank=True, max_length=100, null=True)
    judge_argument = models.TextField(blank=True, null=True)
    topic_rule = models.TextField(blank=True, null=True)
    total_amount_requested = models.FloatField(null=True)
    total_amount_condemned = models.FloatField(null=True)
    percentage_condemnation = models.FloatField(null=True)

    def __str__(self):
        try:
            is_favorable = 'Favorable' if self.is_favorable else 'Défavorable'
            return 'Judgement number ' + str(self.id) + ' - ' + is_favorable + ' - ' + self.date.strftime('%d/%m/%Y')
        except Exception as e:
            return 'Judgement number ' + str(self.id) + ' not analysed, error ' + e

    def to_json(self):
        return {
            'topic': self.topic,
            'is_favorable': self.is_favorable
        }
