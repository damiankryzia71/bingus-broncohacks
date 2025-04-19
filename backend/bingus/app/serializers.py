from rest_framework import serializers
from .models import (
    Users, Days, DailyQuotes, WellnessScores, WellnessCategories,
    WellnessInputs, WellnessNotes, Recommendations, JournalEntries, RecommendationCategories
)

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = '__all__'

class DailyQuotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyQuotes
        fields = '__all__'

class WellnessScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessScores
        fields = '__all__'

class WellnessCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessCategories
        fields = '__all__'

class WellnessInputsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessInputs
        fields = '__all__'

class WellnessNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessNotes
        fields = '__all__'

class RecommendationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendations
        fields = '__all__'

class JournalEntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntries
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):  # For RecommendationCategories
    class Meta:
        model = RecommendationCategories
        fields = '__all__'
