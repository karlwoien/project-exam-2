import { Link } from "react-router-dom";
import { CiInstagram, CiFacebook, CiLinkedin } from "react-icons/ci";

export default function Footer() {
    return (
        <footer className="bg-bg-muted text-gray-800 py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start">
                
                {/* Logo */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <div className="logo font-logo text-2xl mb-2">
                        <Link to="/" className="hover:text-bg-highlight">Holidaze</Link>
                    </div>
                    <p className="text-xs">© {new Date().getFullYear()} Holidaze.</p>
                </div>

                {/* Navigation Links */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-center">
                        <li><Link to="/" className="hover:text-bg-highlight">Home</Link></li>
                        <li><Link to="/venues" className="hover:text-bg-highlight">Venues</Link></li>
                        <li><Link to="/login" className="hover:text-bg-highlight">Login</Link></li>
                        <li><Link to="/register" className="hover:text-bg-highlight">Register</Link></li>
                    </ul>
                </div>

                {/* Social Media Icons */}
                <div className="mb-6 md:mb-0 text-center">
                    <h3 className="text-lg mb-2">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl justify-center">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bg-highlight">
                            <CiInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-bg-highlight">
                            <CiFacebook />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-bg-highlight">
                            <CiLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-300 my-6 mx-auto max-w-7xl px-6"></div>

            {/* Copyright & Acknowledgement */}
            <div className="text-center px-6 mb-2">
                <p className="text-sm">
                    <strong>Acknowledgement:</strong> This website is not real and does not represent a real company. 
                    The website and its content is created as a project exam delivery.
                </p>
            </div>
        </footer>
    );
}