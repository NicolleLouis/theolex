import datetime
import pytz
import re
import logging

from prediction.models.judgment import Judgement
from prediction.services import utils
from prediction.services.argument_classification.utils import find_arguments_from_judgement, \
    create_judgement_arguments_from_list, find_topic_from_judgement
from prediction.services.amount.utils import find_amounts_from_judgement, \
    create_judgement_invalid_amounts_from_list, create_judgement_valid_amounts_from_list, classify_valid_amounts
from prediction.services.file_service import extract_text_from_file, get_filename_from_data
from prediction.services.repository.judgement_repository import set_judge_argument_text, set_is_favorable, \
    set_claimant_defendant, set_conclusion_text, add_error_message
from prediction.constants.jurisdiction_pattern import jurisdiction_rules, jurisdiction_possible_label
from prediction.services.pattern_recognition.judgement_specific import split_judgement_by_sentences
from prediction.services.pattern_recognition.core import find_all_patterns_in_sentences
from prediction.services.geography.utils import get_city_mentions

logger = logging.getLogger('import')


def load_judgement_from_file(data):
    try:
        filename = get_filename_from_data(data)
        text = extract_text_from_file(data)
        load_judgement(text, filename)
    except Exception as e:
        logger.error(e)
        pass


def load_judgement(text, filename):
    judgement = Judgement.objects.create(
        text=text,
        date=datetime.datetime.now(pytz.utc),
        filename=filename
    )
    analyse_judgement(judgement)


def analyse_judgement(judgement):
    compute_judgement_arguments(judgement)


def compute_jurisdiction_and_city(judgement):
    sentences = split_judgement_by_sentences(judgement)
    list_jurisdiction = find_all_patterns_in_sentences(sentences, jurisdiction_possible_label, jurisdiction_rules)
    if len(list_jurisdiction) == 0:
        add_error_message(judgement, "Jurisdiction was not found")
    else:
        judgement.jurisdiction = list_jurisdiction[0]['label']

        compute_jurisdiction_city(judgement, list_jurisdiction[0]['sentence'])

        judgement.save()


def compute_jurisdiction_city(judgement, sentence):
    cities = get_city_mentions(sentence)
    if len(cities) == 0:
        add_error_message(
            judgement,
            "Could not find the jurisdiction city"
        )
    elif len(cities) > 1:
        add_error_message(
            judgement,
            "More than one city around jurisdiction"
        )
        judgement.jurisdiction_city = cities[0]
    else:
        judgement.jurisdiction_city = cities[0]
    judgement.save()


def compute_judgement_arguments(judgement):
    list_argument = find_arguments_from_judgement(judgement)
    create_judgement_arguments_from_list(list_argument, judgement)


def compute_amount(judgement):
    list_valid_amount, list_refused_amount = find_amounts_from_judgement(judgement)
    classified_valid_amounts = classify_valid_amounts(list_valid_amount)
    create_judgement_valid_amounts_from_list(classified_valid_amounts, judgement)
    create_judgement_invalid_amounts_from_list(list_refused_amount, judgement)


def compute_provision(judgement):
    from prediction.services.repository.judgement_amount_repository import get_total_condemnation_amount_from_judgement \
        , get_total_requested_amount_from_judgement

    total_amount_requested = get_total_requested_amount_from_judgement(judgement)
    total_amount_condemned = get_total_condemnation_amount_from_judgement(judgement)
    judgement.percentage_condemnation = compute_ratio(total_amount_condemned, total_amount_requested)
    judgement.total_amount_requested = total_amount_requested
    judgement.total_amount_condemned = total_amount_condemned
    judgement.save()


def compute_ratio(numerator, denominator):
    if denominator == 0:
        return 0
    else:
        return numerator/denominator


def compute_topic(judgement):
    topic = find_topic_from_judgement(judgement)
    try:
        judgement.topic = topic["label"]
        judgement.topic_rule = str(topic["input"])
        judgement.save()
    # Error case being no topic found
    except:
        pass


def compute_text_split(judgement):
    conclusion_text, judge_argument_text = utils.split_judgement(judgement.text)
    set_conclusion_text(judgement, conclusion_text)
    set_judge_argument_text(judgement, judge_argument_text)


def compute_judgement_is_favorable(judgement):
    if judgement.conclusion_text != "":
        is_favorable = are_conclusions_favorable(get_conclusion(judgement.conclusion_text))
        set_is_favorable(judgement, is_favorable)
    else:
        add_error_message(judgement, "Couldn't compute is_favorable because conclusion_text is empty")


