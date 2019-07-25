# -*- coding: utf-8 -*-

jurisdiction_label = {
    'tgi': "Tribunal de Grande Instance",
    'ti': "Tribunal d'instance",
    'court_of_appeal': "Cour d'appel",
    'proximity_jurisdiction': "Juridiction de proximité",
    'commercial_court': "Tribunal de Commerce",
    'labour_court': "Conseil de Prud'Hommes",
    'cassation_court': "Cour de Cassation",
}

jurisdiction_possible_label = [
    jurisdiction_label['tgi'],
    jurisdiction_label['ti'],
    jurisdiction_label['court_of_appeal'],
    jurisdiction_label['proximity_jurisdiction'],
    jurisdiction_label['commercial_court'],
    jurisdiction_label['labour_court'],
    jurisdiction_label['cassation_court'],
]

jurisdiction_rules = [
    {
        'label': jurisdiction_label['tgi'],
        'atomic': True,
        'inputs':
        [
            ["tribunal", "grande instance"],
            ["tgi"],
        ]
    },
    {
        'label': jurisdiction_label['ti'],
        'atomic': True,
        'inputs':
        [
            ["tribunal", "instance"],
        ]
    },
    {
        'label': jurisdiction_label['court_of_appeal'],
        'atomic': True,
        'inputs':
        [
            ["cour d'appel"],
        ]
    },
    {
        'label': jurisdiction_label['proximity_jurisdiction'],
        'atomic': True,
        'inputs':
        [
            ["juridiction", "proximité"],
        ]
    },
    {
        'label': jurisdiction_label['commercial_court'],
        'atomic': True,
        'inputs':
        [
            ["tribunal", "commerce"],
        ]
    },
    {
        'label': jurisdiction_label['labour_court'],
        'atomic': True,
        'inputs':
        [
            ["conseil", "prud’hommes"],
        ]
    },
    {
        'label': jurisdiction_label['cassation_court'],
        'atomic': True,
        'inputs':
        [
            ["cour", "cassation"],
        ]
    }
]
