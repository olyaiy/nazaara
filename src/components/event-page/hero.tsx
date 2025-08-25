
import Image from "next/image";
import { Event } from "@/content/events";

interface EventHeroProps {
  event: Event;
}

export default function EventHero({ event }: EventHeroProps) {

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--maroon-red)' }}>
      {/* Gradient darkening towards bottom right */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/[0.02] via-transparent to-black/15" />
      
      {/* Dot matrix pattern - modern and subtle */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.04]">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="dots-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Gradient of dots getting smaller */}
              <circle cx="10" cy="10" r="0.8" fill="var(--gold)" />
              <circle cx="30" cy="10" r="0.6" fill="var(--gold)" opacity="0.8" />
              <circle cx="10" cy="30" r="0.6" fill="var(--gold)" opacity="0.8" />
              <circle cx="30" cy="30" r="0.4" fill="var(--gold)" opacity="0.6" />
              <circle cx="20" cy="20" r="1" fill="var(--gold)" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      </div>
      
      {/* Additional darkening overlay for bottom right corner */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent via-50% to-[var(--dark-green)]/10" />
    
      {/* Main Container */}
      <div className="relative px-5 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-16">
        <div className="max-w-[1600px] mx-auto flex items-center">
          {/* Mobile Layout - Sandwich Style */}
          <div className="lg:hidden w-full space-y-8">
            {/* Mobile Title Section - Above Poster */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-[1px] w-8 bg-[var(--gold)]/30" />
                <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/50">Nazaara Live Presents</p>
                <div className="h-[1px] w-8 bg-[var(--gold)]/30" />
              </div>
              <h1 className="text-[clamp(2.5rem,10vw,3.5rem)] font-prettywise leading-[0.85] text-[var(--white)] mb-2">
                {event.artist}
              </h1>
              <p className="text-xl font-prettywise text-[var(--gold)]">
                {event.title}
              </p>
              {event.tagline && (
                <p className="text-xs font-neue-haas text-[var(--white)]/60 leading-relaxed mt-3 max-w-sm mx-auto">
                  {event.tagline}
                </p>
              )}
            </div>

            {/* Mobile Poster */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px]">
                {/* Enhanced Gold accent frame */}
                <div className="absolute -inset-[2px] bg-gradient-to-br from-[var(--gold)] via-[var(--gold)]/50 to-transparent opacity-60" />
                <div className="absolute -inset-[1px] bg-[var(--maroon-red)]" />
                
                {/* Main Poster with enhanced presentation */}
                <div className="relative w-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--dark-green)]/20">
                    <Image 
                      src={event.image}
                      alt={event.artist}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 320px, 380px"
                    />
                    {/* Premium vignette effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-green)]/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating gold accent date element - top right */}
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-18 sm:h-18 bg-[var(--gold)] flex flex-col items-center justify-center">
                    <p className="text-xl sm:text-2xl font-prettywise text-[var(--maroon-red)]">{event.date.split(' ')[0]}</p>
                    <p className="text-[8px] sm:text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">{event.date.split(' ')[1]}</p>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 sm:w-14 sm:h-14 border-l-2 border-b-2 border-[var(--gold)]/40" />
                  <div className="absolute -top-2 -left-2 w-12 h-12 sm:w-14 sm:h-14 border-l-2 border-t-2 border-[var(--gold)]/40" />
                </div>
              </div>
            </div>

            {/* Mobile Details Section - Below Poster */}
            <div className="space-y-6">
              {/* Tour/Supporting Artists */}
              {event.tour && (
                <div className="text-center">
                  <p className="text-[7px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40 mb-2">Featuring</p>
                  <p className="text-sm font-prettywise text-[var(--white)]">{event.tour}</p>
                </div>
              )}
              
              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-[var(--gold)]/20" />
                  <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40">Event Details</p>
                  <div className="h-[1px] flex-1 bg-[var(--gold)]/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40 mb-1">Venue</p>
                    <p className="text-base font-prettywise text-[var(--white)]">{event.venue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40 mb-1">Date & Time</p>
                    <p className="text-base font-prettywise text-[var(--white)]">{event.dates || event.date}</p>
                  </div>
                </div>
                
                <div className="flex justify-center flex-wrap items-center gap-4 text-[9px] font-neue-haas uppercase tracking-[0.2em] text-[var(--white)]/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                    19+ Event
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                    ID Required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                    Limited Capacity
                  </span>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="flex justify-center">
                <button className="w-full max-w-xs relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[var(--gold)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--dark-gold)] opacity-0 group-hover:opacity-100" />
                  <div className="relative px-8 py-3.5">
                    <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--maroon-red)] font-medium">
                      RSVP
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0 items-center w-full">
            {/* Desktop Poster */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px]">
                {/* Enhanced Gold accent frame */}
                <div className="absolute -inset-[2px] bg-gradient-to-br from-[var(--gold)] via-[var(--gold)]/50 to-transparent opacity-60" />
                <div className="absolute -inset-[1px] bg-[var(--maroon-red)]" />
                
                {/* Main Poster with enhanced presentation */}
                <div className="relative w-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--dark-green)]/20">
                    <Image 
                      src={event.image}
                      alt={event.artist}
                      fill
                      className="object-cover"
                      priority
                      sizes="500px"
                    />
                    {/* Premium vignette effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-green)]/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating gold accent date element - top right */}
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-[var(--gold)] flex flex-col items-center justify-center">
                    <p className="text-2xl font-prettywise text-[var(--maroon-red)]">{event.date.split(' ')[0]}</p>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">{event.date.split(' ')[1]}</p>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-[var(--gold)]/40" />
                  <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-[var(--gold)]/40" />
                </div>
              </div>
            </div>
            
            {/* Desktop Event Information */}
            <div className="flex flex-col justify-center">
              <div className="space-y-8 max-w-xl">
                {/* Title Block */}
                <div>
                  {/* Nazaara Live Presents Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-8 bg-[var(--gold)]/30" />
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/50">Nazaara Live Presents</p>
                  </div>
                  <h1 className="text-[clamp(3rem,7vw,6rem)] font-prettywise leading-[0.85] text-[var(--white)] mb-3">
                    {event.artist}
                  </h1>
                  <p className="text-3xl font-prettywise text-[var(--gold)] mb-4">
                    {event.title}
                  </p>
                  {event.tagline && (
                    <p className="text-sm font-neue-haas text-[var(--white)]/60 leading-relaxed max-w-md">
                      {event.tagline}
                    </p>
                  )}
                </div>
                
                {/* Tour/Supporting Artists */}
                {event.tour && (
                  <div className="space-y-3">
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40">Featuring</p>
                    <p className="text-base font-prettywise text-[var(--white)]">{event.tour}</p>
                  </div>
                )}
                
                {/* Event Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-[var(--gold)]/20" />
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">Event Details</p>
                    <div className="h-[1px] flex-1 bg-[var(--gold)]/20" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-1.5">Venue</p>
                      <p className="text-lg font-prettywise text-[var(--white)]">{event.venue}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-1.5">Date & Time</p>
                      <p className="text-lg font-prettywise text-[var(--white)]">{event.dates || event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                      19+ Event
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                      ID Required
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[var(--gold)] rounded-full" />
                      Limited Capacity
                    </span>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div>
                  <button className="w-full relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[var(--gold)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--dark-gold)] opacity-0 group-hover:opacity-100" />
                    <div className="relative px-8 py-4">
                      <p className="text-[11px] font-neue-haas uppercase tracking-[0.5em] text-[var(--maroon-red)] font-medium">
                        RSVP
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Border Transition */}
      <div className="relative">
        {/* Decorative border element - fades from right to left */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--gold)]/30 via-[var(--gold)]/15 to-transparent" />
          <div className="h-px bg-gradient-to-l from-[var(--gold)]/40 to-transparent" />
        </div>
        
      </div>
    </section>
  )
}
