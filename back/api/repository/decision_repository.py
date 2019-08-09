from api.models import Decision


def fetch_decisions():
    return Decision.objects.all()
