import { Link } from "react-router-dom";

export default function LinkButton({ to, label, variant = "primary", className = "", ...props }) {
    const baseClass = "inline-block text-center text-base py-2 px-4 rounded-full transition duration-400";
    const variantClass = {
        primary: "bg-bg-primary border border-transparent text-white hover:bg-bg-highlight",
        accent: "bg-bg-accent border border-bg-accent text-black hover:brightness-90",
        highlight: "bg-bg-highlight text-black border border-bg-highlight hover:bg-transparent hover:text-white hover:scale-105 transition-transform duration-300",
        muted: "bg-transparent border border-white hover:border-bg-highlight hover:text-bg-highlight hover:scale-105 transition-transform duration-300",
    };

    return (
        <Link
            to={to}
            className={`${baseClass} ${variantClass[variant]} ${className}`}
            {...props}
        >
            {label}
        </Link>
    );
};