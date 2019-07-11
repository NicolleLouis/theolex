# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand

from prediction.models import *


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        models_to_clean = [Mail, MailImport, MailArgument]

        ##############

        for model_to_clean in models_to_clean:
            Command.clean_model(model_to_clean)

    @staticmethod
    def clean_model(model_name):
        print("Cleaning model: " + str(model_name))
        model_name.objects.all().delete()
        print("Done")