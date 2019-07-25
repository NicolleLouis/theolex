from prediction.models import JudgementAmount


def fetch_amounts():
    return JudgementAmount.objects.all()


def create_amount(judgement, price, sentence, is_condemnation, is_the_bank_condemned, is_valid):
    return JudgementAmount.objects.create(
        judgement=judgement,
        price=price,
        sentence=sentence,
        is_condemnation=is_condemnation,
        is_the_bank_condemned=is_the_bank_condemned,
        is_valid=is_valid
    )


def delete_amounts_from_judgement(judgement):
    JudgementAmount.objects.all().filter(judgement=judgement).delete()


def get_valid_amounts_from_judgement(judgement):
    return list(JudgementAmount.objects.all().filter(
        judgement=judgement,
        is_valid=True
    ))


def get_invalid_amounts_from_judgement(judgement):
    return list(JudgementAmount.objects.all().filter(
        judgement=judgement,
        is_valid=False
    ))


def get_class_amounts_from_judgement(judgement, is_condemnation, is_the_bank_condemned):
    return list(JudgementAmount.objects.all().filter(
        judgement=judgement,
        is_valid=True,
        is_condemnation=is_condemnation,
        is_the_bank_condemned=is_the_bank_condemned
    ))


def get_demand_amounts_from_judgement(judgement):
    return get_class_amounts_from_judgement(judgement, False, False)


def get_bank_condemned_amounts_from_judgement(judgement):
    return get_class_amounts_from_judgement(judgement, True, True)


def get_other_condemnation_amounts_from_judgement(judgement):
    return get_class_amounts_from_judgement(judgement, True, False)


def get_total_requested_amount_from_judgement(judgement):
    list_requested_amount = get_demand_amounts_from_judgement(judgement)
    total = 0
    for amount in list_requested_amount:
        total += amount.price
    return total


def get_total_condemnation_amount_from_judgement(judgement):
    list_condemnation_amount = get_bank_condemned_amounts_from_judgement(judgement)
    total = 0
    for amount in list_condemnation_amount:
        total += amount.price
    return total
