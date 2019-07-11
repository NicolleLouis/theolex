from prediction.services.pattern_recognition.engine import *
from prediction.services.pattern_recognition.utils import is_pattern_label_in_patterns


def get_sentences_with_pattern(pattern, sentences, patterns):
    recognized_sentences = []
    for sentence in sentences:
        _is_pattern_in_text, _rule_detail = is_pattern_in_text(sentence, pattern, patterns)
        if _is_pattern_in_text:
            recognized_sentences.append(sentence)
    return recognized_sentences


def find_all_patterns_in_text(text, list_possible_patern_label, patterns):
    list_pattern_detected = []
    for pattern_label in list_possible_patern_label:
        pattern = get_pattern_by_label(pattern_label, patterns)
        is_detected, rule_detail = is_pattern_in_text(text, pattern, patterns)
        if is_detected:
            pattern_detected = {
                'label': pattern['label'],
                'input': rule_detail
            }
            list_pattern_detected.append(pattern_detected)
    return list_pattern_detected


def find_all_patterns_in_sentences(sentences, list_possible_patern_label, patterns):
    list_pattern_detected = []
    for sentence in sentences:
        new_patterns = find_all_patterns_in_text(
            sentence,
            list_possible_patern_label,
            patterns
        )
        for new_pattern in new_patterns:
            new_pattern['sentence'] = sentence
        list_pattern_detected = list_pattern_detected + new_patterns
    return list_pattern_detected


# Care, this function return both the result and a detail
def is_pattern_in_text(text, pattern, patterns):
    if pattern['atomic']:
        for rule_input in pattern['inputs']:
            if is_rule_detected_in_text(rule_input, text):
                return True, rule_input
        return False, ""
    else:
        for rule_input in pattern['inputs']:
            list_sub_pattern = get_list_pattern_in_molecular_rule_input(rule_input, patterns)
            details = {}
            result = True
            for sub_pattern in list_sub_pattern:
                is_detected, rule_detail = is_pattern_in_text(text, sub_pattern, patterns)
                result = result and is_detected
                details[sub_pattern["label"]] = rule_detail
            if result:
                return result, details
        return False, ""


def get_pattern_by_label(label, list_patterns):
    for pattern in list_patterns:
        if pattern["label"] == label:
            return pattern

    return None


def deduplicate_patterns(patterns):
    unique_patterns = []
    for pattern in patterns:
        if not is_pattern_label_in_patterns(pattern["label"], unique_patterns):
            unique_patterns.append(pattern)
    return unique_patterns
