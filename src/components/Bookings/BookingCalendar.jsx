import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createBooking } from '../../api/bookings';
import useAuthStore from '../../store/authStore';
import { toast } from 'react-toastify';

/**
 * BookingCalendar component for selecting dates and making a reservation.
 * @param {Object} props - Component props.
 * @param {Array} props.bookings - List of existing bookings.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 * @param {string} props.venueId - The venue ID.
 * @returns {JSX.Element} - Rendered BookingCalendar component.
 */
export default function BookingCalendar({ bookings, maxGuests, venueId }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const { user, token } = useAuthStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Generates a list of booked dates based on existing bookings.
   * @returns {Date[]} - Array of booked dates.
   */
  const bookedDates = bookings.reduce((dates, booking) => {
    let current = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  /**
   * Validates booking details before submission.
   * @returns {string|null} - Error message if validation fails, otherwise null.
   */
  const validateBooking = () => {
    if (!user) return 'You must be logged in to book a venue.';
    if (!startDate || !endDate) return 'Please select a valid check-in and check-out date.';
    if (guests < 1 || guests > maxGuests) return `Guest count must be between 1 and ${maxGuests}.`;
    return null;
  };

  /**
   * Handles the booking submission, validating input and sending the request.
   */
  const handleBooking = useCallback(async () => {
    const validationError = validateBooking();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createBooking({ dateFrom: startDate, dateTo: endDate, guests, venueId, token });
      toast.success('Reservation successful!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => navigate('/profile'),
      });
      setDateRange([null, null]);
      setGuests(1);
      setError(null);
    } catch {
      setError('Error creating booking. Please try again.');
    }
  }, [startDate, endDate, guests, venueId, token, navigate]);

  return (
    <div className="w-full max-w-[350px]">
      <h3 className="mb-1 text-2xl">Reserve your stay</h3>
      <h4 className="mb-1 text-lg">Select dates</h4>

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
        highlightDates={[{ 'booked-dates': bookedDates }]}
      />

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <label className="text-lg font-normal">How many guests?</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            min="1"
            max={maxGuests}
            className="w-1/2 rounded-lg border p-2 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bg-highlight"
          />
        </div>
      </div>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {user?.venueManager && (
        <p className="mt-4 text-sm text-red-500">Please use a Traveler account to reserve.</p>
      )}

      {user ? (
        !user.venueManager ? (
          <button
            onClick={handleBooking}
            className="mt-5 w-full rounded-full bg-bg-primary px-4 py-2 text-white hover:bg-bg-highlight"
          >
            Reserve
          </button>
        ) : null
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="mt-5 w-full rounded-full bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
        >
          Login to reserve
        </button>
      )}
    </div>
  );
}
