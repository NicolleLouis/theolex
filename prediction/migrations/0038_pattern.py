# Generated by Django 2.0.5 on 2019-02-06 09:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0037_patterncollection'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pattern',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=200, null=True)),
                ('is_atomic', models.BooleanField(default=True)),
                ('pattern_collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prediction.PatternCollection')),
            ],
        ),
    ]
