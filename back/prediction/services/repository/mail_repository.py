import datetime
import pytz

from prediction.models.mail import Mail


def get_all_mail():
    return Mail.objects.all()


def get_last_mail():
    return Mail.objects.all().order_by('-id')[0]


def get_last_mail_id():
    return get_last_mail().id


def get_all_mail_date():
    mails = get_all_mail()
    mail_dates = list(map(lambda mail: mail.date_mail, mails))
    mail_dates_without_none = list(filter(lambda date: date is not None, mail_dates))
    return mail_dates_without_none


def create_mail(text, filename):
    return Mail.objects.create(
        text=text,
        filename=filename,
        date=datetime.datetime.now(pytz.utc)
    )


def set_date_mail(mail, date):
    if date is None:
        add_error_message(mail, 'Could not compute date mail')
    else:
        mail.date_mail = date
        mail.save()


def is_argument_linked_to_mail(argument_label, mail):
    from prediction.services.repository.mail_argument_repository import get_arguments_from_mail

    arguments = get_arguments_from_mail(mail)
    for argument in arguments:
        if argument.label == argument_label:
            return True
    return False


def get_all_mail_id_with_argument(argument_label):
    mails = get_all_mail()
    mails_with_argument = list(
        filter(
            lambda mail: is_argument_linked_to_mail(argument_label, mail),
            mails
        )
    )
    id_mails_with_arguments = list(
        map(
            lambda mail: mail.id,
            mails_with_argument
        )
    )
    return id_mails_with_arguments


def add_error_message(mail, error_message):
    mail.analysis_successful = False
    if not mail.error_message:
        mail.error_message = error_message
    else:
        mail.error_message = mail.error_message + "\n" + error_message
    mail.save()


def reset_mail_analysis(mail):
    from prediction.services.repository.mail_argument_repository import delete_arguments_from_mail

    delete_arguments_from_mail(mail)

    mail.analysis_successful = True
    mail.error_message = ''
    mail.topic = ''
    mail.last_mail = ''
    mail.mail_subject = ''
    mail.save()


def restart_mails_analysis(mails):
    from prediction.services.import_service.mail_import_service import analyse_mail

    for mail in mails:
        reset_mail_analysis(mail)
        analyse_mail(mail)
