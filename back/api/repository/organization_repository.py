from api.models import Organization


class OrganizationRepository:
    @staticmethod
    def get_organization_by_name(name):
        return Organization.objects.get(name=name)
