import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import UpcomingEvents from "@/components/home/upcoming-events";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Elegant Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border/50" />
      </div>

      <UpcomingEvents />

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

  
function Hero() {
  const featuredEvent = {
    id: 1,
    artist: "NAZAARA",
    title: "Vancouver Launch",
    tagline: "Vancouver, we begin here. Step into a soundscape built to move you.",
    tour: "Featuring Yasmina, Sabzi & Wian",
    description: "An evening shaped by music, culture, and movement at Vancouver's most iconic dance floor. Three continents of sound converge for one unforgettable night.",
    dates: "Sunday, August 31 · 10:00 pm - 2:00 am",
    venue: "Fortune Sound Club, Vancouver",
    city: "Vancouver",
    country: "Canada",
    image: "/events/nazaaea live poster.webp",
    price: "25",
    availability: 75
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--maroon-red)]">
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)]/95 to-[var(--dark-green)]" />
      
      <div className="relative h-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Poster Showcase */}
        <div className="relative flex-1 lg:flex-[1.3] flex items-center justify-center p-8 lg:p-16">
          <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
            {/* Gold accent frame */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-[var(--gold)] via-[var(--gold)]/50 to-transparent opacity-60" />
            <div className="absolute -inset-[1px] bg-[var(--maroon-red)]" />
            
            {/* Main Poster with enhanced presentation */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--dark-green)]/20">
              <Image 
                src={featuredEvent.image}
                alt={featuredEvent.artist}
                fill
                className="object-cover"
                priority
              />
              {/* Premium vignette effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-green)]/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating gold accent elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--gold)] flex flex-col items-center justify-center">
              <p className="text-3xl font-prettywise text-[var(--maroon-red)]">31</p>
              <p className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">August</p>
            </div>
            
            {/* Corner accents */}
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-[var(--gold)]/40" />
            <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-[var(--gold)]/40" />
          </div>
        </div>
        
        {/* Right Panel - Event Details */}
        <div className="relative lg:w-[550px] xl:w-[650px] flex items-center bg-gradient-to-b from-transparent via-[var(--maroon-red)]/50 to-[var(--maroon-red)]">
          {/* Gold accent line */}
          <div className="absolute left-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)]/50 to-transparent" />
          
          <div className="w-full p-10 lg:p-16 xl:p-20 space-y-10">
            {/* Premium Badge */}
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[var(--gold)]/60" />
              <span className="text-[11px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)] font-light">Featured Event</span>
              <div className="h-[1px] flex-1 bg-[var(--gold)]/60" />
            </div>
            
            {/* Title Treatment */}
            <div className="space-y-4">
              <h1 className="text-7xl lg:text-8xl xl:text-9xl font-prettywise font-light leading-[0.85] text-[var(--white)]">
                {featuredEvent.artist}
              </h1>
              <p className="text-3xl lg:text-4xl font-prettywise text-[var(--gold)]">
                {featuredEvent.title}
              </p>
            </div>
            
            {/* Tagline with gold accent */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--gold)] to-transparent" />
              <p className="text-base font-neue-haas text-[var(--white)]/80 leading-relaxed pl-0">
                {featuredEvent.tagline}
              </p>
            </div>
            
            {/* Event Info - Refined Grid */}
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-[var(--gold)]/20">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/70 mb-2">Date & Time</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]">Sunday, August 31</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]/70">10:00 PM - 2:00 AM</p>
                </div>
                <div>
                  <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/70 mb-2">Location</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]">Fortune Sound Club</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]/70">Vancouver, Canada</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/70 mb-2">Artists</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]">Yasmina</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]">Sabzi</p>
                  <p className="text-sm font-neue-haas text-[var(--white)]">Wian</p>
                </div>
              </div>
            </div>
            
            {/* Price & CTA */}
            <div className="space-y-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-prettywise text-[var(--gold)]">${featuredEvent.price}</span>
                <span className="text-sm font-neue-haas text-[var(--gold)]/70 uppercase tracking-wider">CAD</span>
              </div>
              
              {/* Custom premium button */}
              <button className="relative w-full group overflow-hidden">
                <div className="absolute inset-0 bg-[var(--gold)] transform transition-transform duration-500 group-hover:scale-x-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] to-[var(--dark-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative px-8 py-5 text-[var(--maroon-red)] font-neue-haas text-sm uppercase tracking-[0.4em] font-medium">
                  Reserve Your Experience
                </div>
              </button>
              
              {/* Refined info */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/50">
                <span>19+ Event</span>
                <span className="w-1 h-1 bg-[var(--gold)]/40 rounded-full" />
                <span>Valid ID Required</span>
                <span className="w-1 h-1 bg-[var(--gold)]/40 rounded-full" />
                <span>{featuredEvent.availability}% Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--maroon-red)] to-transparent pointer-events-none" />
    </section>
  )
}
