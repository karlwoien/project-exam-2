import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchVenue } from '../api';
import VenueForm from '../components/Venue/VenueForm';
import { useSEO } from '../hooks/useSEO';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

/**
 * Page for editing an existing venue.
 * Fetches venue data based on the venue ID from the URL params.
 *
 * @returns {JSX.Element} - Rendered EditVenue page.
 */
export default function EditVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetchVenue(id).then((response) => setVenue(response.data));
  }, [id]);

  useSEO('Edit venue', 'Update your venue details, photos, and availability on Holidaze. Keep your listing fresh and attract more bookings.');

  return (
    <div className="mx-auto max-w-5xl">
      {venue ? <VenueForm venue={venue} /> : <LoadingSpinner />}
    </div>
  );
}
