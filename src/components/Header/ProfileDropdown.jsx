import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function ProfileDropdown({ user, dropdownOpen, setDropdownOpen, logoutUser }) {
    const dropdownRef = useRef(null);

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
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-transparent py-2 rounded-md hover:scale-105 transition-transform duration-300 hover:text-bg-highlight"
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
                className={`absolute right-0 mt-2 w-48 bg-white text-black border shadow-lg rounded-md z-50 overflow-hidden transition-transform transform ${
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
                        Add Venue
                    </Link>
                )}
                <div className="border-t border-gray-300"></div>
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
    );
}