import Image from "next/image";
import { cookies } from "next/headers";
import { getEventForCity, getFeaturedEvent } from "@/content/events";
import HeroMobileButton from "./hero-mobile-button";

export default async function HeroMobile() {
  const cookieStore = await cookies();
  const city = cookieStore.get("nza_city")?.value;
  console.log("[HeroMobile] city cookie:", city);
  const featuredEvent = getEventForCity(city) || getFeaturedEvent();

  if (!featuredEvent) {
    console.log("[HeroMobile] no event – returning null");
    return null;
  }

  console.log("[HeroMobile] chosen event:", featuredEvent.slug);
  const artistNames =
    featuredEvent.artists
      ?.filter((a) => a.name.toLowerCase() !== featuredEvent.artist.toLowerCase())
      .map((a) => a.name) || [];
  const [day, month] = featuredEvent.date.split(' ');

  return (
    <section className="relative min-h-[100dvh] overflow-hidden" style={{ backgroundColor: 'var(--maroon-red)' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)]/95 to-[var(--dark-green)]" />
      
      <div className="relative flex flex-col min-h-[100dvh]">
        {/* Poster Showcase Section */}
        <div className="relative flex items-center justify-center px-6 pt-10 pb-8">
          <div className="relative w-full max-w-[280px]">
            {/* Gold accent frame */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-[var(--gold)] via-[var(--gold)]/50 to-transparent opacity-60" />
            <div className="absolute -inset-[1px]" style={{ backgroundColor: 'var(--maroon-red)' }} />
            
            {/* Main Poster */}
            <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
              <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: 'var(--dark-green)/20' }}>
                <Image 
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Premium vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-green)]/20 via-transparent to-transparent" />
              </div>
            </HeroMobileButton>
            
            {/* Floating date badge */}
            <div className="absolute -top-3 -right-3 w-20 h-20 flex flex-col items-center justify-center shadow-xl" style={{ backgroundColor: 'var(--gold)' }}>
              <p className="text-2xl font-light leading-none" style={{ color: 'var(--maroon-red)' }}>{day}</p>
              <p className="text-[9px] uppercase tracking-[0.3em] mt-1" style={{ color: 'var(--maroon-red)' }}>{month}</p>
            </div>
            
            {/* Corner accents */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-l-2 border-b-2" style={{ borderColor: 'var(--gold)/40' }} />
            <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2" style={{ borderColor: 'var(--gold)/40' }} />
          </div>
        </div>
        
        {/* Event Details Section */}
        <div className="relative flex-1 bg-gradient-to-b from-transparent via-[var(--maroon-red)]/50 to-[var(--maroon-red)]">
          {/* Gold accent line */}
          <div className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)]/50 to-transparent" />
          
          <div className="w-full px-6 py-8 space-y-6">
            {/* Premium Badge */}
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-6" style={{ backgroundColor: 'var(--gold)/60' }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-light" style={{ color: 'var(--gold)' }}>
                Featured Event
              </span>
              <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--gold)/60' }} />
            </div>
            
            {/* Title Treatment */}
            <div className="space-y-3">
              <h1 className="text-[15vw] font-thin leading-[0.85] text-white">
                {featuredEvent.title}
              </h1>
              {featuredEvent.tagline && (
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--gold)] to-transparent" />
                  <p className="text-[4.5vw] leading-relaxed text-white/80">
                    {featuredEvent.tagline}
                  </p>
                </div>
              )}
            </div>
            
            {/* Event Info Grid */}
            <div className="grid grid-cols-2 gap-6 py-6 border-y" style={{ borderColor: 'var(--gold)/20' }}>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.4em] mb-2" style={{ color: 'var(--gold)/70' }}>
                    Date & Time
                  </p>
                  <p className="text-sm text-white">{featuredEvent.date}</p>
                  <p className="text-xs text-white/70">Doors: 10:00 PM</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.4em] mb-2" style={{ color: 'var(--gold)/70' }}>
                    Location
                  </p>
                  <p className="text-sm text-white">Fortune Sound Club</p>
                  <p className="text-xs text-white/70">Vancouver, BC</p>
                </div>
              </div>
            </div>
            
            {/* Artists Section */}
            {artistNames.length > 0 && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold)/70' }}>
                  Featured Artists
                </p>
                <div className="space-y-2">
                  {artistNames.map((artist, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                      <p className="text-base text-white">{artist.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Price Display */}
            <div className="flex items-baseline gap-2 py-4">
              <span className="text-5xl font-light" style={{ color: 'var(--gold)' }}>$25</span>
              <span className="text-xs uppercase tracking-wider text-white/50">CAD</span>
            </div>
            
            {/* CTA Button */}
            <div className="space-y-4 pb-safe">
              <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
                <button className="relative w-full group overflow-hidden">
                  <div className="absolute inset-0 transform transition-transform duration-500 group-active:scale-x-105" style={{ backgroundColor: 'var(--gold)' }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] to-[var(--dark-gold)] opacity-0 group-active:opacity-100 transition-opacity duration-500" />
                  <div className="relative px-6 py-5 text-sm uppercase tracking-[0.4em] font-medium" style={{ color: 'var(--maroon-red)' }}>
                    Reserve Your Experience
                  </div>
                </button>
              </HeroMobileButton>
              
              {/* Event Info */}
              <div className="flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/50">
                <span>19+ Event</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)/40' }} />
                <span>Valid ID Required</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)/40' }} />
                <span>Limited Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--maroon-red)] to-transparent pointer-events-none" />
    </section>
  )
}
