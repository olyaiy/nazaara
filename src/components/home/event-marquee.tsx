"use client";

const CITIES = [
  "Austin",
  "Calgary",
  "Chicago",
  "Edmonton",
  "Miami",
  "Montreal",
  "New York",
  "Toronto",
  "Vancouver",
  "Victoria",
  "Boston",
];

export function EventMarquee() {
    return (
      <div className="relative py-3 border-y border-[var(--gold)]/20 bg-[var(--dark-green)]/50">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Duplicate the cities array to create seamless loop */}
            {[...CITIES, ...CITIES].map((city, i) => (
              <div
                key={`${city}-${i}`}
                className="mx-8 flex items-center gap-3"
              >
                <span className="text-sm md:text-base font-prettywise text-[var(--gold)]/80">
                  {city}
                </span>
                <span className="w-1 h-1 bg-[var(--gold)]/30 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    );
}