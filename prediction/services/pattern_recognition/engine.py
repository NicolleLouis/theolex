import re

from prediction.services.pattern_recognition.utils import get_pattern_by_label


def get_list_pattern_in_molecular_rule_input(rule_input, patterns):
    list_pattern_output = []
    for pattern_label in rule_input:
        list_pattern_output.append(get_pattern_by_label(pattern_label, patterns))
    return list_pattern_output


def is_rule_detected_in_text(rule_inputs, text):
    for rule_input in rule_inputs:
        if not re.search(rule_input, text, re.IGNORECASE):
            return False
    return True
