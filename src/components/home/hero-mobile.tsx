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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern-mobile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="var(--gold)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern-mobile)" />
        </svg>
      </div>
      
      <div className="relative flex flex-col min-h-[100dvh] px-5 py-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--gold)' }} />
          <span className="text-[10px] uppercase tracking-[0.35em] font-light" style={{ color: 'var(--gold)' }}>
            Nazaara Live Presents
          </span>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="space-y-8 flex-1">
            <div>
              <h1 className="text-[13vw] font-serif font-thin leading-[0.85] text-white mb-3">
                {featuredEvent.title}
              </h1>
              {featuredEvent.tagline && (
                <div className="flex items-baseline gap-3">
                  <span className="text-[5.5vw] font-serif italic" style={{ color: 'var(--gold)' }}>
                    {featuredEvent.tagline}
                  </span>
                </div>
              )}
            </div>
            
            <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
              <div className="relative aspect-[3/4] mx-auto max-w-[320px] w-full cursor-pointer group">
              <div className="absolute inset-0 border-2 group-hover:scale-[1.02] transition-transform duration-300" style={{ borderColor: 'var(--gold)', opacity: 0.4 }} />
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 w-16 h-16 flex flex-col items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--gold)' }}>
                <p className="text-xl font-serif font-light leading-none" style={{ color: 'var(--maroon-red)' }}>{day}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] mt-0.5" style={{ color: 'var(--maroon-red)' }}>{month}</p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/80">Tap to view details</p>
              </div>
              </div>
            </HeroMobileButton>
            
            <div className="space-y-5">
              {artistNames.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--gold)' }}>Featuring</span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {artistNames.map((artist, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                        <p className="text-sm font-serif text-white/90">{artist.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-5" style={{ borderColor: 'var(--gold)', opacity: 0.3 }}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-serif text-white mb-1">Fortune Sound Club</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Vancouver, BC</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-serif" style={{ color: 'var(--gold)' }}>19+</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">ID Required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pb-safe pt-8 sticky bottom-0" style={{ backgroundColor: 'var(--maroon-red)' }}>
            <HeroMobileButton eventSlug={featuredEvent.slug} />
          </div>
        </div>
      </div>
    </section>
  )
}
