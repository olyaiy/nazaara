'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedEvent, getUpcomingEvents } from "@/content/events";

export default function Home() {
  const featuredEvent = getFeaturedEvent();
  const upcomingEvents = getUpcomingEvents();

  if (!featuredEvent) {
    return null;
  }

  // Parse artist names from the tour string - handle both & and , separators
  const artistNames = featuredEvent.tour?.replace('Featuring ', '').split(/[,&]/).map(name => name.trim()) || [];


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Luxury Editorial Hero - Creative Typography & Brand Colors */}
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
              {/* Massive Split Typography Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-20 top-1/2 -translate-y-1/2">
                  <span className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-serif font-thin leading-none select-none opacity-5" style={{ color: 'var(--gold)' }}>
                    N
                  </span>
                </div>
                <div className="absolute -right-20 top-1/2 -translate-y-1/2">
                  <span className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-serif font-thin leading-none select-none opacity-5" style={{ color: 'var(--gold)' }}>
                    Z
                  </span>
                </div>
              </div>
              
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
                  
                  {/* Artists Grid - Enhanced Typography */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {artistNames.map((artist, index) => (
                      <div key={index} className="border-l-2 pl-4" style={{ borderColor: 'var(--gold)' }}>
                        <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--gold)' }}>Artist</p>
                        <p className="text-lg font-serif text-white">{artist.trim()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Venue & Time Strip - More Visible */}
                  <div className="flex items-center gap-6 py-5 border-y-2" style={{ borderColor: 'var(--gold)', opacity: 0.4 }}>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light">Fortune Sound Club</p>
                    </div>
                    <div className="w-px h-5" style={{ backgroundColor: 'var(--gold)' }} />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light">10PM - 2AM</p>
                    </div>
                    <div className="w-px h-5" style={{ backgroundColor: 'var(--gold)' }} />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light">19+ Event</p>
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
                      
                      {/* Date Overlay - Diagonal Banner Style */}
                      <div className="absolute top-12 -right-8 transform rotate-45 origin-center">
                        <div className="px-12 py-3" style={{ backgroundColor: 'var(--gold)' }}>
                          <p className="text-sm font-bold uppercase tracking-wider text-center" style={{ color: 'var(--maroon-red)' }}>
                            31 AUG 2024
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Badge - Bottom Left */}
                      <div className="absolute bottom-8 left-8">
                        <div className="px-4 py-2 backdrop-blur-sm border" style={{ backgroundColor: 'var(--maroon-red)/60', borderColor: 'var(--gold)' }}>
                          <p className="text-xs uppercase tracking-[0.3em] font-light" style={{ color: 'var(--gold)' }}>{featuredEvent.status}</p>
                        </div>
                      </div>
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
              
              {/* Bottom Editorial Elements */}
              <div className="flex items-center justify-between mt-16 lg:mt-20">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
                  <div className="w-px h-12" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-[2px]" style={{ backgroundColor: 'var(--gold)' }} />
                  <div className="w-12 h-[2px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                  <div className="w-12 h-[2px]" style={{ backgroundColor: 'var(--gold)', opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border/50" />
      </div>

      {/* Events Section - Featured & Complete List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-light">Upcoming Events</span>
              </div>
              <button className="text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
                View Full Calendar
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
              Signature
              <span className="block font-serif italic text-primary">Experiences</span>
            </h2>
          </div>

          {/* Asymmetric Luxury Grid */}
          <div className="grid lg:grid-cols-12 gap-6 mb-24">
            {/* Primary Featured Event - Takes 7 columns */}
            <div className="lg:col-span-7 group cursor-pointer">
              <div className="relative h-[450px] overflow-hidden">
                <Image 
                  src={upcomingEvents[0].image}
                  alt={upcomingEvents[0].artist}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-background/10 backdrop-blur-sm text-foreground/90 text-xs uppercase tracking-wider border border-foreground/10">
                      {upcomingEvents[0].status}
                    </span>
                    <div className="text-right">
                      <div className="text-3xl font-serif font-light text-foreground/90">{upcomingEvents[0].number}</div>
                    </div>
                  </div>
                  
                  {/* Bottom Content */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-2">
                      {upcomingEvents[0].artist}
                    </h3>
                    <p className="text-lg font-light text-foreground/80 mb-4">{upcomingEvents[0].title}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-foreground/60 uppercase tracking-wider">{upcomingEvents[0].date} {upcomingEvents[0].year}</p>
                        <p className="text-sm text-foreground/60">{upcomingEvents[0].venue}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-1">From</div>
                        <div className="text-2xl font-light text-primary">${upcomingEvents[0].price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary Featured Events - Takes 5 columns, stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {upcomingEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="group cursor-pointer flex-1">
                  <div className="relative h-full min-h-[213px] overflow-hidden">
                    <Image 
                      src={event.image}
                      alt={event.artist}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    
                    {/* Minimal Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs uppercase tracking-wider text-foreground/70">
                          {event.status}
                        </span>
                        <div className="text-2xl font-serif font-light text-foreground/80">{event.number}</div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-serif font-light text-foreground mb-1">
                          {event.artist}
                        </h3>
                        <p className="text-sm text-foreground/70 mb-3">{event.title}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-foreground/60 uppercase tracking-wider">
                            {event.date} · {event.venue}
                          </p>
                          <span className="text-lg font-light text-primary">${event.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events List - Editorial Style */}
          <div className="space-y-px">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group">
                <div className="grid lg:grid-cols-12 gap-4 py-8 border-b border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="text-5xl font-serif font-light text-muted-foreground/30">
                      {event.number}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="lg:col-span-2">
                    <div className="relative h-24 w-full overflow-hidden">
                      <Image 
                        src={event.image}
                        alt={event.artist}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-background/20" />
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="lg:col-span-6 flex items-center">
                    <div>
                      <h3 className="text-2xl font-serif font-light text-foreground group-hover:text-primary transition-colors">
                        {event.artist}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light mt-1">
                        {event.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Date & Venue */}
                  <div className="lg:col-span-2 flex items-center">
                    <div className="text-right lg:text-left">
                      <div className="text-lg font-light text-foreground">
                        {event.date}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price & Status */}
                  <div className="lg:col-span-1 flex items-center justify-end">
                    <div className="text-right">
                      <div className="text-xl font-light text-primary">
                        ${event.price}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {event.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-serif font-light text-primary mb-2">500K</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tickets Sold</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-light text-primary mb-2">150</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Global Cities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-light text-primary mb-2">200</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Artists</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-light text-primary mb-2">10</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events - Luxury Focus */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image Collage */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                  alt="Luxury event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden border-8 border-background">
                <Image 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                  alt="Private performance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right Content */}
            <div className="lg:pl-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-light">Private Events</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                Bespoke
                <span className="block font-serif italic text-primary">Entertainment</span>
              </h2>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Curate unforgettable moments with exclusive access to the world&apos;s most celebrated 
                South Asian artists. From intimate soirées to grand celebrations, we orchestrate 
                extraordinary experiences tailored to your vision.
              </p>
              
              {/* Service List - Minimal */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="font-light text-foreground mb-1">Celebrity Performances</h3>
                    <p className="text-sm text-muted-foreground font-light">Exclusive bookings of A-list artists</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="font-light text-foreground mb-1">Luxury Weddings</h3>
                    <p className="text-sm text-muted-foreground font-light">Bespoke entertainment curation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="font-light text-foreground mb-1">Corporate Excellence</h3>
                    <p className="text-sm text-muted-foreground font-light">High-profile keynotes and performances</p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-sm uppercase tracking-wider font-light"
              >
                Begin Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About & Partners - Minimal Luxury */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-light">Since 2014</span>
              <div className="w-8 h-px bg-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-8">
              The Premier Name in
              <span className="block font-serif italic text-primary">South Asian Entertainment</span>
            </h2>
            
            <p className="text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              For over a decade, Nazaara Live has set the standard for excellence in South Asian 
              entertainment production. We are the trusted partner for the world&apos;s most prestigious 
              venues and discerning clients.
            </p>
            
            {/* Minimal Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
              <div>
                <div className="text-3xl font-serif font-light text-primary">500+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Productions</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-primary">150+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Partners</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-primary">98%</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Excellence</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <button className="text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button className="text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
                Partnerships
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer CTA */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-light text-foreground mb-4">
              Stay <span className="italic text-primary">Informed</span>
            </h3>
            <p className="text-sm text-muted-foreground font-light mb-8">
              Receive exclusive presale access and curated event announcements
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm uppercase tracking-wider font-light"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>






    </div>
  );
}

  
