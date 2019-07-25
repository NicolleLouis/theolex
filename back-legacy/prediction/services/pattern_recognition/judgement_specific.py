from prediction.services.judgement_utils import get_judge_argument_or_text
from prediction.services.pattern_recognition.utils import split_text

# Split with following characers: !, ?, \n, and '.' only if it was not preceded by M (M. )
# or followed by a non empty character (To avoid to split in this case: 108.01)
judgement_split_regex = r'([!\?\n]|[^M]\. )'


def split_judge_argument_by_sentences(judgement):
    text = get_judge_argument_or_text(judgement)
    return split_text(text, judgement_split_regex)


def split_judgement_by_sentences(judgement):
    return split_text(judgement.text, judgement_split_regex)