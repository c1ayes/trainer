import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { useContext } from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;

    login: (token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("access_token")
    );

    const login = (token: string) => {

        localStorage.setItem("access_token", token);

        setToken(token);

    };

    const logout = async () => {

        await fetch("https://dose-backboard-wolverine.ngrok-free.dev/logout", {
            method: "POST",
            credentials: "include",
            headers:{
                'ngrok-skip-browser-warning': 'true',
            }
        });

        localStorage.removeItem("access_token");

        setToken(null);

    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: token !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used inside AuthProvider");

    return context;
}