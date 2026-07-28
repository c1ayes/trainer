import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/protection/ProtectedRoute";
import PublicRoute from "./components/protection/PublicRoute";

function App() {
    return (
        <Routes>

            <Route element={<PublicRoute />}>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<Layout />}
                />
            </Route>

        </Routes>
    );
}

export default App;