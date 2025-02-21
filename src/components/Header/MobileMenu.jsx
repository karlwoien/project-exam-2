import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { logoutUser } from '../../utils/authUtils';

/**
 * MobileMenu component for navigation on smaller screens.
 * @param {Object} props - Component props.
 * @param {Object|null} props.user - Authenticated user data.
 * @param {boolean} props.menuOpen - Whether the menu is open.
 * @param {Function} props.setMenuOpen - Function to toggle menu state.
 * @returns {JSX.Element} - Rendered MobileMenu component.
 */
export default function MobileMenu({ user, menuOpen, setMenuOpen }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-50 transition-transform md:hidden ${
        menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 text-black shadow-lg">
        <button onClick={() => setMenuOpen(false)} className="absolute right-4 top-4 text-2xl">
          <MdClose />
        </button>

        <nav className="mt-10 flex flex-col space-y-4 text-lg">
          <Link to="/" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/venues" className="hover:text-bg-highlight" onClick={() => setMenuOpen(false)}>
            Venues
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-bg-highlight"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              {user.venueManager && (
                <Link
                  to="/venues/new"
                  className="hover:text-bg-highlight"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Venue
                </Link>
              )}
              <div className="border-t border-gray-300"></div>
              <button
                onClick={() => {
                  logoutUser(navigate);
                  setMenuOpen(false);
                }}
                className="rounded-full py-2 text-left text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-bg-highlight"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-bg-highlight"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
