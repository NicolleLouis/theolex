from prediction.models import Argument


def fetch_arguments():
    return Argument.objects.all()


def get_all_arguments_with_topic(topic):
    from prediction.services.repository.judgement_repository import get_all_judgement_id_with_topic

    judgements_id_with_topic = get_all_judgement_id_with_topic(topic)
    return Argument.objects.all().filter(judgement__id__in=judgements_id_with_topic)


def create_argument(label, judgement, input_text, abstract):
    return Argument.objects.create(
        label=label,
        judgement=judgement,
        input_text=input_text,
        abstract=abstract
    )


def get_arguments_from_judgement(judgement):
    arguments = list(Argument.objects.all().filter(judgement=judgement))
    order_arguments(arguments)
    return arguments


def delete_arguments_from_judgement(judgement):
    Argument.objects.all().filter(judgement=judgement).delete()


def get_all_unique_argument_label():
    arguments = Argument.objects.all()
    arguments_label = list(map(lambda argument: argument.label, arguments))
    unique_arguments_label = list(set(arguments_label))
    return unique_arguments_label


#########
# Utils #
#########

# Modify SORT_ORDER to change order of arguments displayed for a judgement
def order_arguments(arguments):

    ##############
    # Parameters #
    ##############

    SORT_ORDER = \
    {
        "Emprunteur Averti": 0,
        "Endettement Excessif": 1,
    }
    arguments.sort(key=lambda argument: get_order(argument.label, SORT_ORDER))


def get_order(value, SORT_ORDER):
    if value in SORT_ORDER.keys():
        return SORT_ORDER[value]
    else:
        return len(SORT_ORDER) + 1
