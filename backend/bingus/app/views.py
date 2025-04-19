from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from app.openai_service import get_wellness_suggestions

def index(request):
    return HttpResponse("Hello Bingus")

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