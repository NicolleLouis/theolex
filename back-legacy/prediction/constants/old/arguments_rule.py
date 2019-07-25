# -*- coding: utf-8 -*-

from prediction.constants.old.atoms import atoms_label, atoms_rules


def get_argument_label():
    argument_label = {
        'excessive_debt': "Endettement Excessif",
        'borrower_quality': "Emprunteur Averti",
        'handwritten_references_anomaly': "Anomalie des mentions manuscrites",
        'handwritten_references_anomaly_duration': "Anomalie des mentions manuscrites liée à la durée",
        'debt': "Dette",
        'excess': "Excès",
        'financial_capacity': "Capacité financière",
        'duration': "Durée",
    }
    argument_label.update(atoms_label)
    return argument_label


def get_argument_possible_label():
    argument_label = get_argument_label()
    return [
        argument_label['excessive_debt'],
        argument_label['borrower_quality'],
        argument_label['handwritten_references_anomaly_duration'],
        argument_label['handwritten_references_anomaly'],
    ]


def get_argument_rules():
    argument_label = get_argument_label()
    argument_rules = [
        {
            'label': argument_label['excessive_debt'],
            'atomic': False,
            'inputs':
                [
                    [
                        argument_label["debt"],
                        argument_label["excess"],
                    ],
                    [
                        argument_label["financial_capacity"]
                    ],
                ]
        },
        {
            'label': argument_label['borrower_quality'],
            'atomic': True,
            'inputs':
                [
                    ["emprunteur", "averti"],
                    ["emprunteur", "qualité"],
                    ["emprunteur", "profane"],
                ]
        },
        {
            'label': argument_label['handwritten_references_anomaly'],
            'atomic': False,
            'inputs':
                [
                    [argument_label["handwritten_references"], argument_label["validity"]]
                ]
        },
        {
            'label': argument_label['handwritten_references_anomaly_duration'],
            'atomic': False,
            'inputs':
                [
                    [argument_label["handwritten_references"], argument_label["validity"], argument_label["duration"]]
                ]
        },
        {
            'label': argument_label['debt'],
            'atomic': True,
            'inputs':
                [
                    ["endettement"],
                    ["crédit"],
                    ["credit"],
                    ["remboursement"],
                ]
        },
        {
            'label': argument_label['excess'],
            'atomic': True,
            'inputs':
                [
                    ["excessif"],
                    ["alerte"],
                    ["disproportion"],
                ]
        },
        {
            'label': argument_label['financial_capacity'],
            'atomic': True,
            'inputs':
                [
                    ["reste à vivre"],
                    ["capacité", "financière"],
                    ["faculté", "financière"],
                    ["capacité", "remboursement"],
                ]
        },
        {
            'label': argument_label['duration'],
            'atomic': True,
            'inputs':
                [
                    [r"dur[ée]e"],
                    ["limitation dans le temps"],
                    ["ans"],
                    [r"ann[ée]e"],
                    ["mois"],
                    ["mensualités"],
                ]
        },
    ]
    return argument_rules + atoms_rules

