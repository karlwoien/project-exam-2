import VenueCard from "../components/VenueCard";

export default function Venues() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 mt-16">
        <h1 className="text-bg-highlight text-4xl mb-5">EXPLORE VENUES</h1>
        {/*Search input and filter option goes here*/}
        <div className="flex space-x-4">
          <p>Plaholder search input</p>
          <p>Plaholder filter option</p>
        </div>
        {/*Venues grid */} 
        <div className="py-8 max-w-6xl mx-auto">
          <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-fr">
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
              <VenueCard />
          </div>
        </div>
      </div>
    );
  };