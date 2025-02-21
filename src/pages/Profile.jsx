import useProfile from '../hooks/useProfile';
import useAuthStore from '../store/authStore';
import ProfileBookings from '../components/Profile/ProfileBookings';
import ProfileVenues from '../components/Profile/ProfileVenues';
import ProfileCard from '../components/Profile/ProfileCard';
import { useTitle } from '../hooks/useTitle';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

/**
 * Profile page where users can view their profile details, bookings, or managed venues.
 * @returns {JSX.Element} - Rendered Profile component.
 */
export default function Profile() {
  const { user } = useAuthStore();
  const { profile, venues, bookings, isLoading } = useProfile();

  useTitle(user ? user.name : 'Loading...');

  if (isLoading || !profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <ProfileCard profile={profile} />

      {user.venueManager && venues ? (
        <ProfileVenues venues={venues} />
      ) : bookings ? (
        <ProfileBookings bookings={bookings} />
      ) : null}
    </div>
  );
}
