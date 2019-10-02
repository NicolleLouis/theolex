# -*- coding: utf-8 -*-
import csv
import os

from django.core.management.base import BaseCommand

from api.repository.decision_repository import DecisionRepository
from api.repository.authority_repository import AuthorityRepository


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        file_name = "decision_authority.csv"
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
                authority_labels = row[1].split(",")
                for label in authority_labels:
                    try:
                        authority = AuthorityRepository.get_authority_by_name(name=label)
                        decision.authorities.add(authority)
                    except Exception as e:
                        print("######################")
                        print("Error: Authority not found")
                        print("decision: " + str(decision))
                        print("authority_labels: " + str(authority_labels))
                        print("label: " + str(label))
                decision.save()
