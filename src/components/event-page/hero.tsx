
import Image from "next/image";
import { Event } from "@/content/events";

interface EventHeroProps {
  event: Event;
}

export default function EventHero({ event }: EventHeroProps) {

  return (
    <section className="relative  bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)] to-[var(--dark-green)]">
    
      {/* Main Container */}
      <div className="relative  px-6 lg:px-12 py-6 lg:py-8">
        <div className="max-w-[1600px] mx-auto  flex items-center">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center w-full">
            {/* Left Section - Poster Display */}
            <div className="flex justify-center ">
              <div className="relative w-full max-w-[450px] lg:max-w-[500px]">
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
            
            {/* Right Section - Event Information */}
            <div className="flex flex-col justify-center ">
              <div className="space-y-6 lg:space-y-8 max-w-xl">
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
                  <p className="text-2xl lg:text-3xl font-prettywise text-[var(--gold)] mb-4">
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
                        Reserve Your Experience
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
        {/* Subtle gradient fade using the dark green from the background */}
        <div className="absolute inset-x-0 -bottom-px h-12 bg-gradient-to-b from-transparent to-[var(--dark-green)]/5" />
        
        {/* Decorative border element - fades from right to left */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--gold)]/40 via-[var(--gold)]/20 to-transparent" />
          <div className="h-px bg-gradient-to-l from-[var(--gold)]/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}
