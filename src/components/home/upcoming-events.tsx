"use client";
import Image from "next/image";
import { getUpcomingEvents } from "@/content/events";

export default function UpcomingEvents() {
  const upcomingEvents = getUpcomingEvents();
  
  return (
    <section className="relative bg-[var(--black-grey)] overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="upcoming-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L50 0 L100 50 L50 100 Z" stroke="var(--gold)" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="1.5" fill="var(--gold)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#upcoming-pattern)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative px-6 lg:px-12 py-24">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header - Editorial Style */}
          <div className="mb-20">
            <div className="flex items-baseline gap-8 mb-2">
              <span className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                Season 2024/25
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--gold)]/20 to-transparent" />
            </div>
            <h2 className="text-[clamp(4rem,8vw,8rem)] font-prettywise leading-[0.8] text-[var(--white)]">
              Program
            </h2>
          </div>

          {/* Three Event Grid - Triptych Style */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-32">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div 
                key={event.id} 
                className={`relative group cursor-pointer ${
                  index === 1 ? 'lg:-mt-12' : ''
                }`}
              >
                {/* Card Container with unique composition for each */}
                <div className="relative">
                  {/* Geometric frame element - different for each card */}
                  {index === 0 && (
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-[var(--gold)]/20" />
                  )}
                  {index === 1 && (
                    <>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[var(--gold)]/30" />
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[var(--gold)]/30" />
                    </>
                  )}
                  {index === 2 && (
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[var(--gold)]/20" />
                  )}

                  {/* Main Content Container */}
                  <div className={`relative overflow-hidden ${
                    index === 1 ? 'border border-[var(--gold)]/20' : ''
                  }`}>
                    {/* Image Section with different heights */}
                    <div className={`relative overflow-hidden ${
                      index === 0 ? 'h-[420px]' : 
                      index === 1 ? 'h-[480px]' : 
                      'h-[420px]'
                    }`}>
                      <Image
                        src={event.image}
                        alt={event.artist}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Unique gradient overlays for each */}
                      {index === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--black-grey)]/60 via-transparent to-[var(--black-grey)]/40" />
                      )}
                      {index === 1 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)]/80 via-[var(--black-grey)]/20 to-transparent" />
                      )}
                      {index === 2 && (
                        <div className="absolute inset-0 bg-gradient-to-bl from-[var(--black-grey)]/60 via-transparent to-[var(--black-grey)]/40" />
                      )}

                      {/* Floating Date Element - Different positions */}
                      {index === 0 && (
                        <div className="absolute top-6 left-6 bg-[var(--gold)] px-4 py-3">
                          <p className="text-2xl font-prettywise text-[var(--maroon-red)]">
                            {event.date.split(' ')[0]}
                          </p>
                          <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">
                            {event.date.split(' ')[1]}
                          </p>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="absolute -top-3 -right-3 bg-[var(--maroon-red)] border border-[var(--gold)] px-5 py-4">
                          <p className="text-3xl font-prettywise text-[var(--gold)]">
                            {event.date.split(' ')[0]}
                          </p>
                          <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60">
                            {event.date.split(' ')[1]}
                          </p>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="absolute bottom-6 right-6 backdrop-blur-sm bg-[var(--black-grey)]/70 border border-[var(--gold)]/30 px-4 py-3">
                          <p className="text-2xl font-prettywise text-[var(--gold)]">
                            {event.date.split(' ')[0]}
                          </p>
                          <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60">
                            {event.date.split(' ')[1]}
                          </p>
                        </div>
                      )}

                      {/* Event Info Overlay - Different layouts */}
                      <div className={`absolute inset-x-0 bottom-0 p-6 ${
                        index === 1 ? 'pb-8' : ''
                      }`}>
                        {/* Artist Name */}
                        <h3 className={`font-prettywise text-[var(--white)] mb-2 ${
                          index === 1 ? 'text-4xl' : 'text-3xl'
                        }`}>
                          {event.artist}
                        </h3>
                        
                        {/* Event Title */}
                        <p className="text-lg font-prettywise text-[var(--gold)] mb-4">
                          {event.title}
                        </p>
                        
                        {/* Venue and Price Info */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mb-1">
                              {event.city}, {event.country}
                            </p>
                            <p className="text-sm font-prettywise text-[var(--white)]">
                              {event.venue}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60">
                              From
                            </p>
                            <p className="text-2xl font-prettywise text-[var(--gold)]">
                              ${event.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Bar - Below image */}
                    <div className={`bg-[var(--black-grey)] border-t border-[var(--gold)]/10 px-6 py-3 ${
                      index === 1 ? 'bg-[var(--maroon-red)]/10' : ''
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40">
                          {event.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                          <span className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Side accent for middle card */}
                  {index === 1 && (
                    <>
                      <div className="absolute top-1/2 -left-8 -translate-y-1/2 rotate-90">
                        <span className="text-[9px] font-neue-haas uppercase tracking-[0.6em] text-[var(--gold)]/20">
                          Featured
                        </span>
                      </div>
                      <div className="absolute top-1/2 -right-8 -translate-y-1/2 -rotate-90">
                        <span className="text-[9px] font-neue-haas uppercase tracking-[0.6em] text-[var(--gold)]/20">
                          Featured
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Schedule List - Playbill Style */}
          <div className="relative">
            {/* Section Title */}
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--gold)]/20" />
              <h3 className="text-xl font-prettywise text-[var(--gold)]">Complete Schedule</h3>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--gold)]/20" />
            </div>

            {/* Events Table - Theater Program Style */}
            <div className="space-y-0">
              {upcomingEvents.slice(3).map((event, index) => (
                <div 
                  key={event.id} 
                  className="group cursor-pointer border-b border-[var(--gold)]/10 hover:bg-[var(--gold)]/5 transition-all duration-500"
                >
                  <div className="grid grid-cols-12 gap-4 py-8 px-4">
                    {/* Date Column */}
                    <div className="col-span-2 lg:col-span-1">
                      <div className="text-center">
                        <p className="text-3xl font-prettywise text-[var(--gold)]/20 group-hover:text-[var(--gold)]/40 transition-colors">
                          {event.date.split(' ')[0]}
                        </p>
                        <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/30">
                          {event.date.split(' ')[1]}
                        </p>
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="col-span-7 lg:col-span-8 flex items-center">
                      <div>
                        <div className="flex items-baseline gap-4 mb-2">
                          <h4 className="text-2xl font-prettywise text-[var(--white)] group-hover:text-[var(--gold)] transition-colors">
                            {event.artist}
                          </h4>
                          <span className="text-sm font-prettywise text-[var(--gold)]/60">
                            {event.title}
                          </span>
                        </div>
                        <p className="text-[11px] font-neue-haas text-[var(--white)]/40 uppercase tracking-wider">
                          {event.venue} · {event.city}, {event.country}
                        </p>
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="col-span-3 lg:col-span-3 flex items-center justify-end gap-6">
                      <div className="text-right">
                        <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/30 mb-1">
                          From
                        </p>
                        <p className="text-2xl font-prettywise text-[var(--gold)]">
                          ${event.price}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-[var(--gold)]/10" />
                      <span className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}