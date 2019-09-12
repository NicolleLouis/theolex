from api.repository.decision_repository import DecisionRepository


class CleanDecisionService:
    @staticmethod
    def clean_decision_type():
        ##############
        # Parameters #
        ##############

        clean_type = {
            "dpa": "DPA",
            "Guilty Plea agreement": "Guilty Plea Agreement"
        }
        clean_type_keys = clean_type.keys()

        ##############

        decisions = DecisionRepository.fetch_all_decisions()
        number_of_changes = 0
        for decision in decisions:
            if decision.type in clean_type_keys:
                print("Cleaning: " + decision.type)
                number_of_changes += 1
                decision.type = clean_type[decision.type]
                decision.save()
        print("##############")
        print("Finished cleaning")
        print(str(number_of_changes) + " lines changed")
        print("##############")

    @staticmethod
    def compute_justice_type():
        ##############
        # Parameters #
        ##############

        list_type_negociated_agreements = [
            "CJIP",
            "DPA",
            "Guilty Plea Agreement",
            "NPA",
            "NPA Addendum"
        ]
        negociated_agreements = "Negociated Agreements"
        regulatory_decision = "Regulatory Decisions"

        ##############

        decisions = DecisionRepository.fetch_all_decisions()
        for decision in decisions:
            if decision.type in list_type_negociated_agreements:
                decision.justice_type = negociated_agreements
            else:
                decision.justice_type = regulatory_decision
            decision.save()
