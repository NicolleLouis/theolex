# -*- coding: utf-8 -*-

from prediction.constants.old.atoms import atoms_label, atoms_rules


def get_topic_label():
    topics_label = {
        'banker_obligation_to_warn': "Obligation de mise en garde du banquier",
        'invalidity_of_the_bond': "Nullité de cautionnement",
        'invalidity_of_the_bond_physical_person': "Nullité de cautionnement octroyé par une personne physique",
    }
    topics_label.update(atoms_label)
    return topics_label


def get_topics_possible_label():
    topics_label = get_topic_label()
    return [
        topics_label['banker_obligation_to_warn'],
        topics_label['invalidity_of_the_bond_physical_person'],
        topics_label['invalidity_of_the_bond'],
    ]


def get_topic_rules():
    topics_label = get_topic_label()
    topics_rules = [
        {
            'label': topics_label['banker_obligation_to_warn'],
            'atomic': False,
            'inputs':
                [
                    [
                        topics_label['bank'],
                        topics_label['obligation_to_warn'],
                    ],
                ]
        },
        {
            'label': topics_label['invalidity_of_the_bond_physical_person'],
            'atomic': False,
            'inputs':
                [
                    [
                        topics_label['guarantee'],
                        topics_label['validity'],
                        topics_label['physical_person'],
                        topics_label['bank'],
                        topics_label['handwritten_references'],
                    ]
                ]
        },
        {
            'label': topics_label['invalidity_of_the_bond'],
            'atomic': False,
            'inputs':
                [
                    [
                        topics_label['guarantee'],
                        topics_label['validity'],
                        topics_label['bank'],
                        topics_label['handwritten_references'],
                    ],
                ]
        }
    ]
    return topics_rules + atoms_rules
