import ast

from django.http import JsonResponse

from api.repository.decision_repository import DecisionRepository
from api.services.utils import transform_decision_list_to_json


def get_decisions(request):
    filters = request.GET.get('filters')
    input_search_bar = request.GET.get('input_search_bar')

    filtered_decisions = DecisionRepository.fetch_all_decisions()

    if filters:
        filters = ast.literal_eval(filters)
        filtered_decisions = DecisionRepository.filter_decisions(filters, filtered_decisions)

    if input_search_bar:
        filtered_decisions = filtered_decisions.filter(**{"text__icontains": input_search_bar})

    return JsonResponse({
        "hits": transform_decision_list_to_json(filtered_decisions)
    })


def get_filter_values(request):
    filter_label = request.GET.get('filter_label')

    distinct_values_of_field = DecisionRepository.get_distinct_values_of_field(filter_label)

    return JsonResponse({
            "filter_label": filter_label,
            "values": distinct_values_of_field
        })
