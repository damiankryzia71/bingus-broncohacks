from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from app.openai_service import ask_openai

def index(request):
    return HttpResponse("Hello Bingus")

# def ask_openai_view(request):
    # 1. Hardcoded question
    # question = "Hello, how are you?"

    # 2. Call your OpenAI service
    # answer = ask_openai(question)

    # 3. Return the answer as JSON
    # return JsonResponse({'question': question, 'answer': answer})

