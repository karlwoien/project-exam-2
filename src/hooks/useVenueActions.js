import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVenue } from '../api';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

export default function useVenueActions(venueId) {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this venue?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteVenue(venueId, token);
      toast.success('Venue deleted successfully!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => navigate('/profile'),
      });
    } catch (error) {
      console.error('Error deleting venue:', error.message);
      alert('Failed to delete venue.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}
