import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../forms/validation/userSchema";
import { registerUser } from "../api/apiClient";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import AccountTypeSelector from "../forms/AccountTypeSelector";

export default function Register() {
    const [error, setError] = useState(null);
    const [venueManager, setVenueManager] = useState(false);
    const navigate = useNavigate(); // Bruker React Router for navigasjon
    const setUser = useAuthStore((state) => state.login); // Henter Zustand login-funksjon

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setError(null);
        try {
            const userPayload = {
                name: data.name,
                email: data.email,
                password: data.password,
                venueManager: venueManager,
            };

            const response = await registerUser(userPayload);
            setUser(response.data, response.data.accessToken); // Oppdater Zustand state

            alert("Registration successful!");
            navigate("/profile");
        } catch (err) {
            console.error("Error during registration:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-40">
            <h2 className="text-center text-2xl font-bold mb-4">Register an account</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <AccountTypeSelector selected={venueManager} setSelected={setVenueManager} />
                
                <InputField label="Name" register={register("name")} error={errors.name?.message} />
                <InputField label="Email" register={register("email")} error={errors.email?.message} />
                <InputField label="Password" type="password" register={register("password")} error={errors.password?.message} />
                <InputField label="Confirm Password" type="password" register={register("confirmPassword")} error={errors.confirmPassword?.message} />

                <button type="submit" className="w-full mt-4 bg-bg-primary text-white py-2 rounded-md hover:bg-bg-highlight">
                    Register
                </button>
            </form>
        </div>
    );
}