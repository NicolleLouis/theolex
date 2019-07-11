# -*- coding: utf-8 -*-

amount_label = {
    'amount': "Montant",
    'dismiss': "Déboute",
    'condemn': "Condamne",
    'societe_general': "Société Générale",
}

amount_possible_label = [
    amount_label['amount'],
]

amount_rules = [
    {
        'label': amount_label['amount'],
        'atomic': True,
        'inputs':
        [
            ["demande[^u]"],
            [r'd[eé]boute'],
            ["condamn"],
            ["dommage", r'int[eé]r[eê]t'],
            ["ordonne"],
            ["oblige"],
        ]
    },
    {
        'label': amount_label['dismiss'],
        'atomic': True,
        'inputs':
        [
            [r'd[ée]boute[^r]'],
            [r'rejet[ée]', "demande"],
        ]
    },
    {
        'label': amount_label['condemn'],
        'atomic': True,
        'inputs':
        [
            [r'condamne[^r]'],
        ]
    },
    {
        'label': amount_label['societe_general'],
        'atomic': True,
        'inputs':
        [
            [r'soci[ée]t[ée]', r'g[eé]n[ée]ral'],
        ]
    },
]
