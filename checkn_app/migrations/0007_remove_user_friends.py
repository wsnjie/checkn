# Generated by Django 2.1.5 on 2019-02-21 20:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checkn_app', '0006_auto_20190221_2000'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='friends',
        ),
    ]
