# Generated by Django 2.2.4 on 2019-09-13 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='name',
            field=models.TextField(blank=True, null=True, unique=True),
        ),
    ]
