import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../../api/bookings";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";

export default function BookingCalendar({ bookings, maxGuests, venueId }) {
    const [dateRange, setDateRange] = useState([null, null]); // Start og sluttdato
    const [startDate, endDate] = dateRange;
    const [guests, setGuests] = useState(1);
    const { user, token } = useAuthStore();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Finn bookede datoer for å deaktivere dem i kalenderen
    const bookedDates = bookings.flatMap((booking) => {
        const start = new Date(booking.dateFrom);
        const end = new Date(booking.dateTo);
        const dates = [];
        while (start <= end) {
            dates.push(new Date(start));
            start.setDate(start.getDate() + 1);
        }
        return dates;
    });

    // Håndter innsending av booking
    async function handleBooking() {
        if (!user) {
            setError("You must be logged in to book a venue.");
            return;
        }
        if (!startDate || !endDate) {
            setError("Please select a valid check-in and check-out date.");
            return;
        }
        if (guests < 1 || guests > maxGuests) {
            setError(`Guest count must be between 1 and ${maxGuests}.`);
            return;
        }

        try {
            await createBooking({ dateFrom: startDate, dateTo: endDate, guests, venueId, token });
            toast.success("Reservation successful!", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate("/profile"),
            });
            setDateRange([null, null]);
            setGuests(1);
        } catch (err) {
            setError("Error creating booking. Please try again.");
        }
    }

    return (
        <div className="w-full max-w-[350px]">
            <h3 className="text-2xl mb-1">Reserve your stay</h3>
            <h4 className="text-lg mb-1">Select dates</h4>

            {/* Inline DatePicker */}
            <DatePicker
                selected={startDate}
                onChange={(update) => setDateRange(update)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                excludeDates={bookedDates}
                minDate={new Date()}
                calendarStartDay={1}
                highlightDates={[{ "booked-dates": bookedDates }]}
            />

            {/* Guest Selection */}
            <div className="mt-3">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-normal">How many guests?</label>
                    <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        min="1"
                        max={maxGuests}
                        className="border p-2 rounded-lg w-1/2 text-center focus:outline-none focus:ring-2 focus:ring-bg-highlight focus:border-transparent"
                    />
                </div>
            </div>

            {/* Error / Success Messages */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Hindre Venue Manager fra å booke */}
            {user?.venueManager && (
                <p className="mt-4 text-red-500 text-sm">
                    Please use a Traveler account to reserve.
                </p>
            )}

            {/* Conditional Buttons */}
            {user ? (
                !user.venueManager ? (
                    <button
                        onClick={handleBooking}
                        className="mt-5 bg-bg-primary text-white py-2 px-4 rounded-full w-full hover:bg-bg-highlight"
                    >
                        Reserve
                    </button>
                ) : null
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="mt-5 bg-gray-400 text-white py-2 px-4 rounded-full w-full hover:bg-gray-500"
                >
                Login to reserve
                </button>
            )}
        </div>
    );
}