def compute_claimant_defendant(judgement):
    claimant, defendant = find_claimant_defendant(
        re.sub('[ \n]+', ' ', judgement.text),
    )
    set_claimant_defendant(judgement, claimant, defendant)


def get_banks_regex():
    return {
        'Société Générale': r'(SOCI[ée]T[ée] G[ée]N[ée]RALE)',
        'BNP': r'(BNPP|BNP[ ]?Paribas|Banque Nationale de Paris Paribas|BNP)',
        'Natixis': r'(natixis)',
        'PP': r'(M(.){,30} X)'
    }


def find_claimant_defendant(text):
    banks_regex = get_banks_regex()
    side_regex1 = r'(?:Demande(?:ur|resse)|Appelant)(?! et )((?:.){50,500}?) (?:D[ée]fende(?:ur|resse)|Intim(?:[ée]e|eresse)) ((?:.){,500})'
    side_regex2 = r'entre ((?:.){,500}?) (?:Demande(?:ur|resse)|Appelant) et ((?:.){,500}?) (?:D[ée]fende(?:ur|resse)|Intim(?:[ée]e|eresse))'
    match1 = re.search(side_regex1, text, flags=re.IGNORECASE)
    match2 = re.search(side_regex2, text, flags=re.IGNORECASE)
    match_claimant = match1.group(1) if match1 else (match2.group(1) if match2 else 'non reconnu')
    match_defendant = match1.group(2) if match1 else (match2.group(2) if match2 else 'non reconnu')
    claimant = normalize_side_name(match_claimant, banks_regex)
    defendant = normalize_side_name(match_defendant, banks_regex)
    return claimant, defendant


def normalize_side_name(text, banks_regex):
    for name, regex in banks_regex.items():
        match = re.search(regex, text, re.IGNORECASE)
        if match:
            return name
    return 'PM non reconnue'


def get_analyse(text):
    judgement_start = 'PAR CES MOTIFS'
    try:
        index = text.upper().index(judgement_start)
        conclusion_text = text[index + 15:]
        return get_conclusion(conclusion_text)
    except ValueError:
        logger.error('\'PAR CES MOTIFS\' not found in text')


def convert_analysis_to_string(arguments):
    converted_arguments = []
    for argument in arguments:
        converted_argument = argument
        converted_argument['isSoGé'] = 'true' if argument['isSoGé'] else 'false'
        converted_argument['isFavorable'] = 'true' if argument['isFavorable'] else 'false'
        converted_arguments.append(converted_argument)
    return converted_arguments


def get_conclusion(text):
    text_lines = text.splitlines()
    possible_outputs = [
        {
            'regex': r'(.)*D[ée]BOUTE(.)*',
            'isFavorable': False,
            'decision': 'DEBOUTE'
        },
        {
            'regex': r'CONDAMNE([^.]){,15} SOCI[ée]T[ée] G[ée]N[ée]RALE [àa]',
            'isFavorable': False,
            'decision': 'CONDAMNE'
        },
        {
            'regex': r'CONDAMNE([^.]){15,}SOCI[éeE]T[éeE] G[ée]N[éeE]RALE',
            'isFavorable': True,
            'decision': 'CONDAMNE'
        },
        {
            'regex': r'(.)*MET HORS DE CAUSE(.)*',
            'isFavorable': True,
            'decision': 'HORS DE CAUSE'
        },
        {
            'regex': r'(.)*CONTRE LA SOCI[ée]T[ée] G[ée]N[ée]RALE(.)*',
            'isFavorable': False,
            'decision': 'CONTRE LA SOCIETE GENERALE'
        }
    ]
    conclusions = []
    for output in possible_outputs:
        for line in text_lines:
            match = re.match(output['regex'], line, re.I)
            if match is not None:
                is_soge = re.match(r'(.)*Soci[ée]t[ée]( )*G[ée]n[ée]rale(.)*', match.group(), re.I) is not None
                conclusions.append({
                    'text': match.group(),
                    'decision': output['decision'],
                    'isSoGé': is_soge,
                    'isFavorable': output['isFavorable']
                })
    return conclusions


def are_conclusions_favorable(conclusions):
    sum_conclusions = 0
    for conclusion in conclusions:
        sum_conclusions += 1 if conclusion['isSoGé'] == conclusion['isFavorable'] else -1
    return sum_conclusions > 0

