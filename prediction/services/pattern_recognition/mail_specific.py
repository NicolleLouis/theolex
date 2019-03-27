from prediction.services.pattern_recognition.utils import split_text

# Split with following characers: !, ?, '.'
mail_split_regex = r'([!\?\.])'


def split_mail_by_sentences(mail):
    return split_text(mail.last_mail, mail_split_regex)