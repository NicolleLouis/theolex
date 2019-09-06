# Generated by Django 2.2.4 on 2019-09-06 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_decision_authorities'),
    ]

    operations = [
        migrations.AlterField(
            model_name='decision',
            name='authorities',
            field=models.ManyToManyField(blank=True, to='api.Authority'),
        ),
        migrations.AlterField(
            model_name='decision',
            name='violations',
            field=models.ManyToManyField(blank=True, to='api.Violation'),
        ),
    ]
