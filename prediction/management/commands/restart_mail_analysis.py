# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand

from prediction.services.repository.mail_repository import get_all_mail
from prediction.services.repository.mail_repository import reset_mail_analysis
from prediction.services.import_service.mail_import_service import analyse_mail


class Command(BaseCommand):

    def handle(self, *args, **options):
        mails = get_all_mail()
        index = 0
        print(str(len(mails)) + " mails to reanalyse")
        for mail in mails:
            print("start analysis of mails " + str(index))
            reset_mail_analysis(mail)
            analyse_mail(mail)
            index = index + 1
