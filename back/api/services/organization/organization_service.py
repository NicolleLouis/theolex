from api.repository.organization_repository import OrganizationRepository


class OrganizationService:
    @staticmethod
    def get_all_organization_with_total_amount_paid():
        organizations_with_total_amount_paid = []
        organizations = OrganizationRepository.get_all_organizations()

        for organization in organizations:
            organizations_with_total_amount_paid.append({
                "company": organization.name,
                "amount_paid": OrganizationRepository.get_total_amount_paid_by_organization(organization)
            })

        return organizations_with_total_amount_paid
