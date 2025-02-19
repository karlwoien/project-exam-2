import React from "react";
import LinkButton from "../components/Button/LinkButton";
import { CiGlobe, CiCalendar, CiAirportSign1 } from "react-icons/ci";
import LookaheadSearch from "../components/SearchVenues/LookaheadSearch";
import { useTitle } from "../hooks/useTitle";

export default function Home() {
  useTitle("Home")
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-black bg-cover bg-center flex justify-center pt-40">
        {/* Bakgrunnsbilde + Overlay */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center z-0" 
            style={{ backgroundImage: "url('/src/assets/hero-image.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
        {/* Content */}
        <div className="max-w-4xl mx-auto px-3 text-center text-white z-10">
          <h1 className="text-6xl font-hero mb-5">YOUR NEXT HOLIDAY AWAITS</h1>
          <p className="mb-5">Choose from a wide selection of verified venues, plan your stay with confidence, and enjoy a seamless booking experience - only with Holidaze.</p>
          <LinkButton to="/venues" label="Explore venues" variant="accent" className="mb-12"/>
          {/*Lookahead search*/}
          <div className="max-w-5xl mx-auto px-6">
            <LookaheadSearch />
          </div>
        </div>
      </section>
      {/* How Holidaze works Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-40">
        <h2 className="text-4xl text-bg-highlight mb-2.5">
          HOW HOLIDAZE WORKS
        </h2>
        <p className="mb-7">Planning your perfect getaway is simple with Holidaze. Follow these three easy steps to start your adventure.</p>
          {/* Feature 1 */}
          <div className="flex items-start mb-2.5">
            <CiGlobe className="text-4xl text-bg-highlight mr-5" />
            <div>
              <h3 className="text-lg">Explore amazing venues</h3>
              <p>Browse through our collection of unique and verified venues, tailored to your needs.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-start mb-2.5">
            <CiCalendar className="text-4xl text-bg-highlight mr-5" />
            <div>
              <h3 className="text-lg">Book with ease</h3>
              <p>Select your dates, check availability, and complete your booking in a few clicks.</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-start mb-8">
            <CiAirportSign1 className="text-4xl text-bg-highlight mr-5" />
            <div>
              <h3 className="text-lg">Enjoy your stay</h3>
              <p>Relax and create unforgettable memories while we handle the details.</p>
            </div>
          </div>
        {/* CTA Button */}
        <LinkButton to="/venues" label="Start exploring" variant="primary"/>
      </section>
      {/* Get started Section */}
      <section className="w-full bg-bg-accent pt-20 pb-40">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl text-bg-primary mb-2.5">GET STARTED</h2>
          <p className="mb-5">Register to unlock all features: book unique stays, list or manage your venues. Holidaze makes it easy for both travelers and venue managers.</p>
          <h3 className="text-lg">Travelers:</h3>
          <p className="mb-4">Find and book your dream venue hassle-free.</p>
          <h3 className="text-lg">Venue Managers:</h3>
          <p className="mb-5">Easily create, update, and manage your venues and bookings.</p>
          <LinkButton to="/register" label="Register now" variant="primary" />
        </div>
      </section>
    </>
  );
};