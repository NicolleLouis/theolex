# Generated by Django 2.2.4 on 2019-10-04 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20191002_1243'),
    ]

    operations = [
        migrations.AddField(
            model_name='decision',
            name='defendant',
            field=models.TextField(blank=True, null=True),
        ),
    ]
