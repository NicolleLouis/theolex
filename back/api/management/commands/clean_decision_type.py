# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from api.repository.decision_repository import DecisionRepository


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        clean_type = {
            "dpa": "DPA",
            "Guilty Plea agreement": "Guilty Plea Agreement"
        }
        clean_type_keys = clean_type.keys()

        ##############

        decisions = DecisionRepository.fetch_all_decisions()
        number_of_changes = 0
        for decision in decisions:
            if decision.type in clean_type_keys:
                print("Cleaning: " + decision.type)
                number_of_changes += 1
                decision.type = clean_type[decision.type]
                decision.save()
        print("##############")
        print("Finished cleaning")
        print(str(number_of_changes) + " lines changed")
        print("##############")
