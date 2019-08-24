import ast

from api.models import Decision


def fetch_all_decisions():
    return Decision.objects.all()


def get_decisions_with_filter(filters):
    filtered_decisions = fetch_all_decisions()
    for filter_key, filter_value in filters.items():
        # Ensures the field exist and the filter is not ill constructed
        Decision._meta.get_field(filter_key)

        # Filter the querySet
        filtered_decisions = filtered_decisions.filter(**{filter_key: filter_value})
    return filtered_decisions
