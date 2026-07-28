from ollama import chat

def ask_llm(messages: list[dict]) -> str:
    response = chat(
        model="qwen3:8b",
        messages=messages,
    )

    return response["message"]["content"]