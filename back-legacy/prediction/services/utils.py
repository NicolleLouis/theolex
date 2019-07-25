import logging
import itertools

from prediction.constants.judge_argument_start_words import judge_arguments_start_words

logger = logging.getLogger('import')


def split_judgement(text):
    conclusion_start = 'PAR CES MOTIFS'
    try:
        conclusion_index, conclusion_text = get_judge_conclusion(text, conclusion_start)
        non_conclusion_text = text[:conclusion_index]
    except Exception as e:
        logger.error(e)
        conclusion_text = ""
        non_conclusion_text = text

    try:
        judge_argument_text = get_judge_argument(non_conclusion_text, judge_arguments_start_words)
    except Exception as e:
        logger.error(e)
        judge_argument_text = ""

    return conclusion_text, judge_argument_text


def get_first_lines(text, number_of_lines_desired):
    index = 0
    for _ in itertools.repeat(None, number_of_lines_desired):
        index = text.find('\n', index) + 3
    return text[:index-3]


def get_judge_argument(text, start_words):
    judge_argument_index = -1
    for judge_arguments_start in start_words:
        if judge_argument_index == -1 and text.upper().find(judge_arguments_start) != -1:
            judge_argument_index = text.upper().index(judge_arguments_start)

    return text[judge_argument_index:] if judge_argument_index != -1 else ""


def get_judge_conclusion(text, conclusion_start):
    try:
        conclusion_index = text.upper().index(conclusion_start)
        conclusion_text = text[conclusion_index + len(conclusion_start) + 1:]
    except ValueError:
        logger.error('\'PAR CES MOTIFS\' not found in text')
        raise ValueError('\'PAR CES MOTIFS\' not found in text')

    return conclusion_index, conclusion_text


def get_length_max_item_in_array(array):
    array_length = map(len, array)
    return max(array_length)
