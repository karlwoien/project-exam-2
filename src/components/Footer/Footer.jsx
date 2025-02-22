import { Link } from 'react-router-dom';
import { CiInstagram, CiFacebook, CiLinkedin } from 'react-icons/ci';

/**
 * Footer component containing site links, social media links, and acknowledgements.
 * @returns {JSX.Element} - Rendered Footer component.
 */
export default function Footer() {
  return (
    <footer className="bg-bg-muted py-10 text-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 md:flex-row md:items-start">
        <div className="mb-6 text-center md:mb-0 md:text-left">
          <div className="logo mb-2 font-logo text-2xl">
            <Link to="/" className="hover:text-bg-highlight">
              Holidaze
            </Link>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Holidaze.</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="mb-2 text-lg">Quick Links</h3>
          <ul className="space-y-1 text-center">
            <li>
              <Link to="/" className="hover:text-bg-highlight">
                Home
              </Link>
            </li>
            <li>
              <Link to="/venues" className="hover:text-bg-highlight">
                Venues
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-bg-highlight">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-bg-highlight">
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-6 text-center md:mb-0">
          <h3 className="mb-2 text-lg">Follow Us</h3>
          <div className="flex justify-center space-x-4 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bg-highlight"
              aria-label="Visit our Instagram profile"
            >
              <CiInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bg-highlight"
              aria-label="Visit our Facebook profile"
            >
              <CiFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bg-highlight"
              aria-label="Visit our LinkedIn profile"
            >
              <CiLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto my-6 max-w-7xl border-t border-gray-300 px-6"></div>
      <div className="mb-2 px-6 text-center">
        <p className="text-sm">
          <strong>Acknowledgement:</strong> This website is not real and does not represent a real
          company. The website and its content is created as a project exam delivery.
        </p>
      </div>
    </footer>
  );
}
