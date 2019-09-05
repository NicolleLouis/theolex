from api.models import Violation


class ViolationRepository:
    @staticmethod
    def get_violation_by_name(name):
        return Violation.objects.get(name=name)

    @staticmethod
    def get_violations_containing_string(violation_string):
        violation_string = violation_string.lower()
        violations_containing_string = []

        violations = Violation.objects.all()

        for violation in violations:
            if violation_string in violation.name.lower() or violation_string in violation.long_name.lower():
                violations_containing_string.append(violation)

        return violations_containing_string
