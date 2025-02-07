import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../../api/bookings";
import useAuthStore from "../../store/authStore";

export default function BookingCalendar({ bookings, maxGuests, venueId }) {
    const [dateRange, setDateRange] = useState([null, null]); // Start og sluttdato
    const [startDate, endDate] = dateRange;
    const [guests, setGuests] = useState(1);
    const { user, token } = useAuthStore();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            const response = await createBooking({ dateFrom: startDate, dateTo: endDate, guests, venueId, token });
            setSuccess("Booking successful!");
            setDateRange([null, null]);
            setGuests(1);
        } catch (err) {
            setError("Error creating booking.");
        }
    }

    return (
        <div className="p-5 bg-white rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Select your dates</h3>

            {/* 📅 Inline DatePicker */}
            <DatePicker
                selected={startDate}
                onChange={(update) => setDateRange(update)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                excludeDates={bookedDates}
                minDate={new Date()}
                className="border p-2 rounded w-full"
            />

            {/* Guest Selection */}
            <div className="mt-3">
                <label className="block font-medium">Guests</label>
                <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    min="1"
                    max={maxGuests}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Error / Success Messages */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            {/* Submit Button */}
            <button
                onClick={handleBooking}
                className="mt-5 bg-bg-primary text-white py-2 px-4 rounded-full w-full hover:bg-bg-highlight"
            >
                Reserve
            </button>
        </div>
    );
}
