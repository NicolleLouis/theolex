# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand

from prediction.services.repository.judgement_repository import get_all_judgement
from prediction.services.repository.judgement_repository import reset_judgement_analysis
from prediction.services.import_service.judgement_import_service import analyse_judgement


class Command(BaseCommand):

    def handle(self, *args, **options):
        judgements = get_all_judgement()
        index = 0
        print(str(len(judgements)) + " judgements to reanalyse")
        for judgement in judgements:
            print("start analysis of judgement " + str(index))
            reset_judgement_analysis(judgement)
            analyse_judgement(judgement)
            index = index + 1
