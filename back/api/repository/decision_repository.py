from api.models import Decision


def fetch_all_decisions():
    return Decision.objects.all()


def filter_decisions(filters, decisions):
    for filter_key, filter_value in filters.items():
        # Ensures the field exist and the filter is not ill constructed
        Decision._meta.get_field(filter_key)

        # Filter the querySet
        decisions = decisions.filter(**{filter_key: filter_value})
    return decisions
