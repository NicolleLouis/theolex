from django.http import HttpResponse

import csv

from prediction.services.repository.judgement_repository import is_argument_linked_to_judgement


##############
# Parameters #
##############

boolean_true = "True"
boolean_false = "False"
csv_separator = ';'


#############
# Functions #
#############


def export_as_csv(obj_class, meta, queryset, additional_fields_label):
    field_names = [field.name for field in meta.fields]
    additional_fields_function = [
        getattr(obj_class, additional_field_label) for additional_field_label in additional_fields_label
    ]

    response, writer = get_response_and_writer(meta)

    writer.writerow(field_names + additional_fields_label)
    for obj in queryset:
        row = [getattr(obj, field) for field in field_names]
        for additional_field_function in additional_fields_function:
            row.append(additional_field_function(obj))
        writer.writerow(row)

    return response


def export_judgement_as_csv_test_algo(meta, queryset, arguments_label):
    response, writer = get_response_and_writer(meta)

    header_labels = ['filename'] + arguments_label
    writer.writerow(header_labels)

    for obj in queryset:
        row = [getattr(obj, 'filename')]
        for argument_label in arguments_label:
            row.append(
                is_argument_linked_to_judgement(
                    argument_label,
                    obj
                )
            )
        writer.writerow(row)

    return response


def convert_boolean_to_string(boolean):
    return boolean_true if boolean else boolean_false


def get_response_and_writer(meta):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
    writer = csv.writer(response, delimiter=csv_separator)

    return response, writer
