import ast

from django.http import JsonResponse

from api.repository.decision_repository import get_decisions_with_filter
from api.services.utils import transform_decision_list_to_json


def get_decisions(request):
    input_search_bar = request.GET.get('input_search_bar')
    # ToDo: input_search_bar match un des labels des jugements
    print(input_search_bar)

    filters = ast.literal_eval(request.GET.get('filters'))
    filtered_decisions = get_decisions_with_filter(filters)

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
