import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { logoutUser } from '../../utils/authUtils';

/**
 * ProfileDropdown component for user account actions.
 * @param {Object} props - Component props.
 * @param {Object} props.user - User data.
 * @param {boolean} props.dropdownOpen - Whether dropdown is open.
 * @param {Function} props.setDropdownOpen - Function to toggle dropdown state.
 * @returns {JSX.Element} - Rendered ProfileDropdown component.
 */
export default function ProfileDropdown({ user, dropdownOpen, setDropdownOpen }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 rounded-md bg-transparent py-2 transition-transform duration-300 hover:scale-105 hover:text-bg-highlight"
      >
        <p>Profile</p>
        <img src={user.avatar?.url || 'https://via.placeholder.com/40'} alt="Profile" className="h-8 w-8 rounded-full border border-white" />
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border bg-white text-black shadow-lg transition-transform origin-top ${
          dropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
          View Profile
        </Link>

        {user.venueManager && (
          <Link to="/venues/new" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
            Add Venue
          </Link>
        )}
        <div className="border-t border-gray-300"></div>
        <button
          onClick={() => {
            logoutUser(navigate);
            setDropdownOpen(false);
          }}
          className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
