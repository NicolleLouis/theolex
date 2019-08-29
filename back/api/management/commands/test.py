# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from api.repository.decision_repository import DecisionRepository
from api.repository.violation_repository import ViolationRepository


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        fixtures = [
            ["Test", ["TWEA", "SSR"]]
        ]

        ##############

        for fixture in fixtures:
            decision = DecisionRepository.get_decision_by_name(fixture[0])
            violation_labels = fixture[1]
            for label in violation_labels:
                violation = ViolationRepository.get_violation_by_name(name=label)
                decision.violations.add(violation)
            decision.save()
