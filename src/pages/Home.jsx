import LinkButton from '../components/Button/LinkButton';
import { CiGlobe, CiCalendar, CiAirportSign1 } from 'react-icons/ci';
import LookaheadSearch from '../components/SearchVenues/LookaheadSearch';
import { useSEO } from '../hooks/useSEO';

/**
 * Home page component for Holidaze.
 * Displays the hero section, search functionality, an explanation of how the platform works,
 * and call-to-actions for both travelers and venue managers.
 *
 * @returns {JSX.Element} - Rendered Home page.
 */
export default function Home() {
  useSEO('Home', 'Find and book unique venues for your next holiday.');

  return (
    <>
      <section className="relative flex min-h-screen w-full justify-center bg-black bg-cover bg-center pt-32">
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-bg-primary opacity-10"></div>
        </div>

        <div className="z-10 mx-auto max-w-4xl px-3 text-center text-white">
          <h1 className="mb-5 font-hero text-4xl sm:text-5xl md:text-6xl">YOUR NEXT HOLIDAY AWAITS</h1>
          <p className="mb-5 text-base sm:text-lg">
            Choose from a wide selection of verified venues, plan your stay with confidence, and
            enjoy a seamless booking experience - only with Holidaze.
          </p>
          <LinkButton to="/venues" label="Explore venues" variant="accent" className="mb-12" />

          <div className="mx-auto max-w-5xl px-6">
            <LookaheadSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-40 pt-20">
        <h2 className="mb-2.5 text-4xl text-bg-highlight">HOW HOLIDAZE WORKS</h2>
        <p className="mb-7">
          Planning your perfect getaway is simple with Holidaze. Follow these three easy steps to
          start your adventure.
        </p>
        <div className="mb-2.5 flex items-start">
          <CiGlobe className="mr-5 text-4xl text-bg-highlight" />
          <div>
            <h3 className="text-lg">Explore amazing venues</h3>
            <p>
              Browse through our collection of unique and verified venues, tailored to your needs.
            </p>
          </div>
        </div>
        <div className="mb-2.5 flex items-start">
          <CiCalendar className="mr-5 text-4xl text-bg-highlight" />
          <div>
            <h3 className="text-lg">Book with ease</h3>
            <p>Select your dates, check availability, and complete your booking in a few clicks.</p>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <CiAirportSign1 className="mr-5 text-4xl text-bg-highlight" />
          <div>
            <h3 className="text-lg">Enjoy your stay</h3>
            <p>Relax and create unforgettable memories while we handle the details.</p>
          </div>
        </div>
        <LinkButton to="/venues" label="Start exploring" variant="primary" />
      </section>

      <section className="w-full bg-bg-accent pb-40 pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-2.5 text-4xl text-bg-primary">GET STARTED</h2>
          <p className="mb-5">
            Register to unlock all features: book unique stays, list or manage your venues. Holidaze
            makes it easy for both travelers and venue managers.
          </p>
          <h3 className="text-lg">Travelers:</h3>
          <p className="mb-4">Find and book your dream venue hassle-free.</p>
          <h3 className="text-lg">Venue Managers:</h3>
          <p className="mb-5">Easily create, update, and manage your venues and bookings.</p>
          <LinkButton to="/register" label="Register now" variant="primary" />
        </div>
      </section>
    </>
  );
}
