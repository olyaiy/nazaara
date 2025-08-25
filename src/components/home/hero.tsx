import Image from "next/image";
import { getFeaturedEvent } from "@/content/events";
import HeroMobile from "./hero-mobile";
import HeroButton from "./hero-button";

export default function Hero() {
  const featuredEvent = getFeaturedEvent();

  if (!featuredEvent) {
    return null;
  }

  // Parse artist names from the tour string - handle both & and , separators
  const artistNames = featuredEvent.tour?.replace('Featuring ', '').split(/[,&]/).map(name => name.trim()) || [];

  // Parse date for display
  const [day, month] = featuredEvent.date.split(' ');

  return (
    <>
      {/* Mobile Hero */}
      <div className="md:hidden">
        <HeroMobile />
      </div>
      
      {/* Desktop Hero */}
      <section className="hidden md:block relative min-h-[80dvh] overflow-hidden" style={{ backgroundColor: 'var(--maroon-red)' }}>
      {/* Shadow Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="var(--gold)" />
              <path d="M0 30 L30 0 L60 30 L30 60 Z" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        <div className="min-h-[80dvh] flex flex-col justify-center py-8 lg:py-0">
          {/* Editorial Composition */}
          <div className="relative">
            {/* Asymmetric Content Layout */}
            <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
              {/* Left Content - Editorial Style */}
              <div className="lg:col-span-6 space-y-3 lg:space-y-4 z-20 lg:pr-12">
                {/* Nazaara Live Presents Label */}
                <div className="flex items-center gap-4">
                  <div className="h-px w-12" style={{ backgroundColor: 'var(--gold)' }} />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-light" style={{ color: 'var(--gold)' }}>
                    Nazaara Live Presents
                  </span>
                </div>
                
                {/* Dynamic Title Composition */}
                <div className="space-y-0">
                  <div className="overflow-hidden">
                    <h1 className="text-[13vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-thin leading-[0.85] text-white">
                      {featuredEvent.artist}
                    </h1>
                  </div>
                  <div className="flex items-baseline gap-4 mt-3">
                    <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif italic" style={{ color: 'var(--gold)' }}>
                      {featuredEvent.title}
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                  </div>
                  {/* Tagline/Description */}
                  <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-lg font-light pt-3">
                    {featuredEvent.tagline}
                  </p>
                </div>
                
                {/* Featured Artists Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold)/60' }}>Featuring</span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.2 }} />
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {artistNames.map((artist, index) => (
                      <div key={index} className="flex items-baseline gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                        <p className="text-base font-serif text-white">{artist.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Details - Editorial Layout */}
                <div className="relative">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-16 h-px" style={{ backgroundColor: 'var(--gold)' }} />
                  
                  <div className="pt-5 space-y-3">
                    {/* Venue */}
                    <div className="flex items-start gap-8">
                      <div className="flex-1">
                        <p className="text-lg font-serif text-white mb-1">Fortune Sound Club</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Vancouver, British Columbia</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-thin text-white">10PM</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Late Night</p>
                      </div>
                    </div>
                    
                    {/* Bottom details strip */}
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
                      <span style={{ color: 'var(--gold)' }}>19+</span>
                      <div className="w-px h-3" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                      <span>ID Required</span>
                      <div className="w-px h-3" style={{ backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                      <span>4 Hour Session</span>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="flex items-center gap-6 pt-1">
                  <HeroButton eventSlug={featuredEvent.slug} />
                </div>
              </div>
              
              {/* Right - Creative Poster Layout */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-center">
                <HeroButton eventSlug={featuredEvent.slug} asChild>
                  <div className="relative w-full max-w-[360px] lg:max-w-[420px] cursor-pointer group">
                  {/* Geometric Frame Elements */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
                  
                  {/* Main Poster with Creative Crop */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 border" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
                    <Image
                      src={featuredEvent.image}
                      alt={featuredEvent.artist}
                      fill
                      className="object-cover scale-105"
                      priority
                    />
                    {/* Subtle Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
                    
                    {/* Status Badge - Bottom Left */}
                    <div className="absolute bottom-6 left-6">
                      <div className="px-3 py-1.5 backdrop-blur-sm border" style={{ backgroundColor: 'var(--maroon-red)/60', borderColor: 'var(--gold)' }}>
                        <p className="text-xs uppercase tracking-[0.3em] font-light" style={{ color: 'var(--gold)' }}>{featuredEvent.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Date Box - Outside Image */}
                  <div className="absolute -top-5 -right-5 w-16 h-16 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
                    <p className="text-xl font-serif font-light" style={{ color: 'var(--maroon-red)' }}>{day}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--maroon-red)' }}>{month}</p>
                  </div>
                  
                  {/* Side Typography Element */}
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                    <span className="text-xs uppercase tracking-[0.8em] text-white/20 font-light">
                      Vancouver Launch
                    </span>
                  </div>
                  </div>
                </HeroButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}