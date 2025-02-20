import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import ProfileEditForm from './ProfileEditForm';

export default function ProfileCard() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <p className="text-center text-red-500">No user data found.</p>;
  }

  return (
    <div className="relative mb-5 rounded-t-lg">
      {/* Banner */}
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

      {/* Flex container for profilbilde + info */}
      <div className="mt-[-50px] flex flex-col items-center space-y-4 px-4 md:mt-[-40px] md:flex-row md:items-start md:space-x-6 md:space-y-0">
        {/* Venstre kolonne - Profilbilde og Rediger-knapp */}
        <div className="flex flex-col items-center">
          {/* Profilbilde Overlapper banner */}
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img
              src={user.avatar?.url || 'https://via.placeholder.com/150'}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Rediger Profil-knapp */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 rounded-full bg-bg-primary px-4 py-2 text-white transition hover:bg-bg-highlight"
          >
            Edit Profile
          </button>
        </div>

        {/* Høyre kolonne - Brukerinformasjon */}
        <div className="flex-col text-center md:pt-12 md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span
            className={`mt-2 inline-block rounded-md px-2 py-1.5 text-sm ${user.venueManager ? 'bg-gray-200 text-gray-800' : 'bg-gray-200 text-gray-800'}`}
          >
            {user.venueManager ? 'Venue Manager' : 'Traveler'}
          </span>

          {/* Bio hvis bruker har */}
          {user.bio && <p className="mt-2">{user.bio}</p>}
        </div>
      </div>

      {/* Modal for redigering */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
            {/* Lukkeknapp */}
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            {/* Redigeringsskjema */}
            <ProfileEditForm profile={user} onClose={() => setIsEditing(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
