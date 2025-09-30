import UpcomingEvents from "@/components/home/upcoming-events";
import { EventMarquee } from "@/components/home/event-marquee";
import Hero from "@/components/home/hero";
import { getPublicEvents } from "@/lib/public-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nazaara Live - Premium South Asian Entertainment Worldwide",
  description: "Experience culture, sound and entertainment without borders. From Bollywood concerts to private celebrity bookings, we create extraordinary moments across 150+ global cities.",
  keywords: ["South Asian events", "Bollywood concerts", "Indian music", "celebrity bookings", "private events", "DJ services", "entertainment"],
  openGraph: {
    title: "Nazaara Live - Premium South Asian Entertainment Worldwide",
    description: "Experience culture, sound and entertainment without borders. From Bollywood concerts to private celebrity bookings, we create extraordinary moments across 150+ global cities.",
    url: "https://nazaara.live",
    siteName: "Nazaara Live",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "Nazaara Live - Premium South Asian Entertainment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazaara Live - Premium South Asian Entertainment Worldwide",
    description: "Experience culture, sound and entertainment without borders. From Bollywood concerts to private celebrity bookings, we create extraordinary moments across 150+ global cities.",
    images: ["/OG.png"],
  },
};

export default async function Home() {
  // Fetch events for the marquee
  const events = await getPublicEvents();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Event Marquee - Animated Transition */}
      <EventMarquee events={events} />

      <UpcomingEvents />

      {/* Premium Stats removed as requested */}

      {/* Private Events - Luxury Focus */}
      {/* TEMPORARILY HIDDEN - Will be brought back later
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background accent */}
        {/*<div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)] via-transparent to-[var(--dark-gold-gradient)] opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Full-width header above the two columns */}
          {/*<SectionHeader eyebrow="Private Bookings" title="Bespoke Entertainment" size="md" className="mb-10 md:mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
            {/* Left Image Composition - Elevated Design */}
            {/*<div className="relative h-[380px] md:h-[450px] lg:h-[500px] order-2 lg:order-1">
              {/* Gold accent frame */}
              {/*<div className="absolute -top-3 -left-3 w-24 h-24 border-t border-l border-[var(--gold)] opacity-50" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b border-r border-[var(--gold)] opacity-50" />
              
              {/* Main large image */}
              {/*<div className="absolute top-0 left-0 w-3/4 h-3/4 overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                  alt="Luxury event"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Offset smaller image */}
              {/*<div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden shadow-2xl border-8 border-background">
                <Image 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                  alt="Private performance"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating accent element */}
              {/*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-[var(--gold)]/30 rotate-45" />
            </div>
            
            {/* Right Content - Refined Typography */}
            {/*<div className="lg:pl-8 order-1 lg:order-2">
              {/* Opening statement with enhanced typography */}
              {/*<p className="text-lg md:text-xl font-serif font-light leading-relaxed mb-6 md:mb-8" style={{ color: 'var(--gold)' }}>
                Curate unforgettable moments with exclusive access to the world&apos;s most celebrated 
                South Asian artists.
              </p>
              
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-8 md:mb-10">
                From intimate soirées to grand celebrations, we orchestrate 
                extraordinary experiences tailored to your vision.
              </p>
              
              {/* Service List - Elevated Design */}
              {/*<div className="grid gap-8 mb-8 md:mb-12">
                <div className="group relative flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl font-serif font-light text-foreground mb-2">Celebrity Performances</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">Exclusive bookings of A-list artists from Bollywood and beyond</p>
                  </div>
                </div>
                
                <div className="group relative flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl font-serif font-light text-foreground mb-2">Luxury Weddings</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">Bespoke entertainment curation for your most precious moments</p>
                  </div>
                </div>
                
                <div className="group relative flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl font-serif font-light text-foreground mb-2">Private Celebrations</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">Intimate gatherings with world-class entertainment</p>
                  </div>
                </div>
              </div>
              
              {/* CTA - Simple design like About section */}
              {/*<Button 
                asChild
                className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm uppercase tracking-wider font-light border-0"
                style={{ 
                  backgroundColor: 'var(--gold)', 
                  color: 'var(--maroon-red)'
                }}
              >
                <Link href="/bookings">Inquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* About Preview Section */}
      {/* TEMPORARILY HIDDEN - Will be brought back later
      <section className="py-16 md:py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          {/* Consistent Section Header */}
          {/*<SectionHeader
            eyebrow="Est. 2022"
            title="About Nazaara"
            size="md"
            className="mb-8 md:mb-16"
          />
          
          <div className="mx-auto">
            {/* Main Content Grid */}
            {/*<div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-8 md:mb-16">
              {/* Left - Story Preview */}
              {/*<div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-foreground mb-2">
                  Experience, Culture, and Sound
                </h3>
                <span className="text-xl md:text-2xl lg:text-3xl font-serif italic text-[var(--gold)] block mb-6 md:mb-8">Without Borders</span>
                
                <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-4 md:mb-6">
                  Nazaara launched in 2022 as a platform for experience, culture, and sound—without borders. 
                  It emerged from a simple belief: that the scenes we believe in and the sounds that raised us 
                  deserve a global stage.
                </p>
                
                <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-6 md:mb-8">
                  From Tamasha&apos;s high-voltage shows to new cross-cultural collaborations, we build across 
                  genres, mediums, and communities. We honor roots while expanding the frame.
                </p>
                
                {/* Learn More CTA */}
                {/*<Button 
                  asChild
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm uppercase tracking-wider font-light group border-0"
                  style={{ 
                    backgroundColor: 'var(--gold)', 
                    color: 'var(--maroon-red)'
                  }}
                >
                  <Link href="/about">
                    Discover Our Story
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              
              {/* Right - Impact Numbers */}
              {/*<div>
                <div className="space-y-6 md:space-y-8">
                  {/* Top row */}
                  {/*<div className="flex gap-6 md:gap-8">
                    <div className="flex-1">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[var(--gold)] mb-1 md:mb-2">500K+</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">Hearts Touched</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[var(--gold)] mb-1 md:mb-2">150+</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">Global Cities</div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  {/*<div className="h-px bg-[var(--gold)]/20" />
                  
                  {/* Bottom row */}
                  {/*<div className="flex gap-6 md:gap-8">
                    <div className="flex-1">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[var(--gold)] mb-1 md:mb-2">200+</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">Artist Partners</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[var(--gold)] mb-1 md:mb-2">30+</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">Countries</div>
                    </div>
                  </div>
                  
                  {/* Bottom accent */}
                  {/*<div className="pt-6 md:pt-8">
                    <p className="text-base md:text-lg font-serif font-light text-foreground">
                      The premier name in <span className="italic text-[var(--gold)]">South Asian entertainment</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      */}

      






    </div>
  );
}


  
