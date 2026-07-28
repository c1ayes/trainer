import AuthInput from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useState } from "react";


const RegisterForm = () => {
    const [loading, setLoading] = useState<boolean>()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
    const [error, setError] = useState<string>('')

    const handleRegister = async() => {
        setLoading(true)
        try{
            await register(username, password);
            navigate("/", { replace: true });
        } catch(error:any){
            setError(error.message);
        } finally{
            setLoading(false)
        }
    }

    return (

        <div className="w-[500px]">

            <h1 className="text-5xl font-black text-white">
                СОЗДАТЬ АККАУНТ
            </h1>

            <p className="text-slate-400 mt-2">
                Создайте аккаунт, чтобы начать анализ
            </p>

            <div className="mt-10 space-y-6">

                <AuthInput
                    label="ИМЯ ПОЛЬЗОВАТЕЛЯ"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <AuthInput
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>
            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
             )}
            <button
                className="w-full h-14 rounded-xl bg-cyan-400 mt-8
                font-semibold text-black hover:bg-cyan-300 transition disabled:opacity-50"
                disabled={loading}
                onClick={handleRegister}
            >
                {loading ? "Загрузка..." : "Войти"}
            </button>


            <p className="text-center text-slate-400 mt-8">

                Уже есть аккаунт?

                <Link to="/login" className="text-cyan-400 ml-2">
                    Войти
                </Link>

            </p>

        </div>

    );
};
export default RegisterForm