import useProfile from "../hooks/useProfile";
import useAuthStore from "../store/authStore";
import ProfileBookings from "../components/Profile/ProfileBookings";
import ProfileVenues from "../components/Profile/ProfileVenues";
import ProfileCard from "../components/Profile/ProfileCard";
import { useTitle } from "../hooks/useTitle";

export default function Profile() {
    const { logout, user } = useAuthStore();
    const { profile, venues, bookings, error } = useProfile();

    if (!user) return <p className="text-center text-red-500">You must be logged in to view this page.</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    useTitle(user ? user.name : "Loading...");

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile Info */}
            {profile && <ProfileCard profile={profile} />}

            {/* Conditional Display */}
            {user.venueManager ? <ProfileVenues venues={venues} /> : <ProfileBookings bookings={bookings} />}
        </div>
    );
}