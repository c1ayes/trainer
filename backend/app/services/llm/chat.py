from app.services.llm.client import ask_llm
from app.services.llm.prompts import ANALYSIS_PROMPT, SYSTEM_PROMPT
import json

def generate_response(messages):
    history = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        }
    ]

    history.extend(
        {
            "role": message.role,
            "content": message.content,
        }
        for message in messages
    )

    return ask_llm(history)

def generate_report(metrics):
    history = [
        {
            "role": "system",
            "content": ANALYSIS_PROMPT,
        },
        {
            "role": "user",
            "content": json.dumps(metrics, ensure_ascii=False),
        },
    ]

    return ask_llm(history)