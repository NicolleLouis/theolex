from prediction.models.judgement_import import JudgementImport


def create_judgement_import(data):
    return JudgementImport.objects.create(
        data=data
    )
