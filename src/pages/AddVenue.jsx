import VenueForm from '../components/Venue/VenueForm';
import useAuthStore from '../store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

/**
 * Page for adding a new venue.
 * Only accessible to users with Venue Manager privileges.
 * Redirects unauthorized users to the home page.
 *
 * @returns {JSX.Element} - Rendered AddVenue page.
 */
export default function AddVenue() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.venueManager) {
      navigate('/');
    }
  }, [user, navigate]);

  useSEO('Add new venue', 'List your venue on Holidaze and start accepting bookings today. Create a unique listing with photos, amenities, and pricing.');

  return (
    <div className="mx-auto max-w-5xl">
      <VenueForm />
    </div>
  );
}
