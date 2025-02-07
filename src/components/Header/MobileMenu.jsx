import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function MobileMenu({ user, menuOpen, setMenuOpen, logoutUser }) {
    return (
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
                            <Link to="/login" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}