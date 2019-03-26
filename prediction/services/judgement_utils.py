def get_judge_argument_or_text(judgement):
    if judgement.judge_argument and judgement.judge_argument != "":
        return judgement.judge_argument
    else:
        return judgement.text


def normalize_jurisdiction(jurisdiction):
    if jurisdiction == '' or not jurisdiction:
        normalized_jurisdiction = 'Tribunal inconnu'
    else:
        normalized_jurisdiction = jurisdiction
    return normalized_jurisdiction


def normalize_jurisdiction_city(jurisdiction_city):
    if jurisdiction_city == '' or not jurisdiction_city:
        normalized_jurisdiction_city = 'Ville inconnue'
    else:
        normalized_jurisdiction_city = jurisdiction_city
    return normalized_jurisdiction_city
