const API_URL = " https://dose-backboard-wolverine.ngrok-free.dev";

export async function authFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    let token = localStorage.getItem("access_token");

    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
        },
    });

    if (response.status !== 401) {
        return response;
    }

    // access token истек
    const refreshResponse = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!refreshResponse.ok) {
        throw new Error("Unauthorized");
    }

    const data = await refreshResponse.json();

    localStorage.setItem("access_token", data.access_token);

    token = data.access_token;

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
        },
    });
}