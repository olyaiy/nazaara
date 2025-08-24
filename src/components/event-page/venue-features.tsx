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
    <section className="relative bg-gradient-to-b from-[var(--maroon-red)] via-[var(--maroon-red)] to-[var(--dark-green)] py-20 lg:py-32 overflow-hidden">
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="venue-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="120" height="120" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
              <circle cx="60" cy="60" r="2" fill="var(--gold)" opacity="0.4" />
              <path d="M20 60 L60 20 L100 60 L60 100 Z" stroke="var(--gold)" strokeWidth="0.3" fill="none" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#venue-pattern)" />
        </svg>
      </div>

      <div className="relative px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Editorial Header */}
          <div className="mb-24 lg:mb-32">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-[var(--gold)]/40" />
                  <span className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/50">
                    Venue Feature
                  </span>
                </div>
                <h2 className="text-[clamp(3rem,7vw,6rem)] font-prettywise leading-[0.85] text-[var(--white)] mb-6">
                  {event.venue}
                </h2>
                <div className="flex items-baseline gap-6">
                  <p className="text-xl lg:text-2xl font-neue-haas text-[var(--white)]/70">
                    {event.city}, {event.country}
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--gold)]/30 to-transparent" />
                </div>
              </div>
              <div className="lg:col-span-4 text-right">
                <p className="text-base lg:text-lg font-prettywise text-[var(--gold)] mb-2">
                  {venueInfo.atmosphere}
                </p>
                <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">
                  Atmosphere
                </p>
              </div>
            </div>
          </div>

          {/* Venue Photos Gallery */}
          <div className="mb-24 lg:mb-32">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {/* Main Venue Photo */}
              <div className="lg:col-span-2 relative group">
                <div className="absolute -top-3 -left-3 w-20 h-20 border border-[var(--gold)]/20" />
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--dark-green)]/20">
                  {/* Photo Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)]/40 via-[var(--dark-green)]/30 to-[var(--maroon-red)]/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--gold)]/40 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[var(--gold)]/30" />
                      </div>
                      <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">
                        Main Venue
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm font-prettywise text-[var(--gold)]">
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sound System Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--turquoise)]/10">
                <div className="absolute -top-3 -right-3 w-16 h-16 border border-[var(--turquoise)]/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--turquoise)]/20 to-[var(--dark-green)]/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 border-2 border-[var(--turquoise)]/40 flex items-center justify-center">
                      <div className="w-6 h-6 bg-[var(--turquoise)]/40" />
                    </div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                      Audio Setup
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-neue-haas text-[var(--turquoise)]">
                    {venueInfo.soundSystem}
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Photos Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Dance Floor */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--gold)]/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 border border-[var(--gold)]/40 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[var(--gold)]/40" />
                    </div>
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                      Dance Floor
                    </p>
                  </div>
                </div>
              </div>

              {/* Bar Area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--white)]/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-green)]/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 border border-[var(--white)]/40 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[var(--white)]/40" />
                    </div>
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                      Bar Area
                    </p>
                  </div>
                </div>
              </div>

              {/* VIP Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--gold)]/15">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 border border-[var(--gold)]/50 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[var(--gold)]/50" />
                    </div>
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                      VIP Area
                    </p>
                  </div>
                </div>
              </div>

              {/* Entrance */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--turquoise)]/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-green)]/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 border border-[var(--turquoise)]/40 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[var(--turquoise)]/40" />
                    </div>
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                      Entrance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
