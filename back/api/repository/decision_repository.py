from api.models import Decision


class DecisionRepository:
    @staticmethod
    def fetch_all_decisions():
        return Decision.objects.all()

    @staticmethod
    def filter_decisions(filters, decisions):
        for filter_key, filter_value in filters.items():
            # Ensures the field exist and the filter is not ill constructed
            Decision._meta.get_field(filter_key)

            # Filter the querySet
            decisions = decisions.filter(**{filter_key: filter_value})
        return decisions

    @staticmethod
    def get_distinct_values_of_field(field_name):
        raw_values = list(Decision.objects.values(field_name).distinct())
        values = list(map(lambda raw_value: raw_value[field_name], raw_values))
        return values

    @staticmethod
    def get_decision_by_name(name):
        return Decision.objects.get(name=name)

    @staticmethod
    def get_decision_by_id(id):
        return Decision.objects.get(id=id)
