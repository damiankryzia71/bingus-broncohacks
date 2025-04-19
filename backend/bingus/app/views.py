from rest_framework import viewsets
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg
from django.db.models.functions import TruncMonth
from django.db.models.functions import TruncDay


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
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return WellnessScores.objects.filter(user=user).order_by("day_id")
        return WellnessScores.objects.none()

class WellnessMonthlyScoresView(APIView):
    def get(self, request):
        daily_scores = (
            WellnessScores.objects
            .annotate(truncated_day=TruncDay('day__date_field'))  # assumes your model has a `date` field
            .values('truncated_day')
            .annotate(wellness_scores=Avg('wellness_score'))
            .order_by('truncated_day')
        )

        data = [
            {
                "day": entry["truncated_day"].strftime("%Y-%m-%d"),
                "wellness_scores": entry["wellness_scores"]
            }
            for entry in daily_scores
        ]

        return Response(data, status=status.HTTP_200_OK)
    
# class WellnessMonthlyScoresView(APIView):
#     def get(self, request):
#         user = request.user
       
        
#         # Get each WellnessScores entry for the logged in user, joining with the Days model.
#         daily_scores = WellnessScores.objects.filter(user=user).select_related('day').order_by('day__date_field')
        
#         data = [
#             {
#                 "date": score.day.date_field.strftime("%Y-%m-%d"),  # Change the format as needed
#                 "wellness_score": score.wellness_score
#             }
#             for score in daily_scores
#         ]

#         return Response(data, status=status.HTTP_200_OK)

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
