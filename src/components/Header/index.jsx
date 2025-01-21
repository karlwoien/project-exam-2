import LinkButton from "../LinkButton";
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="flex items-center justify-between bg-bg-primary text-bg-muted px-6 py-4">
            {/* Logo */}
            <div className="logo text-5xl font-logo">
                <Link to="/">Holidaze</Link>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-6 text-lg">
                <Link to="/" className="hover:text-bg-highlight">Home</Link>
                <Link to="/venues" className="hover:text-bg-accent">Venues</Link>
            </nav>

            {/* Buttons */}
            <div className="flex space-x-4">
                <LinkButton to="/login" label="Login" />
                <LinkButton to="/register" label="Register" />
            </div>
        </header>
    );
}