# -*- coding: utf-8 -*-
import csv
import os

from django.core.management.base import BaseCommand

from api.repository.decision_repository import DecisionRepository
from api.repository.violation_repository import ViolationRepository


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        file_name = "decision_violation.csv"
        relative_path = "api/data/{}".format(file_name)
        current_directrory = os.path.dirname(os.path.realpath('__file__'))

        ##############

        with open(os.path.join(current_directrory, relative_path)) as csvfile:
            readCSV = csv.reader(csvfile, delimiter=',')
            for row in readCSV:
                try:
                    decision = DecisionRepository.get_decision_by_name(row[0])
                except Exception as e:
                    print("######################")
                    print("Error: Decision not found")
                    print("decision name:" + row[0])
                    continue
                violation_labels = row[1].split(",")
                for label in violation_labels:
                    try:
                        violation = ViolationRepository.get_violation_by_name(name=label)
                        decision.violations.add(violation)
                    except Exception as e:
                        print("######################")
                        print("Error: Violation not found")
                        print("decision: " + str(decision))
                        print("violation_labels: " + str(violation_labels))
                        print("label: " + str(label))
                decision.save()
