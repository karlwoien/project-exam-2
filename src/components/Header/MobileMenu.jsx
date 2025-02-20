import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

export default function MobileMenu({ user, menuOpen, setMenuOpen, logoutUser }) {
  return (
    <div
      className={`fixed left-0 top-0 z-40 h-full w-full transform bg-black bg-opacity-50 transition-transform ${
        menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } md:hidden`}
    >
      <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 text-black shadow-lg">
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="absolute right-4 top-4 text-2xl">
          <MdClose />
        </button>

        {/* Mobile Navigation */}
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
                  logoutUser();
                  setMenuOpen(false);
                }}
                className="rounded-full py-2 text-left text-red-500"
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
