from django.core.management.base import BaseCommand

from prediction.services.repository.judgement_repository import get_all_judgement


class Command(BaseCommand):

    def handle(self, *args, **options):

        ##############
        # Parameters #
        ##############

        test_message = "ToDo replace me"

        ########
        # Main #
        ########

        result = {
            'Error': 0,
            'Success': 0
        }
        error_cases = []
        items = get_all_judgement()
        for item in items:
            error_message = item.error_message
            if error_message is not None and error_message.find(test_message) > -1:
                error_cases.append(item.id)
                result['Error'] = result['Error'] + 1
            else:
                result['Success'] = result['Success'] + 1

        Command.print_result(result)
        print(error_cases)

    @staticmethod
    def print_result(jurisdiction_results):
        print("Result of the analysis: ")
        for jurisdiction in jurisdiction_results:
            print("############")
            print(jurisdiction + ' appeared ' + str(jurisdiction_results[jurisdiction]) + ' times.')
