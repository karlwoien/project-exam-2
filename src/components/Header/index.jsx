import React, { useState, useEffect, useRef } from "react";
import LinkButton from "../LinkButton";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../utils/authUtils";
import { MdMenu, MdClose } from "react-icons/md"; // Ikoner for hamburgermeny

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const { user } = useAuthStore();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lukk dropdown når man klikker utenfor
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isHome && !scrolled
                    ? "bg-transparent text-white"
                    : "bg-bg-primary text-white"
            }`}
        >
            <div className="flex items-center justify-between px-5 py-4">
                {/* Logo */}
                <div className="logo text-4xl font-logo">
                    <Link to="/">Holidaze</Link>
                </div>

                {/* Desktop Navigation (Skjules på små skjermer) */}
                <div className="hidden md:flex items-center space-x-5">
                    <nav className="space-x-5 text-lg">
                        <Link to="/" className="hover:text-bg-highlight">Home</Link>
                        <Link to="/venues" className="hover:text-bg-highlight">Venues</Link>
                    </nav>

                    {/* Conditional Buttons */}
                    <div className="relative space-x-5">
                        {user ? (
                            <>
                                {/* Profile Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 bg-transparent py-2 rounded-md hover:text-bg-highlight transition"
                                    >
                                        <p>Profile</p>
                                        <img
                                            src={user.avatar?.url || "https://via.placeholder.com/40"}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border border-white"
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div
                                        className={`absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-md z-50 overflow-hidden transition-transform transform ${
                                            dropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                                        } origin-top`}
                                    >
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            View Profile
                                        </Link>

                                        {user.venueManager && (
                                            <Link
                                                to="/venues/new"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Add New Venue
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => {
                                                logoutUser();
                                                setDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* If Not Logged In */}
                                <LinkButton to="/login" label="Login" variant="muted" />
                                <LinkButton to="/register" label="Register" variant="highlight" />
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-3xl focus:outline-none"
                >
                    {menuOpen ? <MdClose /> : <MdMenu />}
                </button>
            </div>

            {/* Mobile Menu (Kun synlig på små skjermer) */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-transform transform ${
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                } md:hidden`}
            >
                <div className="absolute top-0 right-0 w-64 h-full bg-white text-gray-900 shadow-lg p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-4 right-4 text-2xl"
                    >
                        <MdClose />
                    </button>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-4 text-lg mt-10">
                        <Link to="/" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/venues" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Venues</Link>

                        {user ? (
                            <>
                                <Link to="/profile" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Profile</Link>
                                {user.venueManager && (
                                    <Link to="/venues/new" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Add Venue</Link>
                                )}
                                <button
                                    onClick={() => {
                                        logoutUser();
                                        setMenuOpen(false);
                                    }}
                                    className="text-red-500 hover:bg-gray-100 text-left px-4 py-2 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <LinkButton to="/login" label="Login" variant="muted" />
                                <LinkButton to="/register" label="Register" variant="highlight" />
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
