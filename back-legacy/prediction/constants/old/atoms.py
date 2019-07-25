# -*- coding: utf-8 -*-

atoms_label = {
    'handwritten_references': "Mentions manuscrites",
    'guarantee': "Caution",
    'validity': "Validité",
    'physical_person': "Personne physique",
    'bank': "Banque",
    'obligation_to_warn': "Obligation de mise en garde",
}

atoms_rules = [
    {
        'label': atoms_label['bank'],
        'atomic': True,
        'inputs':
            [
                ["bancaire", "établissement"],
                ["crédit", "établissement"],
                ["financier", "établissement"],
                ["crédit", "dispensateur"],
                ["banqu"],
                ["crédit", "refus"],
                ["crédit", "octroit"],
                ["endettement"],
                ["emprunt"],
                [r'pr[eêé]teur'],
                [r'cr[eé]ancier'],
            ]
    },
    {
        'label': atoms_label['guarantee'],
        'atomic': True,
        'inputs':
            [
                ["ACS"],
                [r"([ \.]caution|^caution)"],
                ["cautionnement"],
                ["engagement"],
            ]
    },
    {
        'label': atoms_label['validity'],
        'atomic': True,
        'inputs':
            [
                ["contestable"],
                ["recevable"],
                ["recevabilité"],
                ["contestation"],
                ["conforme"],
                [r' validit[ée]'],
                ["nullité"],
                ["ajout"],
                ["adjonction"],
                ["ad", "validitatem"],
                ["ad", "probationem"],
                ["formalisme", "prescrit"],
                ["dispositions", "protectrices"],
                ["prescriptions l[ée]gales"],
                ["formalisme l[ée]gal"],
            ]
    },
    {
        'label': atoms_label['physical_person'],
        'atomic': True,
        'inputs':
            [
                ["personne", "physique"],
                [" PP "]
            ]
    },
    {
        'label': atoms_label['handwritten_references'],
        'atomic': True,
        'inputs':
            [
                ["mention", "manuscrite"],
                ["formule", "l[ée]gale"],
                ["formule", "obligatoire"],
                ["mention", "obligatoire"],
                ["formulation"],
            ]
    },
    {
        'label': atoms_label['obligation_to_warn'],
        'atomic': True,
        'inputs':
        [
            ["devoir", "mise en garde"],
            ["obligation", "mise en garde"],
            ["défaut", "mise en garde"],
        ]
    },
]
