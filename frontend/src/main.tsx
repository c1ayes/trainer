import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ResultProvider } from "./contexts/ResultContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ConversationProvider } from "./contexts/ConversationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <ConversationProvider>
                <ResultProvider>
                    <App />
                </ResultProvider>
            </ConversationProvider>
        </AuthProvider>
    </BrowserRouter>
);