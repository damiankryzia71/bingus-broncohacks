# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Users(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True)
    college_major = models.TextField(blank=True, null=True)
    college_year = models.TextField(blank=True, null=True)
    age = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    hobbies = models.TextField(blank=True, null=True)
    comfort_foods = models.TextField(blank=True, null=True)
    music_taste = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Days(models.Model):
    date_field = models.DateField()

    class Meta:
        managed = False
        db_table = 'days'


class DailyQuotes(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    daily_quote = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'daily_quotes'


class WellnessScores(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    wellness_score = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wellness_scores'


class WellnessCategories(models.Model):
    category_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wellness_categories'


class WellnessInputs(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    category = models.ForeignKey(WellnessCategories, models.DO_NOTHING, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wellness_inputs'


class WellnessNotes(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    note = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wellness_notes'


class Recommendations(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    category = models.ForeignKey('RecommendationCategories', models.DO_NOTHING, blank=True, null=True)
    recommendation = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recommendations'


class RecommendationCategories(models.Model):
    category_name = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recommendation_categories'


class JournalEntries(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING, blank=True, null=True)
    day = models.ForeignKey(Days, models.DO_NOTHING, blank=True, null=True)
    entry = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'journal_entries'
