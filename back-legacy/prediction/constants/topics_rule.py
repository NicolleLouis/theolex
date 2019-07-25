# -*- coding: utf-8 -*-

from prediction.constants.atoms import atoms_rules
from prediction.services.repository.pattern_collection_repository import get_pattern_collection,\
    pattern_collection_to_json, get_all_pattern_label_in_collection

collection_topic_label = "Topic"
collection_topic = get_pattern_collection(collection_topic_label)


def get_topic_possible_label():
    return get_all_pattern_label_in_collection(collection_topic)


def get_topic_rules():
    topic_rules = pattern_collection_to_json(collection_topic)
    return topic_rules + atoms_rules
