# Generated by Django 2.0.5 on 2018-12-18 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0016_auto_20181218_1147'),
    ]

    operations = [
        migrations.AddField(
            model_name='argument',
            name='abstract',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='mailargument',
            name='abstract',
            field=models.TextField(blank=True, null=True),
        ),
    ]
