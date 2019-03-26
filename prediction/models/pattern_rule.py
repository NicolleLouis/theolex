from django.db import models
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from prediction.models.pattern import Pattern


class PatternRule(models.Model):
    id = models.AutoField(primary_key=True)
    pattern = models.ForeignKey(
        Pattern,
        null=True,
        on_delete=models.CASCADE
    )
    regex_1 = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )
    regex_2 = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )
    regex_3 = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )
    regex_4 = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    def __str__(self):
        str_regex_1 = self.regex_1 if self.regex_1 else ""
        str_regex_2 = self.regex_2 if self.regex_2 else ""
        str_regex_3 = self.regex_3 if self.regex_3 else ""
        str_regex_4 = self.regex_4 if self.regex_4 else ""
        list_str_regex = [
            str_regex_1,
            str_regex_2,
            str_regex_3,
            str_regex_4
        ]
        return str(self.pattern) + ": " + ", ".join(list_str_regex)

    def to_list(self):
        list_rule = [
            self.regex_1,
            self.regex_2,
            self.regex_3,
            self.regex_4,
        ]
        list_rule_filtered = list(filter(lambda rule: rule is not None, list_rule))
        return list_rule_filtered


class PatternRuleAdmin (ImportExportModelAdmin):
        list_display = (
            'regex_1',
            'regex_2',
            'regex_3',
            'regex_4',
        )


class PatternRuleInline(admin.TabularInline):
    model = PatternRule
