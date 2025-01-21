import { Link } from "react-router-dom";

export default function LinkButton({ to, label, variant = "primary", className = "", ...props }) {
    const baseClass = "inline-block text-center py-2 px-4 rounded transition duration-300";
    const variantClass = {
        primary: "bg-bg-primary text-bg-muted hover:bg-bg-highlight",
        accent: "bg-bg-accent text-black hover:bg-bg-primary",
        highlight: "bg-bg-highlight text-black hover:bg-bg-primary",
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