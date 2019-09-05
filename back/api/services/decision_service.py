class DecisionService:

    @staticmethod
    def decision_has_violation(decision, violations):
        decision_violations = decision.violations.all()
        for decision_violation in decision_violations:
            if decision_violation in violations:
                return True
        return False
