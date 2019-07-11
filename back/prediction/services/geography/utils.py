from prediction.services.geography.geotext import GeoText


def get_city_mentions(sentence):
    places = GeoText(sentence)
    return list(map(lambda city: city.lower().capitalize(), places.cities))
