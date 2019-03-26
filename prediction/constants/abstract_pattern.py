# -*- coding: utf-8 -*-

abstract_label = {
    'abstract': "Abstract",
}

abstract_possible_label = [
    abstract_label['abstract'],
]

abstract_rules = [
    {
        'label': abstract_label['abstract'],
        'atomic': True,
        'inputs':
        [
            [r'caract[eé]rise'],
            [r'en l\'esp[eè]ce'],
            [r'constate[^r]'],
        ]
    }
]
