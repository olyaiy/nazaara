"use client";
import { useRouter } from "next/navigation";
import { events } from "@/content/events";

export function EventMarquee() {
    const router = useRouter();

    const handleEventClick = (slug: string, ticketUrl?: string) => {
      // TEMPORARY: Redirect to ticket URL instead of event page
      // router.push(`/event/${slug}`); // TEMPORARY: Commented out
      if (ticketUrl) {
        window.open(ticketUrl, '_blank');
      }
    };

    return (
      <div className="relative py-3 border-y border-[var(--gold)]/20 bg-[var(--dark-green)]/50">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...events, ...events].map((event, i) => (
              <button 
                key={`${event.id}-${i}`} 
                onClick={() => handleEventClick(event.slug, event.ticketUrl)}
                className="group mx-8 flex items-center gap-3 transition-all duration-300 ease-out cursor-pointer hover:transform hover:scale-[1.02] hover:brightness-110"
              >
                <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40 group-hover:text-[var(--gold)]/70 transition-colors duration-300">
                  {event.date} {event.year}
                </span>
                <span className="w-1 h-1 bg-[var(--gold)]/30 group-hover:bg-[var(--gold)]/60 rounded-full transition-colors duration-300" />
                <span className="text-[11px] font-prettywise text-[var(--white)]/60 group-hover:text-[var(--white)]/90 transition-colors duration-300">
                  {event.artist}
                </span>
                <span className="w-1 h-1 bg-[var(--gold)]/30 group-hover:bg-[var(--gold)]/60 rounded-full transition-colors duration-300" />
                <span className="text-[10px] font-neue-haas text-[var(--gold)]/40 group-hover:text-[var(--gold)]/70 transition-colors duration-300">
                  {event.venue}
                </span>
              </button>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </div>
    );
  }