import ast

from django.http import JsonResponse

from api.repository.decision_repository import DecisionRepository
from api.repository.violation_repository import ViolationRepository
from api.services.decision.decision_service import DecisionService
from api.services.organization.organization_service import OrganizationService


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

    list_decision = DecisionService.transform_decision_list_to_json(filtered_decisions)
    ordered_list = DecisionService.order_decisions_by_date(list_decision)
    limited_list = ordered_list[:20]
    return JsonResponse({
        "number_of_hits": len(ordered_list),
        "hits": limited_list
    })


def get_filter_values(request):
    filter_label = request.GET.get('filter_label')

    distinct_values_of_field = DecisionRepository.get_distinct_values_of_field(filter_label)

    return JsonResponse({
            "filter_label": filter_label,
            "values": distinct_values_of_field
        })


def get_amount_by_company(request):
    all_organization_with_total_amount_paid = OrganizationService.get_all_organization_with_total_amount_paid()

    return JsonResponse({
        "hits": len(all_organization_with_total_amount_paid),
        "value": all_organization_with_total_amount_paid
    })


def get_benchmark(request):
    decisions_ids = request.GET.getlist('decisions[]')
    decisions = list(map(lambda decision_id: DecisionRepository.get_decision_by_id(decision_id), decisions_ids))
    decisions_json = list(map(lambda decision: decision.to_json_benchmark(), decisions))

    return JsonResponse({
        "hits": len(decisions_ids),
        "rows": list(decisions_json[0].keys()),
        "values": decisions_json
    })
