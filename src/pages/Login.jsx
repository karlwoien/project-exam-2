import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../forms/validation/userSchema";
import { loginUser } from "../api/apiClient";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";

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
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-40">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" register={register("email")} error={errors.email?.message} />
                <InputField label="Password" type="password" register={register("password")} error={errors.password?.message} />

                <button type="submit" className="w-full mt-4 bg-bg-primary text-white py-2 rounded-md hover:bg-bg-highlight">
                    Login
                </button>
            </form>
        </div>
    );
}