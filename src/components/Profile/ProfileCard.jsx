import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import ProfileEditForm from './ProfileEditForm';

/**
 * Displays user profile information with an editable profile modal.
 * @returns {JSX.Element} - Rendered ProfileCard component.
 */
export default function ProfileCard() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <p className="text-center text-red-500">No user data found.</p>;
  }

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  return (
    <div className="relative mb-5 rounded-t-lg">
      <div className="h-40 w-full overflow-hidden rounded-t-lg md:h-60">
        {user.banner?.url ? (
          <img
            src={user.banner.url}
            alt={user.banner.alt || 'Profile banner'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-bg-primary to-bg-highlight"></div>
        )}
      </div>

      <div className="mt-[-50px] flex flex-col items-center space-y-4 px-4 md:mt-[-40px] md:flex-row md:items-start md:space-x-6 md:space-y-0">
        <div className="flex flex-col items-center">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img
              src={user.avatar?.url || 'https://via.placeholder.com/150'}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            onClick={openEditModal}
            className="mt-4 rounded-full bg-bg-primary px-4 py-2 text-white transition hover:bg-bg-highlight"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex-col text-center md:pt-12 md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="mt-2 inline-block rounded-md bg-gray-200 px-2 py-1.5 text-sm text-gray-800">
            {user.venueManager ? 'Venue Manager' : 'Traveler'}
          </span>

          {user.bio && <p className="mt-2">{user.bio}</p>}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={closeEditModal}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            <ProfileEditForm profile={user} onClose={closeEditModal} />
          </div>
        </div>
      )}
    </div>
  );
}
