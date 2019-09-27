import datetime
import pytz


class DecisionService:

    @staticmethod
    def decision_has_violation(decision, violations):
        decision_violations = decision.violations.all()
        for decision_violation in decision_violations:
            if decision_violation in violations:
                return True
        return False

    @staticmethod
    def convert_violations_to_tags(decision):
        tag_color = "DarkCyan"

        decision_violations = decision.violations.all()
        violations_label = list(map(lambda violation: str(violation), decision_violations))
        violations_tag = list(map(lambda violation_label: {
            "label": violation_label,
            "color": tag_color
        }, violations_label))
        return violations_tag

    @staticmethod
    def transform_decision_list_to_json(decisions):
        return list(map(lambda decision: decision.to_json(), decisions))

    @staticmethod
    def order_decisions_by_date(decisions):
        def sort_key(decision):
            if decision["decision_date"] is not None:
                return decision["decision_date"]
            else:
                return pytz.utc.localize(datetime.datetime.min)

        return sorted(decisions, key=sort_key, reverse=True)
