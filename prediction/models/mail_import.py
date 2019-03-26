from threading import Thread

from django.db import models
from django.contrib import admin

from prediction.services.messages_service import add_link_in_messages
from prediction.services.repository.mail_repository import get_last_mail_id
from prediction.services.import_service.utils import get_path
from prediction.services.file_service import is_zip, get_filename_from_data, extract_mail_zip\
    , is_zip_import_currently_used


class MailImport(models.Model):
    def get_path(instance, filename):
        return get_path(filename)

    data = models.FileField(upload_to=get_path)

    def save(self, *args, **kwargs):
        from prediction.services.import_service.mail_import_service import load_mail_from_file

        super(MailImport, self).save(*args, **kwargs)
        filename = get_filename_from_data(self.data)
        if is_zip(filename):
            if is_zip_import_currently_used():
                raise Exception("Zip currently used, shutting down the previous import, please restart")
            thread = Thread(target=extract_mail_zip, args=(self.data,))
            thread.start()
        else:
            load_mail_from_file(self.data)

    class Meta:
        verbose_name = 'Mail Import'


class MailImportAdmin(admin.ModelAdmin):
        list_display = (
            'id',
            'data'
        )

        def save_model(self, request, obj, form, change):
            link = "/admin/prediction/mail/"
            message = "Mails table"
            add_link_in_messages(request, link, message)
            # try because the case get_last_mail_id without mail in db generate an error.
            try:
                # +1 because the lastmail is computed before creation of the analysed one
                last_mail_id = get_last_mail_id() + 1
                link_last_mail = '/admin/prediction/mail/' + str(last_mail_id) + '/change/'
                message_last_mail = "Details on the Mail"
                add_link_in_messages(request, link_last_mail, message_last_mail)
            except:
                pass
            super(MailImportAdmin, self).save_model(request, obj, form, change)
