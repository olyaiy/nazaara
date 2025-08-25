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
      {/* Geometric accent pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rotate-45" style={{ 
          background: `repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 80px)`
        }} />
      </div>
      
      <div className="relative flex flex-col min-h-[100dvh]">
        {/* Elevated header */}
        <div className="relative px-6 pt-8 pb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.6 }} />
            <span className="font-neue-haas text-[10px] uppercase tracking-[0.5em]" style={{ color: 'var(--gold)' }}>
              Nazaara Live Presents
            </span>
            <div className="w-8 h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.6 }} />
          </div>
        </div>
        
        {/* Creative poster layout */}
        <div className="relative px-6 pb-6">
          <div className="relative">
            {/* Corner accent marks */}
            <div className="absolute -top-2 -left-2 w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <div className="absolute top-0 left-0 h-full w-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <div className="absolute top-0 right-0 h-full w-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <div className="absolute bottom-0 left-0 h-full w-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }} />
            </div>
            
            {/* Main poster container */}
            <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image 
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
                
              </div>
            </HeroMobileButton>
          </div>
        </div>
        
        {/* Content section with creative typography */}
        <div className="relative flex-1 px-6 pb-8">
          <div className="space-y-8">
            {/* Title composition */}
            <div className="relative">
              <h1 className="font-prettywise text-[18vw] leading-[0.8]" style={{ color: 'var(--white)' }}>
                {featuredEvent.title}
              </h1>
              {featuredEvent.tagline && (
                <p className="font-neue-haas text-sm leading-relaxed mt-4 pl-8" style={{ color: 'var(--white)', opacity: 0.7 }}>
                  {featuredEvent.tagline}
                </p>
              )}
            </div>
            
            {/* Artists showcase - asymmetric layout */}
            {artistNames.length > 0 && (
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-[1px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                <span className="font-neue-haas text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--gold)', opacity: 0.8 }}>
                  Featuring
                </span>
                <div className="mt-3 space-y-1">
                  {artistNames.map((artist, index) => (
                    <p key={index} className="font-prettywise text-2xl" style={{ 
                      color: 'var(--white)',
                      opacity: 0.9 - (index * 0.1)
                    }}>
                      {artist.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            {/* Venue & time - minimalist approach */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-prettywise text-xl" style={{ color: 'var(--white)' }}>
                    Fortune Sound Club
                  </p>
                  <p className="font-neue-haas text-[10px] uppercase tracking-[0.3em] mt-1" style={{ color: 'var(--white)', opacity: 0.5 }}>
                    Vancouver, BC
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-prettywise text-3xl" style={{ color: 'var(--gold)' }}>
                    10PM
                  </p>
                  <p className="font-neue-haas text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--white)', opacity: 0.5 }}>
                    Doors Open
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elevated CTA section */}
        <div className="sticky bottom-0 px-6 pb-8 pt-6" style={{ 
          backgroundColor: 'var(--maroon-red)'
        }}>
          <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
            <button className="relative w-full overflow-hidden group">
              {/* Creative button design */}
              <div className="absolute inset-0" style={{ backgroundColor: 'var(--gold)' }} />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="w-8 h-[1px]" style={{ backgroundColor: 'var(--maroon-red)', opacity: 0.3 }} />
                <div className="w-8 h-[1px]" style={{ backgroundColor: 'var(--maroon-red)', opacity: 0.3 }} />
              </div>
              <div className="relative py-5 flex items-center justify-center">
                <span className="font-neue-haas text-[11px] uppercase tracking-[0.5em] font-medium" style={{ color: 'var(--maroon-red)' }}>
                  Reserve Your Spot
                </span>
              </div>
            </button>
          </HeroMobileButton>
          
          {/* Minimal info bar */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="font-neue-haas text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--gold)', opacity: 0.7 }}>
              19+
            </span>
            <span className="font-neue-haas text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--white)', opacity: 0.4 }}>
              Limited Capacity
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
