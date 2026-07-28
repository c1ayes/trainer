import RegisterForm from "../components/auth/RegisterForm";
import Testimonial from "../components/auth/Testimonial";

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-[#08111d] flex">

            <Testimonial />

            <div className="flex-1 flex items-center justify-center">
                <RegisterForm />
            </div>

        </div>
    );
};

export default RegisterPage;