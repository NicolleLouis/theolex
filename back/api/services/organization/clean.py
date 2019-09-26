from api.repository.organization_repository import OrganizationRepository


class CleanOrganizationService:
    @staticmethod
    def clean_organization_name():
        organizations = OrganizationRepository.get_all_organizations()
        for organization in organizations:
            organization.name = organization.name.strip()
            organization.save()
