import { Event } from "@/content/events";

interface VenueFeaturesProps {
  event: Event;
}

export default function VenueFeatures({ event }: VenueFeaturesProps) {
  // Intentionally simplified: feature details may be added later

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.01]">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="venue-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="var(--gold)" />
              <path d="M0 30 L30 0 L60 30 L30 60 Z" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#venue-pattern)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-light" style={{ color: 'var(--gold)', opacity: 0.6 }}>
              The Venue
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif font-thin leading-[0.9] text-white mb-4">
            {event.venue}
          </h2>
          <p className="text-lg font-light text-white/60">
            {event.venueAddress ?? `${event.city}, ${event.country}`}
          </p>
        </div>

        {/* Venue Description */}
        {event.venueDescription && (
          <div className="relative mb-12 lg:mb-16 ml-8">
            {/* Subtle left accent */}
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)]/30 via-[var(--gold)]/10 to-transparent" />
            
            <div className="max-w-2xl">
              <p className="text-sm lg:text-base font-light text-white/60 leading-relaxed italic">
                {event.venueDescription}
              </p>
            </div>
          </div>
        )}

        {/* Simple Three-Image Grid */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature image */}
          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden">
            {/* Frame accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 via-[var(--maroon-red)]/30 to-[var(--dark-green)]/40" />
          </div>
          
          {/* Stacked smaller images */}
          <div className="lg:col-span-5 grid gap-4 lg:gap-6">
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r" style={{ borderColor: 'var(--turquoise)', opacity: 0.2 }} />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--turquoise)]/20 to-[var(--dark-green)]/30" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)]/20 to-[var(--gold)]/10" />
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
