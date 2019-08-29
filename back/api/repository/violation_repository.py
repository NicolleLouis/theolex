from api.models import Violation


class ViolationRepository:
    @staticmethod
    def get_violation_by_name(name):
        return Violation.objects.get(name=name)
