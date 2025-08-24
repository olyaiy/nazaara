import { Event } from "@/content/events";

interface VenueFeaturesProps {
  event: Event;
}

export default function VenueFeatures({ event }: VenueFeaturesProps) {
  // Define venue-specific features based on common venue types
  const getVenueFeatures = (venue: string, city: string) => {
    const venueKey = venue.toLowerCase();
    
    if (venueKey.includes('fortune sound club')) {
      return {
        capacity: "500",
        soundSystem: "Pioneer DJM & CDJ Setup",
        atmosphere: "Intimate Underground",
        features: ["State-of-the-art sound system", "LED wall displays", "VIP bottle service", "Premium bar selection"]
      };
    } else if (venueKey.includes('icon')) {
      return {
        capacity: "800",
        soundSystem: "Premium Audio Experience", 
        atmosphere: "High-Energy Dance Floor",
        features: ["Multi-level venue", "Professional lighting", "Full bar service", "Photo opportunities"]
      };
    } else if (venueKey.includes('evol')) {
      return {
        capacity: "600",
        soundSystem: "Club-Grade Audio System",
        atmosphere: "NYC Underground Vibe",
        features: ["Industrial design", "Premium cocktail bar", "Professional sound", "Late-night energy"]
      };
    } else if (venueKey.includes('lvl three')) {
      return {
        capacity: "400", 
        soundSystem: "High-End Audio Setup",
        atmosphere: "Elevated Experience",
        features: ["Rooftop views", "Craft cocktails", "Premium atmosphere", "Sophisticated crowd"]
      };
    } else if (venueKey.includes('miss ginko')) {
      return {
        capacity: "200",
        soundSystem: "Boutique Audio Experience",
        atmosphere: "Exclusive & Intimate", 
        features: ["Curated ambiance", "Signature cocktails", "Artistic interior", "Select crowd"]
      };
    }
    
    // Default features for unknown venues
    return {
      capacity: "TBA",
      soundSystem: "Professional Audio Setup",
      atmosphere: "Premium Experience",
      features: ["Professional sound system", "Full bar service", "Premium atmosphere", "Memorable experience"]
    };
  };

  const venueInfo = getVenueFeatures(event.venue, event.city);

  return (
    <section className="relative bg-gradient-to-b from-[var(--maroon-red)] to-[var(--dark-green)] py-20 lg:py-32">
      <div className="px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20 lg:mb-28">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-[var(--gold)]/30" />
              <p className="text-[10px] font-neue-haas uppercase tracking-[0.6em] text-[var(--gold)]/60">
                Venue Experience
              </p>
              <div className="h-[1px] w-16 bg-[var(--gold)]/30" />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-6">
              {event.venue}
            </h2>
            <p className="text-lg font-neue-haas text-[var(--white)]/60 max-w-2xl mx-auto">
              {event.city}, {event.country} • {venueInfo.atmosphere}
            </p>
          </div>

          {/* Venue Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20 lg:mb-28">
            {/* Capacity */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 border border-[var(--gold)]/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[var(--gold)]/10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[var(--gold)] opacity-60" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-prettywise text-[var(--gold)] mb-3">
                {venueInfo.capacity}
              </h3>
              <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">
                Capacity
              </p>
            </div>

            {/* Sound System */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--turquoise)]/20 to-[var(--turquoise)]/5 border border-[var(--turquoise)]/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[var(--turquoise)]/10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[var(--turquoise)] opacity-60" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg lg:text-xl font-prettywise text-[var(--white)] mb-3 leading-tight">
                {venueInfo.soundSystem}
              </h3>
              <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">
                Audio Experience
              </p>
            </div>

            {/* Price Range */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--white)]/20 to-[var(--white)]/5 border border-[var(--white)]/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[var(--white)]/10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[var(--white)] opacity-60" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-prettywise text-[var(--white)] mb-3">
                ${event.price}+
              </h3>
              <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">
                Starting Price
              </p>
            </div>
          </div>

          {/* Venue Features */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-prettywise text-[var(--white)] mb-4">
                What to Expect
              </h3>
              <p className="text-sm font-neue-haas text-[var(--white)]/50 uppercase tracking-[0.3em]">
                Premium Experience Features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {venueInfo.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-2 h-2 bg-[var(--gold)] opacity-60" />
                  </div>
                  <div>
                    <p className="text-base lg:text-lg font-neue-haas text-[var(--white)] leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Description */}
            {event.description && (
              <div className="mt-16 lg:mt-20 text-center max-w-3xl mx-auto">
                <div className="p-8 lg:p-12 border border-[var(--gold)]/10 bg-gradient-to-br from-[var(--gold)]/5 to-transparent">
                  <p className="text-base lg:text-lg font-neue-haas text-[var(--white)]/80 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            )}

            {/* Action Section */}
            <div className="mt-16 lg:mt-20 text-center">
              <div className="space-y-6">
                <button className="px-12 py-4 bg-[var(--gold)] text-[var(--maroon-red)] font-neue-haas text-[11px] uppercase tracking-[0.5em] font-medium">
                  Get Tickets
                </button>
                <div className="flex items-center justify-center gap-8 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/30">
                  <span>Limited Availability</span>
                  <span className="w-1 h-1 bg-[var(--gold)]/30 rounded-full" />
                  <span>Premium Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
