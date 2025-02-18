import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../forms/validation/userSchema";
import { loginUser } from "../api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import { Link } from "react-router-dom";

export default function Login() {
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Bruker React Router til navigasjon
    const setUser = useAuthStore((state) => state.login); // Henter Zustand login-funksjon

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setError(null);
        try {
            const response = await loginUser(data);
            setUser(response.data, response.data.accessToken); // Oppdater Zustand state
            alert("Login successful!");
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg border border-bg-primary mt-40">
            <h2 className="text-center text-2xl font-normal mb-4">Login to your account</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" placeholder="name@stud.noroff.no" register={register("email")} error={errors.email?.message} />
                <InputField label="Password" placeholder="Your password" type="password" register={register("password")} error={errors.password?.message} />
                <button type="submit" className="w-full mt-2 bg-bg-primary text-white py-2 rounded-full hover:bg-bg-highlight">
                    Login
                </button>
                <div className="flex space-x-2 mb-6 mt-3 justify-center">
                    <p className="text-sm">Don't have an account?</p>
                    <Link to="/register" className="text-bg-primary text-sm hover:underline">Register here</Link>
                </div>
                
                
            </form>
        </div>
    );
}