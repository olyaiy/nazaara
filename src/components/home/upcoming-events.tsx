"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUpcomingEvents, events as allEvents } from "@/content/events";
import SectionHeader from "@/components/ui/section-header";

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
          <SectionHeader eyebrow="Season 2024/25" title="Program" className="mb-20" />

          {/* Three Event Layout - Premium Gallery */}
          <div className="mb-16">
            {/* Decorative header line */}
            <div className="mb-16">
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
            </div>
            
            {/* Three Column Premium Layout */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <div 
                  key={event.id} 
                  className="group cursor-pointer relative" 
                  onClick={() => handleEventClick(event.slug)}
                >
                  {/* Elegant border treatment */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative">
                    {/* The Poster - Enhanced presentation */}
                    <div className="relative overflow-hidden">
                      {/* Golden accent line at top */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent z-10" />
                      
                      {/* Main poster with refined aspect ratio */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--maroon-red)]/5">
                        <Image
                          src={event.image}
                          alt={event.artist}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                          priority={index === 0}
                        />
                        
                        {/* Sophisticated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/20 to-transparent opacity-90" />
                        
                        {/* Date display - elegant corner placement */}
                        <div className="absolute bottom-6 left-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-prettywise text-[var(--gold)] leading-none">
                              {event.date.split(' ')[0]}
                            </span>
                            <span className="text-sm font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/70">
                              {event.date.split(' ')[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content - Refined typography and spacing */}
                    <div className="pt-8 pb-4">
                      {/* Artist name with enhanced prominence */}
                      <h3 className="font-prettywise text-[var(--white)] text-3xl lg:text-4xl mb-3 leading-tight group-hover:text-[var(--gold)] transition-colors duration-500">
                        {event.artist}
                      </h3>
                      
                      {/* Event title with subtle styling */}
                      <p className="text-lg font-prettywise text-[var(--gold)]/60 mb-6">
                        {event.title}
                      </p>
                      
                      {/* Venue and pricing in elegant layout */}
                      <div className="space-y-4">
                        {/* Divider */}
                        <div className="h-[1px] bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-transparent" />
                        
                        {/* Venue information */}
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <p className="text-base font-prettywise text-[var(--white)]/80">
                              {event.venue}
                            </p>
                            <p className="text-sm font-neue-haas text-[var(--white)]/50">
                              {event.city}, {event.country}
                            </p>
                          </div>
                          
                          {/* Price tag */}
                          <div className="text-right">
                            <p className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mb-1">
                              Starting at
                            </p>
                            <p className="text-3xl font-prettywise text-[var(--gold)]">
                              ${event.price}
                            </p>
                          </div>
                        </div>
                        
                        {/* Subtle CTA on hover */}
                        <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex items-center justify-center gap-3 text-[var(--gold)]/60">
                            <span className="text-xs font-neue-haas uppercase tracking-[0.3em]">
                              Explore Event
                            </span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              {allEventsChrono.map((event) => (
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
