# Use TFIDF on a judgement

# Why?
We removed this  feature because we were not using it but it might be useful if you want to do some keyword search

# How?
In the model judgement, add 2 fields

judge_argument_keyword is a summary of the top words
judge_argument_tfidf_result is the whole tfidf

```python
judge_argument_keyword = models.TextField(blank=True, null=True)
judge_argument_tfidf_result = models.TextField(blank=True, null=True)

```

In the admin model, add a custom field:
```python
from django.utils.html import linebreaks
from django.utils.safestring import mark_safe

# Add 'judge_argument_keyword_admin' in the list_display to display a summary of the tfidf
def judge_argument_keyword_admin(self, judgement):
    judge_argument_keyword = judgement.judge_argument_keyword
    return mark_safe(linebreaks(judge_argument_keyword))
judge_argument_keyword_admin.allow_tags = True

```


In the load_judgement function add the following logic, below the claimant defendant logic

Also don't forget to update the field in judgement creation

```python
from prediction.services.tfidf.tfidf import compute_tfidf, tfidif_result_to_string
from prediction.services.utils import get_first_lines

number_of_lines_displayed = 26

tfidf_result = tfidif_result_to_string(compute_tfidf(judge_argument_text))
judgement_keywords = get_first_lines(tfidf_result, number_of_lines_displayed)
```