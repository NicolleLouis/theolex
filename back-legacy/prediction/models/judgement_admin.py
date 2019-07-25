# -*- coding: utf-8 -*-

import textwrap
from threading import Thread

from django.contrib import admin
from django.utils.html import linebreaks
from django.utils.safestring import mark_safe


from prediction.services.amount.display import print_amounts
from prediction.services.display.float import float_to_percentage, float_to_price
from prediction.services.csv_export import export_as_csv, export_judgement_as_csv_test_algo
from prediction.services.repository.judgement_repository import restart_judgements_analysis
from prediction.services.judgement_utils import normalize_jurisdiction, normalize_jurisdiction_city

from prediction.models.argument import ArgumentInline


##################
# Custom Filters #
##################

class ArgumentFilter(admin.SimpleListFilter):
    title = 'argument'
    parameter_name = 'argument'

    def lookups(self, request, model_admin):
        from prediction.services.repository.argument_repository import get_all_unique_argument_label

        unique_labels = get_all_unique_argument_label()
        unique_labels_as_dict = map(lambda label: (label, label), unique_labels)
        return list(unique_labels_as_dict)

    def queryset(self, request, queryset):
        from prediction.services.repository.judgement_repository import get_all_judgement_id_with_argument

        value = self.value()
        if value:
            judgements_ids = get_all_judgement_id_with_argument(value)
            return queryset.filter(id__in=judgements_ids)
        else:
            return queryset


class JudgementAdmin(admin.ModelAdmin):
    ##########
    # Config #
    ##########

    list_display = (
        'filename_linebreak',
        'custom_id',
        'is_favorable',
        'claimant',
        'defendant',
        'topic',
        'total_amount_requested_printed',
        'total_amount_condemned_printed',
        'percentage_condemnation_printed',
        'arguments',
        'abstracts'
    )
    readonly_fields = (
        'detailed_arguments',
        'detailed_request_amounts',
        'detailed_soge_condemned_amounts',
        'detailed_other_condemnation_amounts',
        'detailed_invalid_amounts',
    )
    search_fields = (
        'filename',
        'jurisdiction',
        'jurisdiction_city'
    )
    list_filter = (
        ArgumentFilter,
        'is_favorable',
        'analysis_successful',
        'topic',
        'defendant'
    )
    actions = [
        "export_as_csv",
        "export_test_algo_as_csv",
        "restart_judgement_analysis"
    ]
    inlines = [
        ArgumentInline,
    ]

    ###################
    # Computed fields #
    ###################


    # Filename

    def filename_linebreak(self, judgement):
        return mark_safe(linebreaks(textwrap.wrap(judgement.filename, 10)))
    filename_linebreak.short_description = "Nom du fichier"

    # Custom id

    @staticmethod
    def custom_id(judgement):
        normalized_jurisdiction = normalize_jurisdiction(judgement.jurisdiction)
        normalized_jurisdiction_city = normalize_jurisdiction_city(judgement.jurisdiction_city)

        return str(normalized_jurisdiction) + ' de: ' + str(normalized_jurisdiction_city)

    # Total
    def total_amount_requested_printed(self, judgement):
        return float_to_price(judgement.total_amount_requested)
    total_amount_requested_printed.short_description = "Demande (€)"

    def total_amount_condemned_printed(self, judgement):
        return float_to_price(judgement.total_amount_condemned)
    total_amount_condemned_printed.short_description = "Condamnation (€)"

    def percentage_condemnation_printed(self, judgement):
        return float_to_percentage(judgement.percentage_condemnation)
    percentage_condemnation_printed.short_description = "Provision (%)"

    # Amounts

    ###

    @staticmethod
    def request_amounts(judgement):
        return mark_safe(linebreaks(JudgementAdmin.detailed_request_amounts(judgement)))

    @staticmethod
    def detailed_request_amounts(judgement):
        from prediction.services.repository.judgement_amount_repository import get_demand_amounts_from_judgement

        amounts = get_demand_amounts_from_judgement(judgement)
        return print_amounts(amounts)

    ###

    @staticmethod
    def soge_condemned_amounts(judgement):
        return mark_safe(linebreaks(JudgementAdmin.detailed_soge_condemned_amounts(judgement)))

    @staticmethod
    def detailed_soge_condemned_amounts(judgement):
        from prediction.services.repository.judgement_amount_repository import get_bank_condemned_amounts_from_judgement

        amounts = get_bank_condemned_amounts_from_judgement(judgement)
        return print_amounts(amounts)

    ###

    @staticmethod
    def other_condemnation_amounts(judgement):
        return mark_safe(linebreaks(JudgementAdmin.detailed_other_condemnation_amounts(judgement)))

    @staticmethod
    def detailed_other_condemnation_amounts(judgement):
        from prediction.services.repository.judgement_amount_repository \
            import get_other_condemnation_amounts_from_judgement

        amounts = get_other_condemnation_amounts_from_judgement(judgement)
        return print_amounts(amounts)

    ###

    @staticmethod
    def detailed_valid_amounts(judgement):
        from prediction.services.repository.judgement_amount_repository import get_valid_amounts_from_judgement

        amounts = get_valid_amounts_from_judgement(judgement)
        return print_amounts(amounts)

    @staticmethod
    def detailed_invalid_amounts(judgement):
        from prediction.services.repository.judgement_amount_repository import get_invalid_amounts_from_judgement

        amounts = get_invalid_amounts_from_judgement(judgement)
        return print_amounts(amounts)

    # Arguments

    def abstracts(self, judgement):
        from prediction.services.repository.argument_repository import get_arguments_from_judgement

        arguments = get_arguments_from_judgement(judgement)
        abstracts = ""
        for index, argument in enumerate(arguments):
            header = "# Argument: " + str(argument.label) + "\n"
            abstracts += header
            abstracts += str(argument.abstract) + "\n\n"
        return mark_safe(linebreaks(abstracts))
    abstracts.short_description = "Résumé du jugement: Abstract des arguments"

    @staticmethod
    def arguments(judgement):
        from prediction.services.repository.argument_repository import get_arguments_from_judgement

        return get_arguments_from_judgement(judgement)

    @staticmethod
    def detailed_arguments(judgement):
        from prediction.services.repository.argument_repository import get_arguments_from_judgement

        arguments = get_arguments_from_judgement(judgement)
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
        additional_fields_label = ['detailed_valid_amounts', 'detailed_arguments']
        return export_as_csv(JudgementAdmin, meta, queryset, additional_fields_label)
    export_as_csv.short_description = "Export Selected"

    def export_test_algo_as_csv(self, request, queryset):
        from prediction.constants.arguments_rule import get_argument_possible_label

        argument_possible_label = get_argument_possible_label()

        meta = self.model._meta
        arguments_label = argument_possible_label
        return export_judgement_as_csv_test_algo(meta, queryset, arguments_label)
    export_test_algo_as_csv.short_description = "Export result test algo"

    def restart_judgement_analysis(self, request, queryset):
        thread = Thread(target=restart_judgements_analysis, args=(queryset,))
        thread.start()
    restart_judgement_analysis.short_description = "Restart analysis"
