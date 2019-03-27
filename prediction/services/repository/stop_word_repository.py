from prediction.models.stop_words import StopWord


def get_all_stop_words():
    return StopWord.objects.all()
