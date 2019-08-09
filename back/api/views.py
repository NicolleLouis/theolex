from django.http import JsonResponse
from api.repository.decision_repository import fetch_decisions


def get_all_decisions(request):
    return JsonResponse({
        "hits": list(map(lambda decision: decision.to_json(), fetch_decisions()))
    })
