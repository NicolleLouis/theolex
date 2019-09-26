# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from api.services.organization.clean import CleanOrganizationService


class Command(BaseCommand):

    def handle(self, *args, **options):
        print("Cleaning organization name")
        CleanOrganizationService.clean_organization_name()
        print("Done")
