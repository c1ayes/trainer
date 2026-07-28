import { authFetch } from "./authFetch";

export async function sendMessage(
    conversationId: number | null,
    content: string
) {
    const response = await authFetch("/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            conversation_id: conversationId,
            content,
        }),
    });

    if (!response.ok) {
        throw new Error("Не удалось отправить сообщение");
    }

    return await response.json();
}


export async function getMessages(
    conversationId: number
) {
    const response = await authFetch(
        `/${conversationId}/messages`
    );

    if (!response.ok) {
        throw new Error("Не удалось загрузить сообщения");
    }

    return await response.json();
}
