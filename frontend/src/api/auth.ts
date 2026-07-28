 const API_URL = " https://dose-backboard-wolverine.ngrok-free.dev";

export async function register(username: string, password: string) {
    const userData = { username, password };

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
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
            'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`Ошибка авторизации: ${response.status}`);
    }

    return await response.json();
}