# -*- coding: utf-8 -*-

from threading import Thread

from django.db import models
from django.contrib import admin

from prediction.services.csv_export import export_as_csv


class Mail(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=200, null=True, blank=True)
    text = models.TextField(blank=True, null=True)
    mail_subject = models.TextField(blank=True, null=True)
    last_mail = models.TextField(blank=True, null=True)
    analysis_successful = models.BooleanField(default=True)
    error_message = models.TextField(null=True, blank=True)
    topic = models.CharField(max_length=200, null=True, blank=True)
    topic_rule = models.TextField(blank=True, null=True)
    date_import = models.DateTimeField(blank=True, null=True)
    date_mail = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return "mail number: " + str(self.id) + " with subject: \"" + str(self.mail_subject) + "\""


##################
# Custom Filters #
##################

class MailArgumentFilter(admin.SimpleListFilter):
    title = 'mail_argument'
    parameter_name = 'mail_argument'

    def lookups(self, request, model_admin):
        from prediction.services.repository.mail_argument_repository import get_all_unique_argument_label

        unique_labels = get_all_unique_argument_label()
        unique_labels_as_dict = map(lambda label: (label, label), unique_labels)
        return list(unique_labels_as_dict)

    def queryset(self, request, queryset):
        from prediction.services.repository.mail_repository import get_all_mail_id_with_argument

        value = self.value()
        if value:
            mails_ids = get_all_mail_id_with_argument(value)
            return queryset.filter(id__in=mails_ids)
        else:
            return queryset


class MailAdmin(admin.ModelAdmin):

    ##########
    # Config #
    ##########

    list_display = (
        'filename',
        'date_mail',
        'mail_subject',
        'topic',
        'arguments',
    )
    readonly_fields = (
        'detailed_arguments',
    )
    list_filter = (
        MailArgumentFilter,
        'topic'
    )
    actions = ["export_as_csv"]

    ###################
    # Computed fields #
    ###################

    @staticmethod
    def arguments(mail):
        from prediction.services.repository.mail_argument_repository import get_arguments_from_mail

        return get_arguments_from_mail(mail)

    @staticmethod
    def detailed_arguments(mail):
        from prediction.services.repository.mail_argument_repository import get_arguments_from_mail

        arguments = get_arguments_from_mail(mail)
        detailed_arguments = ""
        for index, argument in enumerate(arguments):
            header = "# Argument: " + str(index) + "\n"
            detailed_arguments += header
            detailed_arguments += str(argument.to_str()) + "\n\n"
        return detailed_arguments

    #################
    # Admin actions #
    #################

    # To add a computed field to excel, simply add the name of the function to the field: additional_fields_label
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        additional_fields_label = ['detailed_arguments']
        return export_as_csv(MailAdmin, meta, queryset, additional_fields_label)

    export_as_csv.short_description = "Export Selected"

    def restart_mail_analysis(self, request, queryset):
        from prediction.services.repository.mail_repository import restart_mails_analysis

        thread = Thread(target=restart_mails_analysis, args=(queryset,))
        thread.start()
    restart_mail_analysis.short_description = "Restart analysis"
