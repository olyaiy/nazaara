"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUpcomingEvents, events as allEvents } from "@/content/events";

export default function UpcomingEvents() {
  const router = useRouter();
  const upcomingEvents = getUpcomingEvents();
  // Build a chronologically sorted list of ALL events for the Complete Schedule
  const allEventsChrono = [...allEvents].sort((a, b) => {
    const monthMap: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const [dayA, monthA] = a.date.split(" ");
    const [dayB, monthB] = b.date.split(" ");
    const dateA = new Date(parseInt(a.year), monthMap[monthA], parseInt(dayA));
    const dateB = new Date(parseInt(b.year), monthMap[monthB], parseInt(dayB));
    return dateA.getTime() - dateB.getTime();
  });

  const handleEventClick = (slug: string) => {
    router.push(`/event/${slug}`);
  };
  
  return (
    <section className="relative bg-[var(--black-grey)] overflow-hidden">
      {/* Art Deco inspired grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="upcoming-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="80" height="80" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
              <rect x="10" y="10" width="60" height="60" fill="none" stroke="var(--gold)" strokeWidth="0.3" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="var(--gold)" strokeWidth="0.2" />
              <line x1="40" y1="0" x2="40" y2="80" stroke="var(--gold)" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#upcoming-grid)" />
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

          {/* Three Event Layout - Asymmetric Magazine Style */}
          <div className="mb-32">
            {/* First Row - Featured Large Event */}
            <div className="grid lg:grid-cols-12 gap-8 mb-8">
              {/* Main Featured Event - Takes up 8 columns */}
              <div className="lg:col-span-8 group cursor-pointer" onClick={() => handleEventClick(upcomingEvents[0].slug)}>
                <div className="relative">
                  {/* Top accent line */}
                  <div className="absolute -top-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
                  
                  <div className="grid lg:grid-cols-2 gap-0 bg-[var(--maroon-red)]/5 border border-[var(--gold)]/10">
                    {/* Left - Image */}
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                      <Image
                        src={upcomingEvents[0].image}
                        alt={upcomingEvents[0].artist}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--black-grey)]/60" />
                      
                      {/* Floating month badge */}
                      <div className="absolute top-8 left-8">
                        <div className="bg-[var(--black-grey)]/90 backdrop-blur-sm px-6 py-4 border-l-4 border-[var(--gold)]">
                          <p className="text-4xl font-prettywise text-[var(--gold)]">
                            {upcomingEvents[0].date.split(' ')[1].toUpperCase()}
                          </p>
                          <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--white)]/60">
                            Month
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right - Content */}
                    <div className="relative p-8 lg:p-12 flex flex-col justify-between">
                      {/* Date stamp in corner */}
                      <div className="absolute top-8 right-8">
                        <p className="text-6xl font-prettywise text-[var(--gold)]/10">
                          {upcomingEvents[0].date.split(' ')[0]}
                        </p>
                      </div>

                      <div>
                        <span className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/60">
                          Headliner Performance
                        </span>
                        <h3 className="text-[clamp(2.5rem,4vw,4rem)] font-prettywise leading-[0.9] text-[var(--white)] mt-4 mb-3">
                          {upcomingEvents[0].artist}
                        </h3>
                        <p className="text-xl font-prettywise text-[var(--gold)] mb-6">
                          {upcomingEvents[0].title}
                        </p>
                        
                        <div className="space-y-3 py-6 border-t border-[var(--gold)]/10">
                          <div className="flex items-baseline gap-4">
                            <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                              Venue
                            </span>
                            <span className="text-base font-prettywise text-[var(--white)]">
                              {upcomingEvents[0].venue}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                              Location
                            </span>
                            <span className="text-base font-prettywise text-[var(--white)]">
                              {upcomingEvents[0].city}, {upcomingEvents[0].country}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mb-1">
                            Starting From
                          </p>
                          <p className="text-3xl font-prettywise text-[var(--gold)]">
                            ${upcomingEvents[0].price}
                          </p>
                        </div>
                        <span className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/60 px-4 py-2 border border-[var(--gold)]/20">
                          {upcomingEvents[0].status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Events - Takes up 4 columns */}
              <div className="lg:col-span-4 space-y-8">
                {upcomingEvents.slice(1, 3).map((event, index) => (
                  <div key={event.id} className="group cursor-pointer" onClick={() => handleEventClick(event.slug)}>
                    <div className="relative">
                      {/* Accent element */}
                      {index === 0 && (
                        <div className="absolute -top-3 -right-3 w-12 h-12 border-t border-r border-[var(--gold)]/30" />
                      )}
                      
                      <div className="relative h-[200px] overflow-hidden bg-[var(--black-grey)]">
                        <Image
                          src={event.image}
                          alt={event.artist}
                          fill
                          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/60 to-transparent" />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-3xl font-prettywise text-[var(--gold)]">
                                {event.date.split(' ')[0]}
                              </p>
                              <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60">
                                {event.date.split(' ')[1]}
                              </p>
                            </div>
                            <span className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                              {event.status}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-2xl font-prettywise text-[var(--white)] mb-1">
                              {event.artist}
                            </h4>
                            <p className="text-sm font-prettywise text-[var(--gold)]/80 mb-2">
                              {event.title}
                            </p>
                            <div className="flex items-baseline justify-between">
                              <p className="text-[10px] font-neue-haas uppercase tracking-[0.2em] text-[var(--white)]/40">
                                {event.venue}
                              </p>
                              <p className="text-lg font-prettywise text-[var(--gold)]">
                                ${event.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom accent */}
                      {index === 1 && (
                        <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b border-l border-[var(--gold)]/30" />
                      )}
                    </div>
                  </div>
                ))}
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
              {allEventsChrono.map((event, index) => (
                <div 
                  key={event.id} 
                  className="group cursor-pointer border-b border-[var(--gold)]/10 hover:bg-[var(--gold)]/5 transition-all duration-500"
                  onClick={() => handleEventClick(event.slug)}
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
