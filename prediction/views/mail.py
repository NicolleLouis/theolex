# -*- coding: utf-8 -*-

from django.shortcuts import render

from prediction.services.display.mail_recurrence_graph import get_labels_and_values_graph_mail


def mail_recurrence(request):
    labels, values = get_labels_and_values_graph_mail()
    data = {
        'labels': labels,
        'values': values
    }
    return render(request, 'mail_recurrence.html', {
        'mail_recurrence': data,
        'title': "Récurrence des mails",
    })
