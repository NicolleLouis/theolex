from datetime import datetime

from prediction.services.repository.mail_repository import get_all_mail_date


def datetime_to_month_year_string(date):
    return date.strftime("%B_%Y")


def datetime_from_month_year_string(date_string):
    return datetime.strptime(date_string, "%B_%Y")


def aggregate_mail_dates():
    dates = get_all_mail_date()
    dates_formatted = list(map(lambda date: datetime_to_month_year_string(date), dates))
    aggregated_mail_dates_data = {}
    for date_formatted in dates_formatted:
        if date_formatted in aggregated_mail_dates_data:
            aggregated_mail_dates_data[date_formatted] += 1
        else:
            aggregated_mail_dates_data[date_formatted] = 0
    return aggregated_mail_dates_data


def get_ordered_list_key_from_mail_aggregated_date(data):
    dates_string = list(data.keys())
    dates_datetime = list(map(lambda date_string: datetime_from_month_year_string(date_string), dates_string))
    dates_datetime.sort()
    ordered_dates_string = list(map(lambda date_datetime: datetime_to_month_year_string(date_datetime), dates_datetime))
    return ordered_dates_string


def get_labels_and_values_graph_mail():
    data = aggregate_mail_dates()
    labels = get_ordered_list_key_from_mail_aggregated_date(data)
    values = list(map(lambda label: data[label], labels))
    return labels, values
