import { useState } from "react";
import useAuthStore from "../../store/authStore";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCard() {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return <p className="text-center text-red-500">No user data found.</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            {/* Profilbilde */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-bg-highlight">
                <img
                    src={user.avatar?.url || "https://via.placeholder.com/150"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Brukerinformasjon */}
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className={`mt-2 px-3 py-1 text-sm rounded-md ${user.venueManager ? "bg-bg-primary text-white" : "bg-gray-200 text-gray-800"}`}>
                {user.venueManager ? "Venue Manager" : "Traveler"}
            </span>
            <p>{user.bio}</p>

            {/* Rediger Profil-knapp */}
            <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-bg-primary text-white rounded-md hover:bg-bg-highlight transition"
            >
                Edit Profile
            </button>

            {/* Modal for redigering */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {/* Lukkeknapp */}
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✖
                        </button>
                        {/* Redigeringsskjema */}
                        <ProfileEditForm profile={user} onClose={() => setIsEditing(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}