
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import UpcomingEvents from "@/components/home/upcoming-events";
import { EventMarquee } from "@/components/home/event-marquee";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Event Marquee - Animated Transition */}
      <EventMarquee />

      <UpcomingEvents />

      {/* Premium Stats removed as requested */}

      {/* Private Events - Luxury Focus */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Full-width header above the two columns */}
          <SectionHeader eyebrow="Private Bookings" title="Bespoke Entertainment" size="md" className="mb-8 md:mb-16" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Image Collage - Mobile optimized */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                  alt="Luxury event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden border-4 md:border-8 border-background">
                <Image 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                  alt="Private performance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right Content - Mobile optimized */}
            <div className="lg:pl-12 order-1 lg:order-2">
              
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-6 md:mb-8">
                Curate unforgettable moments with exclusive access to the world&apos;s most celebrated 
                South Asian artists. From intimate soirées to grand celebrations, we orchestrate 
                extraordinary experiences tailored to your vision.
              </p>
              
              {/* Service List - Minimal */}
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-base md:text-lg font-light text-foreground mb-1">Celebrity Performances</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light">Exclusive bookings of A-list artists</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-base md:text-lg font-light text-foreground mb-1">Luxury Weddings</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light">Bespoke entertainment curation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-base md:text-lg font-light text-foreground mb-1">Corporate Excellence</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-light">High-profile keynotes and performances</p>
                  </div>
                </div>
              </div>
              
              <Button
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

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          {/* Consistent Section Header */}
          <SectionHeader
            eyebrow="Est. 2022"
            title="About Nazaara"
            size="md"
            className="mb-8 md:mb-16"
          />
          
          <div className="mx-auto">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-8 md:mb-16">
              {/* Left - Story Preview */}
              <div>
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
                <Button 
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm uppercase tracking-wider font-light group border-0"
                  style={{ 
                    backgroundColor: 'var(--gold)', 
                    color: 'var(--maroon-red)'
                  }}
                >
                  Discover Our Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              {/* Right - Impact Numbers */}
              <div>
                <div className="space-y-6 md:space-y-8">
                  {/* Top row */}
                  <div className="flex gap-6 md:gap-8">
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
                  <div className="h-px bg-[var(--gold)]/20" />
                  
                  {/* Bottom row */}
                  <div className="flex gap-6 md:gap-8">
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
                  <div className="pt-6 md:pt-8">
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

      






    </div>
  );
}


  
