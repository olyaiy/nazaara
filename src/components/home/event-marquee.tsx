"use client";
import { events } from "@/content/events";

export function EventMarquee() {
    return (
      <div className="relative py-3 border-y border-[var(--gold)]/20 bg-[var(--dark-green)]/50">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...events, ...events].map((event, i) => (
              <span key={`${event.id}-${i}`} className="mx-8 flex items-center gap-3">
                <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                  {event.date} {event.year}
                </span>
                <span className="w-1 h-1 bg-[var(--gold)]/30 rounded-full" />
                <span className="text-[11px] font-prettywise text-[var(--white)]/60">
                  {event.artist}
                </span>
                <span className="w-1 h-1 bg-[var(--gold)]/30 rounded-full" />
                <span className="text-[10px] font-neue-haas text-[var(--gold)]/40">
                  {event.venue}
                </span>
              </span>
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