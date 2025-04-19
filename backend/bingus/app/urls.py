from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'days', DaysViewSet)
router.register(r'daily-quotes', DailyQuotesViewSet)
router.register(r'wellness-scores', WellnessScoresViewSet)
router.register(r'wellness-categories', WellnessCategoriesViewSet)
router.register(r'wellness-inputs', WellnessInputsViewSet)
router.register(r'wellness-notes', WellnessNotesViewSet)
router.register(r'recommendations', RecommendationsViewSet)
router.register(r'journal-entries', JournalEntriesViewSet)
router.register(r'recommendation-categories', RecommendationCategoriesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]