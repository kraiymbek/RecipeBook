# Generated by Django 2.0.4 on 2018-04-16 03:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20180415_1807'),
    ]

    operations = [
        migrations.CreateModel(
            name='IngredientsFull',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ingredient', models.CharField(blank=True, max_length=1000)),
                ('recipe', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Recipe')),
            ],
        ),
    ]
