# Generated by Django 2.2.4 on 2019-10-02 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20190913_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='decision',
            name='document_link',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='decision',
            name='press_release_link',
            field=models.TextField(blank=True, null=True),
        ),
    ]
