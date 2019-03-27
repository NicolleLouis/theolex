# Fixtures

## How to dumpModel

```bash
python manage.py dumpdata prediction.Judgement > fixtures/judgement.json
```

## How to load data

First, drop all the corpus data, then run the following command.

```bash
python manage.py loaddata fixtures/judgement.json
```