import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import useAuthStore from '../../store/authStore';
import { logoutUser } from '../../utils/authUtils';
import ProfileDropdown from './ProfileDropdown';
import MobileMenu from './MobileMenu';
import LinkButton from '../Button/LinkButton';

/**
 * Header component containing navigation, profile dropdown, and mobile menu.
 * @returns {JSX.Element} - Rendered Header component.
 */
export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${
        isHome ? 'fixed' : 'sticky'
      } left-0 top-0 z-50 w-full transition-all duration-300 ${
        isHome && !scrolled ? 'bg-transparent text-white' : 'bg-bg-primary text-white'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <Link to="/" className="logo font-logo text-4xl">
          Holidaze
        </Link>

        <nav className="hidden items-center space-x-5 md:flex">
          <Link to="/" className="text-lg transition-transform duration-300 hover:scale-105 hover:text-bg-highlight">
            Home
          </Link>
          <Link to="/venues" className="text-lg transition-transform duration-300 hover:scale-105 hover:text-bg-highlight">
            Venues
          </Link>

          {user ? (
            <ProfileDropdown
              user={user}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              logoutUser={logoutUser}
            />
          ) : (
            <div className="space-x-5">
              <LinkButton to="/login" label="Login" variant="muted" />
              <LinkButton to="/register" label="Register" variant="highlight" />
            </div>
          )}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl md:hidden">
          <MdMenu />
        </button>
      </div>

      <MobileMenu user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} logoutUser={logoutUser} />
    </header>
  );
}
