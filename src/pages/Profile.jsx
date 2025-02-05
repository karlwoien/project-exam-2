import useProfile from "../hooks/useProfile";
import useAuthStore from "../store/authStore";
import ProfileBookings from "../components/Profile/ProfileBookings";
import ProfileVenues from "../components/Profile/ProfileVenues";
import ProfileCard from "../components/Profile/ProfileCard";

export default function Profile() {
    const { logout, user } = useAuthStore();
    const { profile, venues, bookings, error } = useProfile();

    if (!user) return <p className="text-center text-red-500">You must be logged in to view this page.</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            {/* Profile Info */}
            {profile && <ProfileCard profile={profile} />}

            {/* Conditional Display */}
            {user.venueManager ? <ProfileVenues venues={venues} /> : <ProfileBookings bookings={bookings} />}

            {/* Logout Button */}
            <button onClick={logout} className="w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                Logout
            </button>
        </div>
    );
}