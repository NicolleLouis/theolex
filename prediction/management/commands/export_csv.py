# -*- coding: utf-8 -*-

# Commands to run on server without script:
# ssh ubuntu@theolex.sicara.tech
# sudo su
# cd /webapps/theolex/
# source bin/activate
# cd theolex/
# python manage.py export_csv > ../doc/Theolex_export_judgement.csv
# "Go back to your computer"
# scp ubuntu@theolex.sicara.tech:/webapps/theolex/doc/Theolex_export_judgement.csv ~/Downloads/Theolex_export_judgement.csv

# Commands to run with script:
#
# ssh ubuntu@theolex.sicara.tech 'bash -s' < ~/scripts/export_csv_theolex
# scp ubuntu@theolex.sicara.tech:/webapps/theolex/doc/Theolex_export_judgement.csv ~/Downloads/Theolex_export_judgement.csv


from django.core.management.base import BaseCommand

from prediction.services.repository.judgement_repository import get_all_judgement, is_argument_linked_to_judgement
from prediction.constants.arguments_rule import argument_label

columnNames = [
    "filename",
    "topic",
    argument_label["excessive_debt"],
    argument_label["borrower_quality"],
    argument_label["handwritten_references_anomaly"],
]

csv_separator = ";"

boolean_true = "True"
boolean_false = "False"


class Command(BaseCommand):

    def handle(self, *args, **options):
        csv = Command.create_csv_with_header()
        judgments = get_all_judgement()
        for judgment in judgments:
            csv = Command.add_judgment_to_csv(csv, judgment)
        print(csv)

    @staticmethod
    def add_judgment_to_csv(csv, judgement):
        csv = Command.add_field_to_csv(csv, judgement.filename)
        csv = Command.add_field_to_csv(csv, judgement.topic)
        csv = Command.add_argument_presence_field(csv, judgement, argument_label["excessive_debt"])
        csv = Command.add_argument_presence_field(csv, judgement, argument_label["borrower_quality"])
        csv = Command.add_argument_presence_field(csv, judgement, argument_label["handwritten_references_anomaly"])
        return csv + "\n"

    @staticmethod
    def add_field_to_csv(csv, field):
        if field:
            return csv + field + csv_separator
        else:
            return csv + csv_separator

    @staticmethod
    def create_csv_with_header():
        csv = ""
        for columnName in columnNames:
            csv = csv + columnName + csv_separator
        return csv + "\n"

    @staticmethod
    def add_argument_presence_field(csv, judgement, argument_label):
        return Command.add_field_to_csv(
            csv,
            Command.convert_boolean_to_string(
                is_argument_linked_to_judgement(
                    argument_label,
                    judgement
                )
            )
        )

    @staticmethod
    def convert_boolean_to_string(boolean):
        return boolean_true if boolean else boolean_false
