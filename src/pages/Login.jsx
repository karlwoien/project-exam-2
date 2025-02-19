import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../forms/validation/userSchema";
import { loginUser } from "../api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { toast } from "react-toastify";
import NotificationMessage from "../components/NotificationsMessage";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(""); // Bruker kun denne for feil
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            setUser(response.data, response.data.accessToken);
            toast.success("Login successful! Redirecting..", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate("/profile"),
            });
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    useTitle("Login");

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg border border-bg-primary mt-40">
            <h2 className="text-center text-2xl font-normal mb-4">Login to your account</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <InputField 
                    label="Email" 
                    placeholder="name@stud.noroff.no"
                    register={{
                        ...register("email"),
                        onChange: (e) => {
                            if (errorMessage) setErrorMessage(""); // Nullstiller kun hvis det er feil
                            register("email").onChange(e);
                        }
                    }}
                    name="email"
                    error={errors.email?.message}
                    aria-label="Enter your email address"
                    autoComplete="email"
                />

                {/* Password Input */}
                <InputField 
                    label="Password" 
                    placeholder="Your password" 
                    type="password"
                    register={{
                        ...register("password"),
                        onChange: (e) => {
                            if (errorMessage) setErrorMessage("");
                            register("password").onChange(e);
                        }
                    }}
                    name="password"
                    error={errors.password?.message}
                    aria-label="Enter your password"
                    autoComplete="current-password"
                />

                {/* Submit Button */}
                <button type="submit" className="w-full mt-2 bg-bg-primary text-white py-2 rounded-full hover:bg-bg-highlight">
                    Login
                </button>

                {/* Register Link */}
                <div className="flex space-x-2 mb-6 mt-3 justify-center">
                    <p className="text-sm">Don't have an account?</p>
                    <Link to="/register" className="text-bg-primary text-sm hover:underline">Register here</Link>
                </div>

                {/* Error Message */}
                {errorMessage && <NotificationMessage type="error" message={errorMessage} />}
            </form>
        </div>
    );
}