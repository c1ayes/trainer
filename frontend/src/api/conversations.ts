import { authFetch } from "./authFetch";

export async function getConversations() {
    const response = await authFetch("/conversation/");

    if (!response.ok) {
        throw new Error("Не удалось получить диалоги");
    }

    return await response.json();
}


export async function getConversation(conversationId: number) {
    const response = await authFetch(
        `/conversation/${conversationId}`
    );

    if (!response.ok) {
        throw new Error("Диалог не найден");
    }

    return await response.json();
}


export async function createConversation(title: string) {
    const response = await authFetch("/conversation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
        }),
    });

    if (!response.ok) {
        throw new Error("Не удалось создать диалог");
    }

    return await response.json();
}


export async function updateConversation(
    conversationId: number,
    title: string
) {
    const response = await authFetch(
        `/conversation/${conversationId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Не удалось обновить название");
    }

    return await response.json();
}


export async function deleteConversation(
    conversationId: number
) {
    const response = await authFetch(
        `/conversation/${conversationId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Не удалось удалить диалог");
    }

    return await response.json();
}
