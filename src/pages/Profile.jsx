import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { fetchUserProfile, fetchUserVenues, fetchUserBookings } from "../api/apiClient";
import ProfileBookings from "../components/Profile/ProfileBookings";
import ProfileVenues from "../components/Profile/ProfileVenues";
import ProfileCard from "../components/Profile/ProfileCard";

export default function Profile() {
    const { user, token, logout } = useAuthStore();
    const [profile, setProfile] = useState(null);
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/login")
        };
        
        async function fetchProfileData() {
            try {
                const profileData = await fetchUserProfile(user.name, token);
                setProfile(profileData.data);

                if (user.venueManager) {
                    const userVenues = await fetchUserVenues(user.name, token);
                    setVenues(userVenues.data);
                } else {
                    const userBookings = await fetchUserBookings(user.name, token);
                    setBookings(userBookings.data);
                }
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProfileData();
    }, [user, token]);

    if (!user) return <p className="text-center text-red-500">You must be logged in to view this page.</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            {/* Profile Info */}
            {profile && <ProfileCard profile={profile} />}

            {/* Conditional Display */}
            {user.venueManager ? (
                <ProfileVenues venues={venues} />
            ) : (
                <ProfileBookings bookings={bookings} />
            )}

            {/* Logout Button */}
            <button onClick={logout} className="w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                Logout
            </button>
        </div>
    );
}