import React from "react";
import LinkButton from "../components/LinkButton";
import { CiGlobe, CiCalendar, CiAirportSign1 } from "react-icons/ci";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-cover bg-center pt-16" style={{backgroundImage: "url('/src/assets/hero-image.jpg')", height: "1096px"}}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 -z-10"></div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-3 py-20 text-center text-white">
          <h1 className="text-6xl font-hero mb-5">YOUR NEXT HOLIDAY AWAITS</h1>
          <p className="mb-10">Choose from a wide selection of verified venues, plan your stay with confidence, and enjoy a seamless booking experience - only with Holidaze.</p>
          <LinkButton to="/venues" label="Explore venues" variant="accent" className="mb-8"/>
        </div>

        {/* Search functionality component goes here when ready*/}
        
      </section>

      {/* How Holidaze works Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
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
      <section className="w-full bg-bg-accent py-16">
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