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
    <section className="relative min-h-[92vh] overflow-hidden bg-background">
      {/* Background art: subtle poster wash + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={featuredEvent.image}
          alt="Background texture"
          fill
          priority
          className="object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-[var(--dark-green)]/40" />
        <div className="absolute inset-0 opacity-[.18] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[length:120px_120px] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,.12)_0,rgba(255,255,255,.12)_1px,transparent_1px,transparent_120px),repeating-linear-gradient(to_bottom,rgba(255,255,255,.12)_0,rgba(255,255,255,.12)_1px,transparent_1px,transparent_120px)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-6 py-14 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Typographic lockup */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-7">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/60" />
              <span className="font-neue-haas text-[11px] uppercase tracking-[0.5em] text-primary/90">Nazaara Live Presents</span>
            </div>
            <h1 className="font-prettywise text-6xl leading-[0.85] text-foreground sm:text-7xl lg:text-8xl xl:text-[10rem]">
              {featuredEvent.artist}
            </h1>
            <div className="flex flex-wrap items-end gap-4">
              <p className="font-prettywise text-2xl text-primary sm:text-3xl lg:text-4xl">{featuredEvent.title}</p>
              <span className="font-neue-haas text-xs uppercase tracking-[0.35em] text-foreground/60">{featuredEvent.city}, {featuredEvent.country}</span>
            </div>
            <p className="max-w-2xl font-neue-haas text-base leading-relaxed text-foreground/85">
              {featuredEvent.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button className="px-8 py-6 text-sm uppercase tracking-[0.35em]">Reserve Experience</Button>
              <Button variant="outline" className="px-8 py-6 text-sm uppercase tracking-[0.35em]">
                Explore Lineup
              </Button>
            </div>
          </div>

          {/* Right: Elevated event card */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative rounded-sm border border-primary/20 bg-background/50 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md ring-1 ring-primary/30">
              {/* Card header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20" />
                  <span className="font-neue-haas text-[11px] uppercase tracking-[0.4em] text-primary">Featured Event</span>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <div className="text-center leading-none">
                    <p className="font-prettywise text-lg">31</p>
                    <p className="font-neue-haas text-[9px] uppercase tracking-[0.25em] opacity-90">Aug</p>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Date & Time</p>
                    <p className="font-neue-haas text-sm">Sunday, August 31</p>
                    <p className="font-neue-haas text-sm text-foreground/70">10:00 PM - 2:00 AM</p>
                  </div>
                  <div>
                    <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Location</p>
                    <p className="font-neue-haas text-sm">Fortune Sound Club</p>
                    <p className="font-neue-haas text-sm text-foreground/70">Vancouver, Canada</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Artists</p>
                    <p className="font-neue-haas text-sm">Yasmina</p>
                    <p className="font-neue-haas text-sm">Sabzi</p>
                    <p className="font-neue-haas text-sm">Wian</p>
                  </div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="mt-8 space-y-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-prettywise text-5xl text-primary">${featuredEvent.price}</span>
                  <span className="font-neue-haas text-sm uppercase tracking-wider text-primary/70">CAD</span>
                  <span className="ml-4 rounded-full bg-primary/10 px-3 py-1 font-neue-haas text-[10px] uppercase tracking-[0.25em] text-primary/90">
                    {featuredEvent.availability}% Available
                  </span>
                </div>
                <Button className="w-full px-8 py-5 text-sm uppercase tracking-[0.35em]">Reserve Your Experience</Button>
                {/* Availability meter */}
                <div className="relative h-[2px] w-full overflow-hidden rounded bg-primary/15">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ width: `${featuredEvent.availability}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-neue-haas uppercase tracking-[0.3em] text-foreground/60">
                  <span>19+ Event</span>
                  <span>Valid ID Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="mx-auto h-6 w-px bg-foreground/30" />
        <p className="mt-2 font-neue-haas text-[10px] uppercase tracking-[0.3em] text-foreground/60">Scroll</p>
      </div>
    </section>
  )
}
