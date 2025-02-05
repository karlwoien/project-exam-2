import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { fetchUserProfile, fetchUserVenues, fetchUserBookings } from "../api/apiClient";

export default function useProfile() {
    const { user, token } = useAuthStore();
    const [profile, setProfile] = useState(null);
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

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
    }, [user, token, navigate]);

    return { profile, venues, bookings, error };
}