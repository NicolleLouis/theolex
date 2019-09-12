# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from api.services.decision.clean import CleanDecisionService


class Command(BaseCommand):

    def handle(self, *args, **options):
        print("Cleaning type field values")
        CleanDecisionService.clean_decision_type()
        print("Done")

        print("Computing justice type")
        # todo: add rules for jurisprudence
        CleanDecisionService.compute_justice_type()
        print("Done")
