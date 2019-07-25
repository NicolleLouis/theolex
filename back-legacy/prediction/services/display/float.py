# -*- coding: utf-8 -*-


def float_to_price(price):
    price = price if price else 0
    return "%.2f" % round(price, 2) + "€"


def float_to_percentage(percentage):
    percentage = percentage if percentage else 0
    return "%.2f" % round(100 * percentage, 2) + "%"
