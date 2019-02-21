# Generated by Django 2.1.5 on 2019-02-21 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkn_app', '0003_remove_user_friends'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='friends',
            field=models.ForeignKey(blank='True', default=0, on_delete=django.db.models.deletion.CASCADE, related_name='friends_list', to='checkn_app.User'),
        ),
    ]
