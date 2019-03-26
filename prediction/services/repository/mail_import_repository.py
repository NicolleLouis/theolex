from prediction.models.mail_import import MailImport


def create_mail_import(data):
    return MailImport.objects.create(
        data=data
    )
