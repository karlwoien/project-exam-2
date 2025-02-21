import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { fetchUserProfile, fetchUserVenues, fetchUserBookings } from '../api';

/**
 * Custom hook for fetching and managing user profile data.
 * Redirects to login if no user is found.
 * @returns {Object} - User profile, venues (if venue manager), bookings (if traveler), and error state.
 */
export default function useProfile() {
  const { user, token } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function fetchProfileData() {
      try {
        const profileResponse = await fetchUserProfile(user.name, token);
        setProfile(profileResponse.data);

        if (user.venueManager) {
          const venuesResponse = await fetchUserVenues(user.name, token);
          setVenues(venuesResponse.data);
        } else {
          const bookingsResponse = await fetchUserBookings(user.name, token);
          setBookings(bookingsResponse.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProfileData();
  }, [user, token, navigate]);

  return { profile, venues, bookings, error };
}
