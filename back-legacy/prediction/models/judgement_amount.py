# -*- coding: utf-8 -*-

from django.db import models
from django.contrib import admin

from prediction.models.judgment import Judgement


class JudgementAmount(models.Model):
    id = models.AutoField(primary_key=True)
    price = models.FloatField(null=True)
    judgement = models.ForeignKey(
        Judgement,
        null=True,
        on_delete=models.CASCADE
    )
    sentence = models.TextField(blank=True, null=True)
    is_condemnation = models.BooleanField(default=False)
    is_the_bank_condemned = models.BooleanField(default=True)
    is_valid = models.BooleanField(default=True)

    def __str__(self):
        return self.sentence

    def to_str(self):
        result = "Prix: " + str(self.price) + "€\n"
        result = result + "Phrase: " + self.sentence
        return result


class JudgementAmountAdmin (admin.ModelAdmin):
        list_display = (
            'id',
            'price',
            'sentence',
            'judgement',
            'is_condemnation',
            'is_the_bank_condemned',
            'is_valid',
        )
