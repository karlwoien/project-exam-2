import useProfile from '../hooks/useProfile';
import useAuthStore from '../store/authStore';
import ProfileBookings from '../components/Profile/ProfileBookings';
import ProfileVenues from '../components/Profile/ProfileVenues';
import ProfileCard from '../components/Profile/ProfileCard';
import { useSEO } from '../hooks/useSEO';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Profile page where users can view their profile details, bookings, or managed venues.
 * Redirects to the home page if the user is not logged in.
 *
 * @returns {JSX.Element} - Rendered Profile component.
 */
export default function Profile() {
  const { user } = useAuthStore();
  const { profile, venues, bookings, isLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useSEO('Your Profile', 'Manage bookings, venues or update your profile.');

  if (isLoading || !profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <ProfileCard profile={profile} />

      {user && user.venueManager && venues ? (
        <ProfileVenues venues={venues} />
      ) : user && bookings ? (
        <ProfileBookings bookings={bookings} />
      ) : null}
    </div>
  );
}
