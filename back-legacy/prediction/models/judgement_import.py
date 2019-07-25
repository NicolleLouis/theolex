from threading import Thread

from django.db import models
from django.contrib import admin

from prediction.services.messages_service import add_link_in_messages
from prediction.services.file_service import is_zip, get_filename_from_data, extract_judgement_zip\
    , is_zip_import_currently_used
from prediction.services.repository.judgement_repository import get_last_judgement_id
from prediction.services.import_service.utils import get_path


class JudgementImport(models.Model):
    def get_path(instance, filename):
        return get_path(filename)

    data = models.FileField(upload_to=get_path)

    def save(self, *args, **kwargs):
        from prediction.services.import_service.judgement_import_service import load_judgement_from_file

        super(JudgementImport, self).save(*args, **kwargs)
        filename = get_filename_from_data(self.data)
        if is_zip(filename):
            if is_zip_import_currently_used():
                raise Exception("Zip currently used, shutting down the previous import, please restart")
            thread = Thread(target=extract_judgement_zip, args=(self.data,))
            thread.start()
        else:
            load_judgement_from_file(self.data)

    class Meta:
        verbose_name = 'Judgement Import'


class JudgementImportAdmin(admin.ModelAdmin):
        list_display = (
            'id',
            'data'
        )

        def save_model(self, request, obj, form, change):
            link = "/admin/prediction/judgement/"
            message = "Judgements table"
            add_link_in_messages(request, link, message)
            # try because the case get_last_judgement_id without judgement in db generate an error.
            try:
                # +1 because the lastjudgement is computed before creation of the analysed one
                last_judgement_id = get_last_judgement_id() + 1
                link_last_judgement = '/admin/prediction/judgement/' + str(last_judgement_id) + '/change/'
                message_last_judgement = "Details on the Judgement"
                add_link_in_messages(request, link_last_judgement, message_last_judgement)
            except:
                pass
            super(JudgementImportAdmin, self).save_model(request, obj, form, change)
