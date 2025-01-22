import { Link } from "react-router-dom";

export default function LinkButton({ to, label, variant = "primary", className = "", ...props }) {
    const baseClass = "inline-block text-center text-base py-2 px-4 rounded-full transition duration-400";
    const variantClass = {
        primary: "bg-bg-primary text-white hover:bg-bg-highlight",
        accent: "bg-bg-accent text-black hover:bg-bg-primary",
        highlight: "bg-bg-highlight text-black border border-bg-highlight hover:bg-transparent hover:text-bg-muted",
        muted: "bg-transparent text-bg-muted border border-bg-muted hover:bg-bg-muted hover:text-black",
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