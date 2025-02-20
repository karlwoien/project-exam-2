import VenueForm from '../components/Venue/VenueForm';
import useAuthStore from '../store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

export default function AddVenue() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.venueManager) {
      navigate('/'); // Redirect hvis ikke Venue Manager
    }
  }, [user, navigate]);

  useTitle('Add venue');

  return (
    <div className="mx-auto max-w-5xl">
      <VenueForm />
    </div>
  );
}
