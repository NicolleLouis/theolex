# Label a judgment

# Why?
We removed this  feature because we were not using it but it might be useful if you want to do some deep learning

# How?
## For the people doing the labels:

- Add at the end of the judgement: 
'//theolex//'
Then add all the label line by line following this typo:

label_name: label

## For the dev:
 - Create the label model: (Don't forget to complete the init.py of models)
 ```python
from django.db import models
from django.contrib import admin
from .judgment import Judgement


class Label(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=200, null=True)
    value = models.TextField(null=True)
    judgement = models.ForeignKey(
        Judgement,
        null=True,
        on_delete=models.CASCADE
    )

    def __str__(self):
        if self.type and self.value:
            return self.type + ' : ' + self.value
        else:
            return 'label not completed'

    def to_json(self):
        return {
            'type': self.type,
            'value': self.value
        }


class LabelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'type',
        'value',
        'judgement'
    )
```

In the load_judgement function add the following logic:

```python
from ..models.label import Label
password = '//theolex//'

label_text = None
    try:
        index = text.index(password)
        label_text = text[index + 12:]
        text = text[:index]
        create_labels(label_text, judgement)
    except ValueError:
        logger.error('label password  not found')

def create_labels(label_text, judgement):
    label_text_lines = label_text.splitlines()
    for line in label_text_lines:
        index = line.find(':')
        if index != -1:
            Label.objects.create(
                type=line[:index],
                value=line[index + 1:],
                judgement=judgement
            )
```