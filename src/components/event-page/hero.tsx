
import Image from "next/image";
import { Event } from "@/content/events";

interface EventHeroProps {
  event: Event;
}

export default function EventHero({ event }: EventHeroProps) {

  return (
    <section className="relative  bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)] to-[var(--dark-green)]">
    
      {/* Main Container */}
      <div className="relative  px-6 lg:px-12 py-8 lg:py-12">
        <div className="max-w-[1600px] mx-auto  flex items-center">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left Section - Poster Display */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
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
                    />
                    {/* Premium vignette effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-green)]/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating gold accent date element - top right */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--gold)] flex flex-col items-center justify-center">
                    <p className="text-3xl font-prettywise text-[var(--maroon-red)]">{event.date.split(' ')[0]}</p>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">{event.date.split(' ')[1]}</p>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-[var(--gold)]/40" />
                  <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-[var(--gold)]/40" />
                </div>
              </div>
            </div>
            
            {/* Right Section - Event Information */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="space-y-10 lg:space-y-12 max-w-xl">
                {/* Title Block */}
                <div>
                  {/* Nazaara Live Presents Label */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-[var(--gold)]/30" />
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/50">Nazaara Live Presents</p>
                  </div>
                  <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-prettywise leading-[0.85] text-[var(--white)] mb-4">
                    {event.artist}
                  </h1>
                  <p className="text-3xl lg:text-4xl font-prettywise text-[var(--gold)] mb-6">
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
                  <div className="space-y-4">
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40">Featuring</p>
                    <p className="text-lg font-prettywise text-[var(--white)]">{event.tour}</p>
                  </div>
                )}
                
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-[var(--gold)]/10">
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-3">Venue</p>
                    <p className="text-lg font-prettywise text-[var(--white)]">{event.venue}</p>
                    <p className="text-xs font-neue-haas text-[var(--white)]/40">{event.city}, {event.country}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-3">Time</p>
                    <p className="text-lg font-neue-haas text-[var(--white)]">{event.dates || event.date}</p>
                    <p className="text-xs font-neue-haas text-[var(--white)]/40">{event.status}</p>
                  </div>
                </div>
                
                {/* Price & Action */}
                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-2">Starting From</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl lg:text-7xl font-prettywise text-[var(--gold)]">{event.price}</span>
                      <span className="text-xs font-neue-haas text-[var(--gold)]/40 uppercase tracking-wider">CAD</span>
                    </div>
                  </div>
                  
                  {/* Luxury CTA */}
                  <div className="space-y-4">
                    <button className="w-full relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--gold)] transition-all duration-300 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--dark-gold)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                      <div className="relative px-8 py-6">
                        <p className="text-[11px] font-neue-haas uppercase tracking-[0.5em] text-[var(--maroon-red)] font-medium transition-all duration-300">
                          Reserve Experience
                        </p>
                      </div>
                    </button>
                    
                    <div className="flex items-center justify-center gap-6 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/30">
                      <span>19+ Event</span>
                      <span className="w-1 h-1 bg-[var(--gold)]/30 rounded-full" />
                      <span>ID Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
