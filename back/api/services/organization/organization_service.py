from api.repository.organization_repository import OrganizationRepository
from api.services.formatter import FormatterService


class OrganizationService:
    @staticmethod
    def get_all_organization_with_total_amount_paid():
        organizations_with_total_amount_paid = []
        organizations = OrganizationRepository.get_all_organizations()

        for organization in organizations:
            amount_paid = OrganizationRepository.get_total_amount_paid_by_organization(organization)
            organizations_with_total_amount_paid.append({
                "company": organization.name,
                "company_type": organization.company_type,
                "amount_paid": amount_paid,
                "amount_paid_formatted": FormatterService.format_monetary_amount(amount_paid)
            })

        return organizations_with_total_amount_paid
