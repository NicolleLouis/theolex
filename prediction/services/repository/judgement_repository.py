from prediction.models.judgment import Judgement


def get_last_judgement():
    return Judgement.objects.all().order_by('-id')[0]


def get_last_judgement_id():
    return get_last_judgement().id


def create_judgement(text):
    return Judgement.objects.create(
        text=text
    )


def get_all_judgement():
    return Judgement.objects.all()


def is_argument_linked_to_judgement(argument_label, judgement):
    from prediction.services.repository.argument_repository import get_arguments_from_judgement

    arguments = get_arguments_from_judgement(judgement)
    for argument in arguments:
        if argument.label == argument_label:
            return True
    return False


def get_all_judgement_id_with_topic(topic):
    judgements_with_topic = Judgement.objects.all().filter(topic=topic)
    judgements_id_with_topic = list(
        map(
            lambda judgement: judgement.id,
            judgements_with_topic
        )
    )
    return judgements_id_with_topic


def get_all_judgement_id_with_argument(argument_label):
    judgements = get_all_judgement()
    judgements_with_argument = list(
        filter(
            lambda judgement: is_argument_linked_to_judgement(argument_label, judgement),
            judgements
        )
    )
    id_judgements_with_arguments = list(
        map(
            lambda judgement: judgement.id,
            judgements_with_argument
        )
    )
    return id_judgements_with_arguments


def set_judge_argument_text(judgement, judge_argument_text):
    if judge_argument_text == "":
        add_error_message(judgement, "Judge_argument_text was not found")
        return
    judgement.judge_argument = judge_argument_text
    judgement.save()


def set_conclusion_text(judgement, conclusion_text):
    judgement.conclusion_text = conclusion_text
    judgement.save()


def set_is_favorable(judgement, is_favorable):
    judgement.is_favorable = is_favorable
    judgement.save()


def set_claimant_defendant(judgement, claimant, defendant):
    judgement.claimant = claimant
    judgement.defendant = defendant
    judgement.save()


def add_error_message(judgement, error_message):
    judgement.analysis_successful = False
    if not judgement.error_message:
        judgement.error_message = error_message
    else:
        judgement.error_message = judgement.error_message + "\n" + error_message
    judgement.save()


def reset_judgement_analysis(judgement):
    from prediction.services.repository.argument_repository import delete_arguments_from_judgement
    from prediction.services.repository.judgement_amount_repository import delete_amounts_from_judgement

    delete_arguments_from_judgement(judgement)
    delete_amounts_from_judgement(judgement)

    judgement.jurisdiction = ''
    judgement.is_favorable = True
    judgement.analysis_successful = True
    judgement.error_message = ''
    judgement.topic = ''
    judgement.claimant = ''
    judgement.defendant = ''
    judgement.judge_argument = ''
    judgement.topic_rule = ''
    judgement.total_amount_requested = None
    judgement.total_amount_condemned = None
    judgement.percentage_condemnation = None
    judgement.save()


def restart_judgements_analysis(judgements):
    from prediction.services.import_service.judgement_import_service import analyse_judgement

    for judgement in judgements:
        reset_judgement_analysis(judgement)
        analyse_judgement(judgement)
