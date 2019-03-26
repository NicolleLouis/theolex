# -*- coding: utf-8 -*-

import re
import dateparser

from django.utils.timezone import make_aware

from prediction.services.repository.mail_repository import create_mail, add_error_message, set_date_mail
from prediction.services.argument_classification.utils import find_arguments_from_mail, create_mail_arguments_from_list\
    , find_topic_from_mail
from prediction.services.file_service import extract_text_from_file, get_filename_from_data


mail_object_regex = r'^OBJET( )?:(.*)'


def load_mail_from_file(data):
    filename = get_filename_from_data(data)
    mail_text = extract_text_from_file(data)
    load_mail(mail_text, filename)


def load_mail(text, filename):
    mail = create_mail(text, filename)
    analyse_mail(mail)


def analyse_mail(mail):
    compute_last_mail(mail)
    compute_subject(mail)
    compute_arguments(mail)
    compute_topic(mail)
    compute_date_mail(mail)


def compute_last_mail(mail):
    text_by_lines = mail.text.splitlines()
    last_mail = get_last_mail(text_by_lines)
    if last_mail == "":
        add_error_message(mail, 'Last mail was not detected')
    mail.last_mail = last_mail
    mail.save()


def compute_date_mail(mail):
    text_by_lines = mail.text.splitlines()
    for line in text_by_lines:
        match = re.match(r'^Envoyé:', line)
        if match is not None:
            cleaned_line = re.sub(r'^Envoyé:', '', line)
            date_mail = dateparser.parse(cleaned_line, languages=['fr'])
            set_date_mail(mail, make_aware(date_mail))
    set_date_mail(mail, None)


def compute_subject(mail):
    text_by_lines = mail.text.splitlines()
    subject = get_subject(text_by_lines)
    if subject == "":
        add_error_message(mail, 'No subject found')
    mail.mail_subject = subject
    mail.save()


def compute_arguments(mail):
    list_arguments = find_arguments_from_mail(mail)
    create_mail_arguments_from_list(list_arguments, mail)


def get_subject(text_by_lines):
    for index, line in enumerate(text_by_lines):
        match = re.match(mail_object_regex, line, re.IGNORECASE)
        if match is not None:
            return match.groups()[0]
    return ''


def compute_topic(mail):
    topic = find_topic_from_mail(mail)
    try:
        mail.topic = topic["label"]
        mail.topic_rule = str(topic["input"])
        mail.save()
    # Error case being no topic found
    except:
        pass


def get_last_mail(text_by_lines):
    index_first_object = get_index_first_object(text_by_lines)
    index_second_recipient = get_index_second_recipient(text_by_lines)
    if index_was_found_in_correct_order(index_first_object, index_second_recipient):
        return get_text_between_index(text_by_lines, index_first_object, index_second_recipient)
    return ''


def get_index_first_object(text_by_lines):
    for index, line in enumerate(text_by_lines):
        match = re.match(mail_object_regex, line, re.IGNORECASE)
        if match is not None:
            return index
    return 0


def get_index_second_recipient(text_by_lines):
    first_recipient_found = False
    for index, line in enumerate(text_by_lines):
        match = re.match(r'^De(.*)', line)
        if match is not None:
            if first_recipient_found:
                return index
            else:
                first_recipient_found = True
    return 0


def index_was_found_in_correct_order(first_index, second_index):
    return first_index + 1 < second_index


def get_text_between_index(text_by_lines, first_index, second_index):
    last_mail = text_by_lines[first_index + 1:second_index]
    trimmed_last_mail = trim_text_by_line(last_mail)
    return "\n".join(trimmed_last_mail)


def trim_text_by_line(text_by_lines):
    index_first_non_null_line = get_index_first_non_null_line(text_by_lines)
    index_last_non_null_line = get_index_last_non_null_line(text_by_lines)
    return text_by_lines[index_first_non_null_line:index_last_non_null_line + 1]


def get_index_first_non_null_line(text_by_lines):
    try:
        index = 0
        while text_by_lines[index] == "":
            index += 1
        return index
    except:
        return 0


def get_index_last_non_null_line(text_by_lines):
    try:
        index = len(text_by_lines) - 1
        while text_by_lines[index] == "":
            index -= 1
        return index
    except:
        return len(text_by_lines) - 1
