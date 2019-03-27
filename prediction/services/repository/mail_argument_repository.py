from prediction.models import MailArgument


def fetch_arguments():
    return MailArgument.objects.all()


def create_argument(label, mail, input_text, abstract):
    return MailArgument.objects.create(
        label=label,
        mail=mail,
        input_text=input_text,
        abstract=abstract
    )


def get_arguments_from_mail(mail):
    return list(MailArgument.objects.all().filter(mail=mail))


def delete_arguments_from_mail(mail):
    MailArgument.objects.all().filter(mail=mail).delete()


def get_all_unique_argument_label():
    arguments = MailArgument.objects.all()
    arguments_label = list(map(lambda argument: argument.label, arguments))
    unique_arguments_label = list(set(arguments_label))
    return unique_arguments_label
