# -*- coding: utf-8 -*-
import csv
import os

from django.core.management.base import BaseCommand

from api.repository.decision_repository import DecisionRepository
from api.repository.organization_repository import OrganizationRepository


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        file_name = "decision_organization.csv"
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
                if row[1] and row[1] != "":
                    organization_labels = row[1].split(",")
                    for label in organization_labels:
                        try:
                            organization = OrganizationRepository.get_organization_by_name(name=label)
                            decision.organizations.add(organization)
                        except Exception as e:
                            print("######################")
                            print("Error: Organization not found")
                            print("decision: " + str(decision))
                            print("organization_labels: " + str(organization_labels))
                            print("label: " + str(label))
                    decision.save()
