# -*- coding: utf-8 -*-

import urllib
import chardet
import os
import docx2txt
import zipfile
import shutil


from django.conf import settings


def extract_text_from_file(data):
    filename = get_filename_from_data(data)
    _filename_without_extension, file_extension = get_filename_and_extension(filename)
    file_in_bytes = data.read()
    encoding = chardet.detect(file_in_bytes)['encoding']
    file_to_extract = os.path.join(settings.MEDIA_ROOT, filename)

    if file_extension == ".txt":
        if encoding == "utf-8":
            return file_in_bytes.decode("utf-8")
        else:
            return file_in_bytes.decode("windows-1252")

    elif file_extension == ".docx":
        return docx2txt.process(file_to_extract)

    else:
        raise ValueError("This file extension \"" + file_extension + "\" is not recognized")


def get_filename_and_extension(filename):
    return os.path.splitext(filename)


def get_filename_from_data(data):
    return urllib.parse.unquote(data.url)


def is_zip(filename):
    _filename_without_extension, extension = get_filename_and_extension(filename)
    return extension == ".zip"


def is_zip_import_currently_used():
    zip_directory = settings.MEDIA_ROOT + "zip/"
    if os.path.exists(zip_directory) and os.path.isdir(zip_directory):
        if os.listdir(zip_directory):
            shutil.rmtree(zip_directory)
            return True
    return False


def extract_judgement_zip(data):
    from prediction.services.repository.judgement_import_repository import create_judgement_import

    extract_zip(data, create_judgement_import)


def extract_zip(data, import_function):
    zip_directory = settings.MEDIA_ROOT + "zip/"

    with zipfile.ZipFile(data, 'r') as zip_ref:
        zip_ref.extractall(settings.MEDIA_ROOT + "zip/")

    for filename in os.listdir(zip_directory):
        filename_with_directory = "zip/" + filename
        import_function(filename_with_directory)
        os.remove(zip_directory + filename)
