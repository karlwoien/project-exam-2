import LinkButton from "../LinkButton";
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="flex items-center justify-between bg-bg-primary text-bg-muted px-5 py-4">
            {/* Logo */}
            <div className="logo text-4xl font-logo">
                <Link to="/">Holidaze</Link>
            </div>
            {/* Navigation */}
            <div className="flex items-center space-x-5">
                <nav className="space-x-5 text-lg">
                    <Link to="/" className="hover:text-bg-highlight">Home</Link>
                    <Link to="/venues" className="hover:text-bg-highlight">Venues</Link>
                </nav>
                {/* Buttons */}
                <div className="space-x-5">
                    <LinkButton to="/login" label="Login" variant="muted"/>
                    <LinkButton to="/register" label="Register" variant="highlight" />
                </div>
            </div>
        </header>
    );
};