import re


def split_text(text, regex):
    return re.split(regex, text)


def get_pattern_by_label(label, list_patterns):
    for pattern in list_patterns:
        if pattern["label"] == label:
            return pattern

    return None


def create_molecular_pattern(label, atoms_lists):
    return \
        {
            'atomic': False,
            'label': label,
            'inputs': atoms_lists
        }


def get_atoms_label_within_pattern(pattern):
    if pattern['atomic']:
        return pattern['label']
    else:
        flat_atoms_within_pattern = []
        for input_rule in pattern["inputs"]:
            flat_atoms_within_pattern = flat_atoms_within_pattern + input_rule
        return flat_atoms_within_pattern


def is_pattern_label_in_patterns(pattern_label, patterns):
    patterns_label = list(map(lambda pattern: pattern["label"], patterns))
    return pattern_label in patterns_label
