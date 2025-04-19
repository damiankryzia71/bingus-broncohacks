from rest_framework import viewsets
from .models import *
from .serializers import *
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .openai_service import get_wellness_suggestions

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

@csrf_exempt
# API to get the wellness suggestions
def wellness_suggestions_api(request):
    print(request.method)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_profile = data.get("user_profile")
            daily_input = data.get("daily_input")

            if not user_profile or not daily_input:
                return JsonResponse({"error": "Missing user_profile or daily_input"}, status=400)

            suggestions = get_wellness_suggestions(user_profile, daily_input)
            return JsonResponse(suggestions, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests allowed"}, status=405)
