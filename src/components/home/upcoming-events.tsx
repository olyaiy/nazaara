"use client";
import Image from "next/image";
import { upcomingEvents } from "@/content/events";

export default function UpcomingEvents() {
  return (
    <section className="relative bg-[var(--black-grey)] overflow-hidden">
      {/* Main Content */}
      <div className="relative px-6 lg:px-12 py-20">
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

          {/* Featured Event - Magazine Spread Style */}
          <div className="grid lg:grid-cols-12 gap-8 mb-32">
            {/* Left - Large Typography */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[150px] font-prettywise leading-none text-[var(--gold)]/10">
                    {upcomingEvents[0].number}
                  </span>
                  <div className="flex-1">
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-2">
                      Next Performance
                    </p>
                    <div className="w-full h-[1px] bg-[var(--gold)]/20" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-4">
                    {upcomingEvents[0].artist}
                  </h3>
                  <p className="text-2xl font-prettywise text-[var(--gold)] mb-8">
                    {upcomingEvents[0].title}
                  </p>
                  
                  {/* Event Details Table */}
                  <div className="space-y-4 py-6 border-t border-[var(--gold)]/10">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">Date</span>
                      <span className="text-lg font-prettywise text-[var(--white)]">{upcomingEvents[0].date} {upcomingEvents[0].year}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">Venue</span>
                      <span className="text-lg font-prettywise text-[var(--white)]">{upcomingEvents[0].venue}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/40">Admission</span>
                      <span className="text-2xl font-prettywise text-[var(--gold)]">${upcomingEvents[0].price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Decorative Element */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative h-[400px] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)]/20 to-transparent">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                  
                </div>
              </div>
            </div>

            {/* Right - Image with Premium Frame */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Gold accent frame */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--gold)]/30 via-[var(--gold)]/10 to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[var(--black-grey)]" />
                
                {/* Main image container */}
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src={upcomingEvents[0].image}
                    alt={upcomingEvents[0].artist}
                    fill
                    className="object-cover"
                  />
                  {/* Sophisticated vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-transparent to-transparent opacity-40" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--black-grey)/30_100%)]" />
                  
                  {/* Status Badge - floating corner element */}
                  <div className="absolute -bottom-4 -right-4 bg-[var(--gold)] px-8 py-4">
                    <span className="text-[9px] font-neue-haas uppercase tracking-[0.4em] text-[var(--maroon-red)] font-medium">
                      {upcomingEvents[0].status}
                    </span>
                  </div>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-[1px] border-l-[1px] border-[var(--gold)]/20" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[1px] border-r-[1px] border-[var(--gold)]/20" />
                </div>
              </div>
            </div>
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
              {upcomingEvents.slice(1).map((event, index) => (
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
