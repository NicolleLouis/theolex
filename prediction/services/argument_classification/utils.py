from prediction.constants.arguments_rule import get_argument_rules, get_argument_possible_label
from prediction.constants.topics_rule import get_topic_rules, get_topic_possible_label
from prediction.constants.abstract_pattern import abstract_rules
from prediction.services.pattern_recognition.engine import get_pattern_by_label

from prediction.services.pattern_recognition.judgement_specific import split_judge_argument_by_sentences
from prediction.services.pattern_recognition.mail_specific import split_mail_by_sentences
from prediction.services.pattern_recognition.core import find_all_patterns_in_text, get_sentences_with_pattern,\
    find_all_patterns_in_sentences, deduplicate_patterns
from prediction.services.pattern_recognition.utils import get_atoms_label_within_pattern, create_molecular_pattern


#############
# Constants #
#############


def get_topic_constants():
    topics_rules = get_topic_rules()
    topics_possible_label = get_topic_possible_label()

    return topics_rules, topics_possible_label


def get_argument_constants():
    argument_rules = get_argument_rules()
    argument_possible_label = get_argument_possible_label()

    return argument_rules, argument_possible_label


#############
# Functions #
#############

def find_arguments_from_judgement(judgement):
    argument_rules, argument_possible_label = get_argument_constants()

    sentences = split_judge_argument_by_sentences(judgement)
    arguments = find_all_patterns_in_sentences(sentences, argument_possible_label, argument_rules)
    return deduplicate_patterns(arguments)


def find_topic_from_judgement(judgement):
    topics_rules, topics_possible_label = get_topic_constants()

    sentences = split_judge_argument_by_sentences(judgement)
    topic_patterns = find_all_patterns_in_sentences(sentences, topics_possible_label, topics_rules)
    if len(topic_patterns) == 0:
        return ''
    else:
        return topic_patterns[0]


def find_topic_from_mail(mail):
    topics_rules, topics_possible_label = get_topic_constants()

    text = mail.text
    topic_patterns = find_all_patterns_in_text(text, topics_possible_label, topics_rules)
    if len(topic_patterns) == 0:
        return ''
    else:
        return topic_patterns[0]


def find_arguments_from_mail(mail):
    argument_rules, argument_possible_label = get_argument_constants()
    text = mail.last_mail if mail.last_mail != "" else mail.text
    return find_all_patterns_in_text(text, argument_possible_label, argument_rules)


def create_judgement_arguments_from_list(list_argument, judgement):
    from prediction.services.repository import argument_repository

    argument_rules, argument_possible_label = get_argument_constants()

    for argument in list_argument:
        pattern = get_pattern_by_label(argument["label"], argument_rules)
        sentences = split_judge_argument_by_sentences(judgement)
        abstract = get_abstract(pattern, sentences, argument_rules)
        argument_repository.create_argument(argument['label'], judgement, str(argument['input']), abstract)


def create_mail_arguments_from_list(list_argument, mail):
    from prediction.services.repository import mail_argument_repository

    argument_rules, argument_possible_label = get_argument_constants()

    for argument in list_argument:
        pattern = get_pattern_by_label(argument["label"], argument_rules)
        sentences = split_mail_by_sentences(mail)
        abstract = get_abstract(pattern, sentences, argument_rules)
        mail_argument_repository.create_argument(argument['label'], mail, str(argument['input']), abstract)


def get_abstract_for_pattern(pattern, sentences, patterns):
    abstract_sentences = get_sentences_with_pattern(pattern, sentences, patterns)
    abstract = ""
    for sentence in abstract_sentences:
        abstract = abstract + sentence + '\n'
    return abstract if abstract != "" else "Abstract pas trouvé dans le texte"


def create_abstract_pattern(pattern):
    if pattern["atomic"]:
        return pattern
    else:
        flat_atoms_list = get_atoms_label_within_pattern(pattern)
        atoms_pattern_with_abstract = list(
            map(
                lambda atom: [atom, "Abstract"],
                flat_atoms_list
            )
        )
        atoms_pattern_with_abstract.append([pattern["label"]])
        abstract_pattern = create_molecular_pattern("abstract_pattern", atoms_pattern_with_abstract)
        return abstract_pattern


def get_abstract(pattern, sentences, patterns):
    patterns_with_abstract = patterns + abstract_rules
    abstract_pattern = create_abstract_pattern(pattern)
    return get_abstract_for_pattern(abstract_pattern, sentences, patterns_with_abstract)
