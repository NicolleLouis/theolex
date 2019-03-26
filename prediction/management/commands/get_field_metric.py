from django.core.management.base import BaseCommand

from prediction.services.repository.judgement_repository import get_all_judgement
from prediction.services.repository.mail_repository import get_all_mail


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        field = 'topic'
        is_judgement = True

        ########
        # Main #
        ########
        result = {}
        missing_field = []
        items = get_all_judgement() if is_judgement else get_all_mail()
        for item in items:
            field_value = getattr(item, field)
            if not field_value or field_value == '':
                missing_field.append(item.id)
                field_value = "Error"
            if field_value in result:
                result[field_value] = result[field_value] + 1
            else:
                result[field_value] = 1

        Command.print_result(result)
        print(missing_field)

    @staticmethod
    def print_result(field_results):
        print("Result of the analysis: ")
        for field in field_results:
            print("############")
            print(str(field) + ' appeared ' + str(field_results[field]) + ' times.')
