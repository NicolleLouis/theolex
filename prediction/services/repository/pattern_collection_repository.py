from prediction.models import PatternCollection


def fetch_pattern_collection():
    return PatternCollection.objects.all()


def get_pattern_collection(label):
    return PatternCollection.objects.all().filter(label=label)


def pattern_collection_to_json(collection):
    from prediction.services.repository.pattern_repository import get_pattern_with_collection, pattern_to_json

    list_pattern = get_pattern_with_collection(collection)
    return list(map(lambda pattern: pattern_to_json(pattern), list_pattern))


def get_all_pattern_label_in_collection(collection):
    from prediction.services.repository.pattern_repository import get_pattern_with_collection

    list_pattern = get_pattern_with_collection(collection)
    return list(map(lambda pattern: pattern.label, list_pattern))
