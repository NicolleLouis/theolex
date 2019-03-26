from prediction.models import PatternRule


def fetch_pattern_rule():
    return PatternRule.objects.all()


def get_all_pattern_rule_from_pattern(pattern):
    return PatternRule.objects.all().filter(pattern=pattern)
