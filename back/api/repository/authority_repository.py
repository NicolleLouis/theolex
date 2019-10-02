from api.models import Authority


class AuthorityRepository:
    @staticmethod
    def get_authority_by_name(name):
        return Authority.objects.get(name=name)

    @staticmethod
    def get_all_authorities():
        return Authority.objects.all()
