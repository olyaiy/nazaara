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
      {/* Ambient luxury glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[var(--dark-green)]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-screen-2xl flex-col items-stretch gap-8 px-6 py-10 lg:flex-row lg:gap-10 lg:px-10 lg:py-16">
        {/* Left: Poster Showcase */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-[520px] lg:max-w-[620px]">
            {/* Double frame with soft shadow */}
            <div className="absolute -inset-1 rounded-sm ring-1 ring-primary/40" />
            <div className="absolute -inset-[6px] rounded-sm bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-border/40">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.artist}
                fill
                className="object-cover"
                priority
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5))]" />
            </div>

            {/* Medallion date badge */}
            <div className="absolute -right-6 -top-6 grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-1 rounded-full ring-1 ring-[color:oklch(0.4_0.12_75)/40]" />
              <div className="text-center">
                <p className="font-prettywise text-2xl leading-none">31</p>
                <p className="font-neue-haas text-[10px] uppercase tracking-[0.3em] opacity-90">Aug</p>
              </div>
            </div>

            {/* Corner filigree accents */}
            <div className="absolute -left-2 -top-2 h-12 w-12 rounded-sm border-l border-t border-primary/30" />
            <div className="absolute -left-2 -bottom-2 h-12 w-12 rounded-sm border-b border-l border-primary/30" />
          </div>
        </div>

        {/* Right: Event Details */}
        <div className="relative lg:w-[560px] xl:w-[660px]">
          {/* Divider accent */}
          <div className="absolute -left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:-left-8" />

          <div className="h-full w-full space-y-8 lg:space-y-10">
            {/* Kicker */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/60" />
              <span className="font-neue-haas text-[11px] uppercase tracking-[0.5em] text-primary/90">Featured Event</span>
              <div className="h-px flex-1 bg-primary/60" />
            </div>

            {/* Title treatment */}
            <div className="space-y-3">
              <h1 className="font-prettywise text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
                {featuredEvent.artist}
              </h1>
              <p className="font-prettywise text-2xl text-primary sm:text-3xl lg:text-4xl">
                {featuredEvent.title}
              </p>
            </div>

            {/* Tagline */}
            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-transparent lg:-left-8" />
              <p className="font-neue-haas text-base leading-relaxed text-foreground/80">
                {featuredEvent.tagline}
              </p>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-6 border-y border-primary/20 py-8">
              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Date & Time</p>
                  <p className="font-neue-haas text-sm text-foreground">Sunday, August 31</p>
                  <p className="font-neue-haas text-sm text-foreground/70">10:00 PM - 2:00 AM</p>
                </div>
                <div>
                  <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Location</p>
                  <p className="font-neue-haas text-sm text-foreground">Fortune Sound Club</p>
                  <p className="font-neue-haas text-sm text-foreground/70">Vancouver, Canada</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-neue-haas text-[10px] uppercase tracking-[0.4em] text-primary/70">Artists</p>
                  <p className="font-neue-haas text-sm text-foreground">Yasmina</p>
                  <p className="font-neue-haas text-sm text-foreground">Sabzi</p>
                  <p className="font-neue-haas text-sm text-foreground">Wian</p>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-baseline gap-2">
                <span className="font-prettywise text-5xl text-primary sm:text-6xl">${featuredEvent.price}</span>
                <span className="font-neue-haas text-sm uppercase tracking-wider text-primary/70">CAD</span>
                <span className="ml-4 rounded-full bg-primary/10 px-3 py-1 font-neue-haas text-[10px] uppercase tracking-[0.25em] text-primary/90">
                  {featuredEvent.availability}% Available
                </span>
              </div>

              <button className="group relative w-full overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] translate-x-[-120%] transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
                <div className="relative px-8 py-5 font-neue-haas text-sm uppercase tracking-[0.4em] text-primary-foreground">
                  Reserve Your Experience
                </div>
              </button>

              <div className="flex items-center justify-center gap-4 font-neue-haas text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                <span>19+ Event</span>
                <span className="h-1 w-1 rounded-full bg-primary/40" />
                <span>Valid ID Required</span>
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
