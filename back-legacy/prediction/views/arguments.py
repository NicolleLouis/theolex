from django.shortcuts import render
import json

from prediction.services.repository import argument_repository
from prediction.services.import_service.judgement_import_service import get_analyse, \
    convert_analysis_to_string, are_conclusions_favorable
from prediction.models import Judgement

#############
# Functions #
#############


def display_arguments_banker_obligation_to_warn(request):
    arguments = get_arguments("Obligation de mise en garde du banquier")

    return render(request, 'arguments.html', {
        'arguments': arguments,
        'title': "Obligation de mise en garde du banquier",
    })


def display_arguments_invalidity_of_the_bond(request):
    arguments = get_arguments("Nullité de cautionnement octroyé par une personne physique")

    return render(request, 'arguments.html', {
        'arguments': arguments,
        'title': "Nullité de cautionnement octroyé par une personne physique",
    })


def is_favorable_results(request):
    # To do: mettre cette fonction dans repository
    judgement = Judgement.objects.order_by('-id')[0]
    analysis = get_analyse(judgement.text)
    arguments = convert_analysis_to_string(analysis)

    # To do: are_conclusions_favorable return un boolean et pas un int
    result = are_conclusions_favorable(analysis) > 0

    return render(request, 'isFavorableResults.html', {
        'text': judgement.text,
        'arguments': arguments,
        'result': 'true' if result else 'false'
    })


def get_arguments(topic):
    return json.dumps([argument.to_json() for argument in argument_repository.get_all_arguments_with_topic(topic)])
