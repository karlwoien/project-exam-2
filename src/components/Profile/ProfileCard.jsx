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
        <div className=" rounded-t-lg relative mb-5">
            {/* Banner */}
            <div className="w-full h-40 md:h-60 rounded-t-lg overflow-hidden">
                {user.banner?.url ? (
                    <img
                        src={user.banner.url}
                        alt={user.banner.alt || "Profile banner"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-bg-primary to-bg-highlight"></div>
                )}
            </div>

            {/* Flex container for profilbilde + info */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mt-[-50px] md:mt-[-40px] px-4">
                
                {/* Venstre kolonne - Profilbilde og Rediger-knapp */}
                <div className="flex flex-col items-center">
                    {/* Profilbilde Overlapper banner */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img
                            src={user.avatar?.url || "https://via.placeholder.com/150"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Rediger Profil-knapp */}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-bg-primary text-white rounded-full hover:bg-bg-highlight transition"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Høyre kolonne - Brukerinformasjon */}
                <div className="text-center md:text-left flex-col md:pt-12">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <span className={`inline-block mt-2 px-2 py-1.5 text-sm rounded-md  ${user.venueManager ? "bg-gray-200 text-gray-800" : "bg-gray-200 text-gray-800"}`}>
                        {user.venueManager ? "Venue Manager" : "Traveler"}
                    </span>

                    {/* Bio hvis bruker har */}
                    {user.bio && <p className="mt-2">{user.bio}</p>}
                </div>
            </div>

            {/* Modal for redigering */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {/* Lukkeknapp */}
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
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