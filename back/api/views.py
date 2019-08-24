import ast

from django.http import JsonResponse

from api.repository.decision_repository import fetch_all_decisions, filter_decisions
from api.services.utils import transform_decision_list_to_json


def get_decisions(request):
    filters = request.GET.get('filters')
    input_search_bar = request.GET.get('input_search_bar')

    filtered_decisions = fetch_all_decisions()

    if filters:
        filters = ast.literal_eval(filters)
        filtered_decisions = filter_decisions(filters, filtered_decisions)

    if input_search_bar:
        filtered_decisions = filtered_decisions.filter(**{"text__icontains": input_search_bar})

    return JsonResponse({
        "hits": transform_decision_list_to_json(filtered_decisions)
    })


def get_filter_values(request):
    return JsonResponse(
        {
            "filter_label": "type",
            "values": [
                "DPA",
                "OFAC",
                "Jurisprudence"
            ]
        }
    )
