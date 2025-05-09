import os
import json
import openai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

def get_wellness_suggestions(user_profile, daily_input):
    system_prompt = (
        "You are a wellness helper AI. Use the user's personal profile and daily wellness inputs, as well as an additional personal note from the user to offer personalized suggestions "
        "in five categories: active reset, passive rest, music, productivity, and food. Each category should have 3 suggestions. Your suggestions should aim to improve the "
        "user’s mood for the day. Based on the user's inputs, generate wellness score (0 - 100) for the day. This number should just be an integer. For the food category be sure to suggest new foods related to what the user likes. Return the output as a JSON object with keys: active_reset, passive_rest, music, productivity, and food. "
        "Each value should be a short, practical suggestion. Finally, generate a nice and encouraging quote for the day."
    )

    prompt_content = f"""
User profile:
{json.dumps(user_profile, indent=2)}

Today's wellness input:
{json.dumps(daily_input, indent=2)}

Return your response in the following JSON format:
{{
  "active_reset": "...",
  "passive_rest": "...",
  "music": "...",
  "productivity": "...",
  "food": "...",
  "daily_score": "...",
  "daily_quote": "..."
}}
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt_content}
        ]
    )

    return json.loads(response.choices[0].message.content)
