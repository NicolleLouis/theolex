from decimal import Decimal


class FormatterService:

    @staticmethod
    def format_monetary_amount(monetary_amount):
        if not monetary_amount:
            return None
        # ToDo: human readable?
        return Decimal(monetary_amount).normalize().to_eng_string()
