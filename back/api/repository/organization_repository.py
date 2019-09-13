from api.models import Organization


class OrganizationRepository:
    @staticmethod
    def get_organization_by_name(name):
        return Organization.objects.get(name=name)

    @staticmethod
    def get_all_organizations():
        return Organization.objects.all()

    @staticmethod
    def get_total_amount_paid_by_organization(organization):
        total_amount = 0
        decisions = organization.decisions.all()
        for decision in decisions:
            if decision.monetary_sanction:
                total_amount += decision.monetary_sanction
        return total_amount
