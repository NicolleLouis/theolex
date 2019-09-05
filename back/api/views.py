import ast

from django.http import JsonResponse

from api.repository.decision_repository import DecisionRepository
from api.repository.violation_repository import ViolationRepository
from api.services.decision_service import DecisionService
from api.services.utils import transform_decision_list_to_json


def get_decisions(request):
    filters = request.GET.get('filters')
    input_search_bar = request.GET.get('input_search_bar')

    filtered_decisions = DecisionRepository.fetch_all_decisions()

    if filters:
        filters = ast.literal_eval(filters)
        filtered_decisions = DecisionRepository.filter_decisions(filters, filtered_decisions)

    if input_search_bar:
        violations = ViolationRepository.get_violations_containing_string(input_search_bar)
        temporary_filtered_decision = []
        for decision in filtered_decisions:
            if DecisionService.decision_has_violation(decision, violations):
                temporary_filtered_decision.append(decision)

        filtered_decisions = temporary_filtered_decision
        # filtered_decisions_ = filtered_decisions.filter(**{"text__icontains": input_search_bar})

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
