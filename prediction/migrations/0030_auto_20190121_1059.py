# Generated by Django 2.0.5 on 2019-01-21 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0029_auto_20190121_1021'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='judgement',
            name='conclusion_text',
        ),
        migrations.AddField(
            model_name='judgement',
            name='percentage_condemnation',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='judgement',
            name='total_amount_condemned',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='judgement',
            name='total_amount_requested',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='judgementamount',
            name='price',
            field=models.FloatField(null=True),
        ),
    ]
