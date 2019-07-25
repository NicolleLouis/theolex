import os
import unidecode


def get_path(filename):
    _filename, file_extension = os.path.splitext(filename)
    clean_filename = unidecode.unidecode(_filename)
    return clean_filename + file_extension
