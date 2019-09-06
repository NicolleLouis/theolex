from millify import millify


class FormatterService:

    @staticmethod
    def format_monetary_amount(monetary_amount):
        ##############
        # Parameters #
        ##############

        prefixes = ["k", "M", "G"]

        ##############

        if not monetary_amount:
            return None
        return millify(monetary_amount, precision=2, drop_nulls=False, prefixes=prefixes)
