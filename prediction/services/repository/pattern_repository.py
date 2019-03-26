from prediction.models import Pattern


def fetch_pattern():
    return Pattern.objects.all()


def get_pattern_with_collection(pattern_collection):
    return Pattern.objects.all().filter(pattern_collection__in=pattern_collection)


def pattern_to_json(pattern):
    from prediction.services.repository.pattern_rule_repository import get_all_pattern_rule_from_pattern

    list_rules = get_all_pattern_rule_from_pattern(pattern)
    formatted_list_rules = list(map(lambda rule: rule.to_list(), list_rules))
    return {
        'label': pattern.label,
        'atomic': pattern.is_atomic,
        'inputs': formatted_list_rules
    }
