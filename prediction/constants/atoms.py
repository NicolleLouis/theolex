# -*- coding: utf-8 -*-

from prediction.services.repository.pattern_collection_repository import get_pattern_collection,\
    pattern_collection_to_json

collection_atom_label = "Atom"
collection_atom = get_pattern_collection(collection_atom_label)

atoms_rules = pattern_collection_to_json(collection_atom)
