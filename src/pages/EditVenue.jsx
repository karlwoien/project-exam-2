import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchVenue } from '../api';
import VenueForm from '../components/Venue/VenueForm';
import { useTitle } from '../hooks/useTitle';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

export default function EditVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetchVenue(id).then((response) => setVenue(response.data));
  }, [id]);

  useTitle('Edit venue');

  return (
    <div className="mx-auto max-w-5xl">
      {venue ? <VenueForm venue={venue} /> : <LoadingSpinner />}
    </div>
  );
}
