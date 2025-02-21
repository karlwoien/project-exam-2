import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVenue } from '../api';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

/**
 * Custom hook for handling venue actions such as deleting a venue.
 * @param {string} venueId - The ID of the venue to be deleted.
 * @returns {Object} - A function to delete the venue and a boolean indicating if deletion is in progress.
 */
export default function useVenueActions(venueId) {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;

    setIsDeleting(true);
    try {
      await deleteVenue(venueId, token);
      toast.success('Venue deleted successfully!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => navigate('/profile'),
      });
    } catch (error) {
      toast.error('Failed to delete venue. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}
