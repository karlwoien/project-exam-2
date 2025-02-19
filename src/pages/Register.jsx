import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../forms/validation/userSchema";
import { registerUser, loginUser } from "../api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import AccountTypeSelector from "../forms/AccountTypeSelector";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { toast } from "react-toastify";

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
    
            await registerUser(userPayload);

            const loginResponse = await loginUser({ 
                email: data.email, 
                password: data.password 
            });
    
            setUser(loginResponse.data, loginResponse.data.accessToken);
    
            toast.success("Registration successful! Redirecting...", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate("/profile"),
            });
    
        } catch (err) {
            console.error("Error during registration:", err.message);
            setError("Registration failed. Please try again.");
        }
    };

    useTitle("Register")

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg border border-bg-primary mt-40">
            <h2 className="text-center text-2xl font-normal mb-4">Register an account</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <AccountTypeSelector selected={venueManager} setSelected={setVenueManager} />
                {/* Dynamic Account Type Description */}
                <div className="text-base mb-4">
                    {venueManager ? (
                        <p className="text-xs">A Venue Mangager account allows you to list and manage venues for booking. If you want to book venues, switch to Traveler.</p>
                    ) : (
                        <p className="text-xs">A Traveler account is a customer account used for booking venues. If you want to list venues, switch to Venue Manager.</p>
                    )}
                </div>
                <InputField label="Name" placeholder="Username" register={register("name")} error={errors.name?.message} />
                <InputField label="Email" placeholder="name@stud.noroff.no" register={register("email")} error={errors.email?.message} />
                <InputField label="Password" placeholder="Password" type="password" register={register("password")} error={errors.password?.message} />
                <InputField label="Confirm Password" placeholder="Confirm password" type="password" register={register("confirmPassword")} error={errors.confirmPassword?.message} />

                <button type="submit" className="w-full mt-2 bg-bg-primary text-white py-2 rounded-full hover:bg-bg-highlight">
                    Register
                </button>
                <div className="flex space-x-2 mb-6 mt-3 justify-center">
                    <p className="text-sm">Already have a user?</p>
                    <Link to="/login" className="text-bg-primary text-sm hover:underline">Login here</Link>
                </div>
            </form>
        </div>
    );
}