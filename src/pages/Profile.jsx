import useProfile from "../hooks/useProfile";
import useAuthStore from "../store/authStore";
import ProfileBookings from "../components/Profile/ProfileBookings";
import ProfileVenues from "../components/Profile/ProfileVenues";
import ProfileCard from "../components/Profile/ProfileCard";
import { useTitle } from "../hooks/useTitle";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

export default function Profile() {
    const { user } = useAuthStore();
    const { profile, venues, bookings, isLoading } = useProfile();

    useTitle(user ? user.name : "Loading...");

    // **Vis en loading-spinner hvis dataene ikke er lastet inn enda**
    if (isLoading || !profile) {
        return ( 
            <LoadingSpinner />
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile Info */}
            <ProfileCard profile={profile} />

            {/* Conditional Display - **Sjekk at bookings eller venues finnes før vi viser dem** */}
            {user.venueManager && venues ? (
                <ProfileVenues venues={venues} />
            ) : bookings ? (
                <ProfileBookings bookings={bookings} />
            ) : null} 
        </div>
    );
}