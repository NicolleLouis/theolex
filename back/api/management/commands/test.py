# -*- coding: utf-8 -*-
import csv
import os

from django.core.management.base import BaseCommand


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
                print(row)
