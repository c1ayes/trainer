 const API_URL = "http://127.0.0.1:8000";

export async function register(username: string, password: string) {
    const userData = { username, password };

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`Ошибка регистрации: ${response.status}`);
    }
    return await response.json();
}
export async function loginAPI(username: string, password: string) {
    const userData = { username, password };

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`Ошибка авторизации: ${response.status}`);
    }

    return await response.json();
}