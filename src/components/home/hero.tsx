
'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getFeaturedEvent } from "@/content/events";

export default function Hero() {
  const featuredEvent = getFeaturedEvent();

  if (!featuredEvent) {
    return null;
  }

  // Parse artist names from the tour string - handle both & and , separators
  const artistNames = featuredEvent.tour?.replace('Featuring ', '').split(/[,&]/).map(name => name.trim()) || [];

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--maroon-red)' }}>
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="var(--gold)" />
              <path d="M0 30 L30 0 L60 30 L30 60 Z" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col justify-center py-12 lg:py-0">
          {/* Editorial Composition */}
          <div className="relative">
            {/* Asymmetric Content Layout */}
            <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
              {/* Left Content - Editorial Style */}
              <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-20 lg:pr-12">
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
                    <h1 className="text-[15vw] sm:text-8xl md:text-9xl lg:text-[10rem] font-serif font-thin leading-[0.8] text-white">
                      {featuredEvent.artist}
                    </h1>
                  </div>
                  <div className="flex items-baseline gap-4 mt-6">
                    <span className="text-5xl md:text-6xl lg:text-7xl font-serif italic" style={{ color: 'var(--gold)' }}>
                      {featuredEvent.title}
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                  </div>
                  {/* Tagline/Description */}
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg font-light pt-6">
                    {featuredEvent.tagline}
                  </p>
                </div>
                
                {/* Featured Artists Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold)/60' }}>Featuring</span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--gold)', opacity: 0.2 }} />
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {artistNames.map((artist, index) => (
                      <div key={index} className="flex items-baseline gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                        <p className="text-xl font-serif text-white">{artist.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Details - Editorial Layout */}
                <div className="relative">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-16 h-px" style={{ backgroundColor: 'var(--gold)' }} />
                  
                  <div className="pt-8 space-y-6">
                    {/* Venue */}
                    <div className="flex items-start gap-8">
                      <div className="flex-1">
                        <p className="text-2xl font-serif text-white mb-1">Fortune Sound Club</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Vancouver, British Columbia</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-thin text-white">10PM</p>
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
                <div className="flex items-center gap-6 pt-4">
                  <Button 
                    size="lg"
                    className="px-10 py-6 text-xs uppercase tracking-[0.3em] font-light border-0"
                    style={{ 
                      backgroundColor: 'var(--gold)', 
                      color: 'var(--maroon-red)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Secure Tickets · ${featuredEvent.price}
                  </Button>
                  <button 
                    className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
                    style={{ transition: 'color 0.3s' }}
                  >
                    Event Details
                  </button>
                </div>
              </div>
              
              {/* Right - Creative Poster Layout */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[480px] lg:max-w-[560px]">
                  {/* Geometric Frame Elements */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
                  
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
                    <div className="absolute bottom-8 left-8">
                      <div className="px-4 py-2 backdrop-blur-sm border" style={{ backgroundColor: 'var(--maroon-red)/60', borderColor: 'var(--gold)' }}>
                        <p className="text-xs uppercase tracking-[0.3em] font-light" style={{ color: 'var(--gold)' }}>{featuredEvent.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Date Box - Outside Image */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
                    <p className="text-3xl font-serif font-light" style={{ color: 'var(--maroon-red)' }}>31</p>
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--maroon-red)' }}>August</p>
                  </div>
                  
                  {/* Side Typography Element */}
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                    <span className="text-xs uppercase tracking-[0.8em] text-white/20 font-light">
                      Vancouver Launch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
