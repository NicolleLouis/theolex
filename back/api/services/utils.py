def transform_decision_list_to_json(decisions):
    return list(map(lambda decision: decision.to_json(), decisions))
