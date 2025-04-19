from rest_framework import viewsets
from .models import *
from .serializers import *

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class DaysViewSet(viewsets.ModelViewSet):
    queryset = Days.objects.all()
    serializer_class = DaysSerializer

class DailyQuotesViewSet(viewsets.ModelViewSet):
    queryset = DailyQuotes.objects.all()
    serializer_class = DailyQuotesSerializer

class WellnessScoresViewSet(viewsets.ModelViewSet):
    queryset = WellnessScores.objects.all()
    serializer_class = WellnessScoresSerializer

class WellnessCategoriesViewSet(viewsets.ModelViewSet):
    queryset = WellnessCategories.objects.all()
    serializer_class = WellnessCategoriesSerializer

class WellnessInputsViewSet(viewsets.ModelViewSet):
    queryset = WellnessInputs.objects.all()
    serializer_class = WellnessInputsSerializer

class WellnessNotesViewSet(viewsets.ModelViewSet):
    queryset = WellnessNotes.objects.all()
    serializer_class = WellnessNotesSerializer

class RecommendationsViewSet(viewsets.ModelViewSet):
    queryset = Recommendations.objects.all()
    serializer_class = RecommendationsSerializer

class JournalEntriesViewSet(viewsets.ModelViewSet):
    queryset = JournalEntries.objects.all()
    serializer_class = JournalEntriesSerializer

class RecommendationCategoriesViewSet(viewsets.ModelViewSet):  # For RecommendationCategories
    queryset = RecommendationCategories.objects.all()
    serializer_class = CategoriesSerializer
