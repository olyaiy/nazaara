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
  const artistNames = featuredEvent.tour?.replace('Featuring ', '').split(/[,&]/).map(name => name.trim()) || [];
  const [day, month] = featuredEvent.date.split(' ');

  return (
    <section className="relative min-h-[100dvh] overflow-hidden" style={{ backgroundColor: 'var(--maroon-red)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern-mobile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.5" fill="var(--gold)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern-mobile)" />
        </svg>
      </div>
      
      <div className="relative flex flex-col min-h-[100dvh] px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8" style={{ backgroundColor: 'var(--gold)' }} />
          <span className="text-[9px] uppercase tracking-[0.3em] font-light" style={{ color: 'var(--gold)' }}>
            Nazaara Live Presents
          </span>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h1 className="text-[15vw] font-serif font-thin leading-[0.9] text-white mb-2">
                {featuredEvent.artist}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-[6.5vw] font-serif italic" style={{ color: 'var(--gold)' }}>
                  {featuredEvent.title}
                </span>
              </div>
            </div>
            
            <HeroMobileButton eventSlug={featuredEvent.slug} asChild>
              <div className="relative aspect-[4/5] mx-auto max-w-[280px] w-full cursor-pointer">
              <div className="absolute inset-0 border" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.artist}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 right-3 w-14 h-14 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
                <p className="text-lg font-serif font-light" style={{ color: 'var(--maroon-red)' }}>{day}</p>
                <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'var(--maroon-red)' }}>{month}</p>
              </div>
              </div>
            </HeroMobileButton>
            
            <div className="space-y-4">
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {featuredEvent.tagline}
              </p>
              
              {artistNames.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--gold)/60' }}>Featuring</span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.2 }} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {artistNames.map((artist, index) => (
                      <div key={index} className="flex items-baseline gap-1.5">
                        <div className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                        <p className="text-sm font-serif text-white">{artist.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t" style={{ borderColor: 'var(--gold)', opacity: 0.2 }}>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base font-serif text-white">Fortune Sound Club</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">Vancouver, BC</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-thin text-white">10PM</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">Late Night</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    <span style={{ color: 'var(--gold)' }}>19+</span>
                    <div className="w-px h-3" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                    <span>ID Required</span>
                    <div className="w-px h-3" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                    <span>4HR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pb-safe pt-6">
            <HeroMobileButton eventSlug={featuredEvent.slug} />
          </div>
        </div>
      </div>
    </section>
  )
}