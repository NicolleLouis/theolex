# -*- coding: utf-8 -*-

import re
import logging

from prediction.services.pattern_recognition.judgement_specific import split_judgement_by_sentences
from prediction.services.pattern_recognition.core import is_pattern_in_text
from prediction.services.pattern_recognition.utils import get_pattern_by_label
from prediction.constants.amount_pattern import amount_rules, amount_label


logger = logging.getLogger('amount')


def find_amounts_from_judgement(judgement):
    sentences = split_judgement_by_sentences(judgement)
    price_regex = r'([0-9, .]+)(euros|€)'
    list_valid_amounts = []
    list_refused_amount = []
    for sentence in sentences:
        if re.search(price_regex, sentence, flags=re.IGNORECASE):
            matchs = re.findall(price_regex, sentence, flags=re.IGNORECASE)
            for match in matchs:
                amount = {
                    'price': convert_regex_amount_to_float(match[0]),
                    'sentence': sentence,
                }
                if does_sentence_match_amount_pattern(sentence):
                    list_valid_amounts.append(amount)
                else:
                    list_refused_amount.append(amount)
    return list_valid_amounts, list_refused_amount


def create_judgement_valid_amounts_from_list(list_amounts, judgement):
    from prediction.services.repository import judgement_amount_repository

    for amount in list_amounts:
        judgement_amount_repository.create_amount(
            judgement,
            amount['price'],
            amount['sentence'],
            amount['is_condemnation'],
            amount['is_the_bank_condemned'],
            True
        )


def create_judgement_invalid_amounts_from_list(list_amounts, judgement):
    from prediction.services.repository import judgement_amount_repository

    for amount in list_amounts:
        judgement_amount_repository.create_amount(
            judgement,
            amount['price'],
            amount['sentence'],
            False,
            False,
            False
        )


def does_sentence_match_amount_pattern(sentence):
    amount_pattern = get_pattern_by_label(amount_label["amount"], amount_rules)
    is_pattern_detected, _rule = is_pattern_in_text(sentence, amount_pattern, amount_rules)
    return is_pattern_detected


def convert_regex_amount_to_float(regex_amount):
    try:
        amount = regex_amount.strip(' .,')
        amount = amount.replace(" ", "")
        numbers_blocs = re.split(r'[,\.]', amount)
        if len(numbers_blocs) > 1:
            amount = ""
            for index, number_bloc in enumerate(numbers_blocs):
                if index != len(numbers_blocs) - 1:
                    amount = amount + number_bloc
                else:
                    if len(number_bloc) != 2:
                        amount = amount + number_bloc
                    else:
                        amount = amount + "." + number_bloc
        amount = float(amount)
        return amount
    except Exception as e:
        logger.error("Conversion of price in float failed with error: " + str(e))
        return 0


# Pour le moment on regroupe les condamnations rejetés et les condamnations contre d'autres personnes que la sogé.
# A split
def classify_valid_amounts(list_valid_amount):
    for amount in list_valid_amount:
        has_pattern_dismiss, has_pattern_condemn, has_pattern_societe_general = get_useful_patterns_in_amount(amount)
        if has_pattern_dismiss or has_pattern_condemn:
            amount["is_condemnation"] = True
        else:
            amount["is_condemnation"] = False
        if has_pattern_condemn and has_pattern_societe_general:
            amount["is_the_bank_condemned"] = True
        else:
            amount["is_the_bank_condemned"] = False
    return list_valid_amount


def get_useful_patterns_in_amount(amount):
    pattern_dismiss = get_pattern_by_label(amount_label["dismiss"], amount_rules)
    pattern_condemn = get_pattern_by_label(amount_label["condemn"], amount_rules)
    pattern_societe_general = get_pattern_by_label(amount_label["societe_general"], amount_rules)

    has_pattern_dismiss = is_pattern_in_text(amount['sentence'], pattern_dismiss, amount_rules)[0]
    has_pattern_condemn = is_pattern_in_text(amount['sentence'], pattern_condemn, amount_rules)[0]
    has_pattern_societe_general = is_pattern_in_text(amount['sentence'], pattern_societe_general, amount_rules)[0]

    return has_pattern_dismiss, has_pattern_condemn, has_pattern_societe_general
