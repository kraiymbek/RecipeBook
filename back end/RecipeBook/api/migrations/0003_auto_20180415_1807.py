# Generated by Django 2.0.4 on 2018-04-15 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180415_1804'),
    ]

    atomic = False

    operations = [
        migrations.RenameModel(
            old_name='Howto',
            new_name='CookStep',
        ),
        migrations.RenameModel(
            old_name='Recipes',
            new_name='Recipe',
        ),
    ]