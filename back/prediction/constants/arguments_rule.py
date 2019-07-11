# -*- coding: utf-8 -*-

from prediction.constants.atoms import atoms_rules
from prediction.services.repository.pattern_collection_repository import get_pattern_collection,\
    pattern_collection_to_json, get_all_pattern_label_in_collection

collection_argument_label = "Argument"
collection_argument = get_pattern_collection(collection_argument_label)


def get_argument_possible_label():
    return get_all_pattern_label_in_collection(collection_argument)


def get_argument_rules():
    argument_rules = pattern_collection_to_json(collection_argument)
    return argument_rules + atoms_rules
