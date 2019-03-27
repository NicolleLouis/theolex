from prediction.models.text_analysed import TextAnalysed


def get_last_text_analysed():
    return TextAnalysed.objects.all().order_by('-id')[0]


def get_last_text_analysed_id():
    return get_last_text_analysed().id


def create_text_analysed(text):
    return TextAnalysed.objects.create(
        text=text
    )


def get_all_text_analysed():
    return TextAnalysed.objects.all()


def is_argument_linked_to_text_analysed(argument_label, text_analysed):
    from prediction.services.repository.argument_repository import get_arguments_from_text_analysed

    arguments = get_arguments_from_text_analysed(text_analysed)
    for argument in arguments:
        if argument.label == argument_label:
            return True
    return False


def get_all_text_analysed_id_with_argument(argument_label):
    text_analyseds = get_all_text_analysed()
    text_analyseds_with_argument = list(
        filter(
            lambda text_analysed: is_argument_linked_to_text_analysed(argument_label, text_analysed),
            text_analyseds
        )
    )
    id_text_analyseds_with_arguments = list(
        map(
            lambda text_analysed: text_analysed.id,
            text_analyseds_with_argument
        )
    )
    return id_text_analyseds_with_arguments


def add_error_message(text_analysed, error_message):
    text_analysed.analysis_successful = False
    if not text_analysed.error_message:
        text_analysed.error_message = error_message
    else:
        text_analysed.error_message = text_analysed.error_message + "\n" + error_message
    text_analysed.save()


def reset_text_analysed_analysis(text_analysed):
    from prediction.services.repository.argument_repository import delete_arguments_from_text_analysed
    from prediction.services.repository.text_analysed_amount_repository import delete_amounts_from_text_analysed

    delete_arguments_from_text_analysed(text_analysed)
    delete_amounts_from_text_analysed(text_analysed)

    text_analysed.analysis_successful = True
    text_analysed.error_message = ''
    text_analysed.save()


def restart_text_analyseds_analysis(text_analyseds):
    from prediction.services.import_service.text_analysed_import_service import analyse_text_analysed

    for text_analysed in text_analyseds:
        reset_text_analysed_analysis(text_analysed)
        analyse_text_analysed(text_analysed)
