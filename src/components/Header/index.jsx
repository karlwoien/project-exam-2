import React, { useState, useEffect } from "react";
import LinkButton from "../LinkButton";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/"; // Sjekker om brukeren er på Home-siden

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isHome && !scrolled
                    ? "bg-transparent text-bg-muted"
                    : "bg-bg-primary text-bg-muted"
            }`}
        >
            <div className="flex items-center justify-between px-5 py-4">
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
            </div>
        </header>
    );
};