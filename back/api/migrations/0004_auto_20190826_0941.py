# Generated by Django 2.2.4 on 2019-08-26 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_decision_authority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authority',
            name='country',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='authority',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='authority',
            name='jurisdiction',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='authority',
            name='name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='authority',
            name='publication_website',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='authority',
            name='type',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='decision',
            name='decision_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='decision',
            name='monetary_sanction',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='decision',
            name='name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='decision',
            name='text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='decision',
            name='type',
            field=models.TextField(blank=True, null=True),
        ),
    ]
