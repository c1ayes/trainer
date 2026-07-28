import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#08111d] flex">
            <div className="flex-1 flex items-center justify-center">
                <LoginForm />
            </div>

        </div>
    );
};

export default LoginPage;