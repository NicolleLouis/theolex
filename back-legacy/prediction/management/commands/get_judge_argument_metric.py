from django.core.management.base import BaseCommand

from prediction.services.repository.judgement_repository import get_all_judgement
from prediction.constants.judge_argument_start_words import judge_arguments_start_words
from prediction.services.utils import get_length_max_item_in_array


class Command(BaseCommand):

    def handle(self, *args, **options):
        analysis_length = Command.get_analysis_length()

        list_error = []
        output_rule_result = {'error': 0}
        for judge_arguments_start_word in judge_arguments_start_words:
            output_rule_result[judge_arguments_start_word] = 0

        judgements = get_all_judgement()
        for judgement in judgements:
            judgement_result = Command.analyse_judgement(judgement, analysis_length)
            Command.update_metrics(judgement_result, output_rule_result)
            if not judgement_result:
                list_error.append(judgement.id)
        Command.print_output_rule_result(output_rule_result)
        Command.print_list_error(list_error)

    @staticmethod
    def analyse_judgement(judgement, analysis_length):
        if judgement.judge_argument != None:
            for judge_arguments_start_word in judge_arguments_start_words:
                if judgement.judge_argument.upper().find(judge_arguments_start_word, 0, analysis_length) != -1:
                    return judge_arguments_start_word
        return None

    @staticmethod
    def get_analysis_length():
        return get_length_max_item_in_array(judge_arguments_start_words)

    @staticmethod
    def update_metrics(judgement_result, output_rule_result):
        if judgement_result in output_rule_result.keys():
            output_rule_result[judgement_result] += 1
        elif judgement_result == None:
            output_rule_result['error'] += 1

    @staticmethod
    def print_output_rule_result(output_rule_result):
        print("#################################")
        print("Résultat des règles métiers")
        for rule in output_rule_result:
            print(rule, ": ", output_rule_result[rule])
        print("\n")

    @staticmethod
    def print_list_error(list_error):
        print("#################################")
        print("List des id des jugements pour lesquels nous n'avons pas trouvé les arguments du juge")
        for error in list_error:
            print(error)
