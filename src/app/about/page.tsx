import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Users, Globe2, Trophy, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background image with brand scrims */}
        <Image
          src="/about-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* Dark scrim for readability */}
        <div className="absolute inset-0 bg-[var(--charcoal)]/40" />
        {/* Maroon tint gradient to match brand */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon-red)]/20 to-transparent" />
        {/* Centered gold accent at the exact bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9]">
          <div className="relative w-full max-w-7xl mx-auto px-4">
            {/* Upward glow from the edge (fades horizontally) */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--gold)]/18 to-transparent [mask-image:linear-gradient(to_right,transparent,black_35%,black_65%,transparent)]" />
            {/* Hairline sits exactly on the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] via-60% to-transparent" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-8 sm:w-12 h-px bg-[var(--gold)]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] font-light">Est. 2022</span>
              <div className="w-8 sm:w-12 h-px bg-[var(--gold)]" />
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light text-foreground mb-4 sm:mb-6">
              Experience, Culture, and Sound
              <span className="block font-serif italic text-[var(--gold)] mt-2">Without Borders</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
              Nazaara is a platform shaped by perspective: a wider lens, a bolder rhythm, 
              a new era rooted in the same fire. We create entry points into worlds defined 
              by sound, culture, and movement—familiar energy, new expression.
            </p>
          </div>
        </div>
  </section>

      

      {/* Our Story */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] font-light">Our Story</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground mb-4 sm:mb-6">
                From Tamasha to
                <span className="block font-serif italic text-[var(--gold)]">A Broader Vision</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                <p>
                  Nazaara launched in 2022 as a platform for experience, culture, and sound—without borders. 
                  It emerged from a simple belief: that the scenes we believe in, the sounds that raised us, 
                  and the stories we&apos;re excited to tell deserve a global stage.
                </p>
                
                <p>
                  Tamasha isn&apos;t ending—it now lives within Nazaara as a signature experience and part 
                  of a bigger vision. Today, we build across genres, mediums, and communities. We honor 
                  roots while expanding the frame: a wider lens, a bolder rhythm.
                </p>
                
                <p>
                  Our journey spans 150+ cities, 500,000+ hearts touched, and countless moments turned 
                  into memory. And we&apos;re still evolving—introducing new IPs, fresh concepts, and curated 
                  formats under the Nazaara umbrella.
                </p>
              </div>
              
              <div className="flex gap-4 sm:gap-8 mt-8 sm:mt-12">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-light text-[var(--gold)]">2022</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">Founded</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-light text-[var(--gold)]">500K+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">Tickets Sold</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-light text-[var(--gold)]">150+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">Global Cities</div>
                </div>
              </div>
            </div>
            
            {/* Image Collage */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden rounded-tl-[80px]">
                <Image 
                  src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80"
                  alt="Concert crowd"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-3/4 h-3/4 overflow-hidden border-8 border-background rounded-br-[80px]">
                <Image 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                  alt="Stage performance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)]/5 via-transparent to-[var(--gold)]/5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header - Off-center */}
            <div className="mb-12 sm:mb-24">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] font-light">Portfolio</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-foreground">
                Our <span className="font-serif italic text-[var(--gold)]">Brands</span>
              </h2>
            </div>
            
            {/* Staggered Brand Layout */}
            <div className="space-y-16 sm:space-y-32">
              {/* TAMASHA - Left Aligned */}
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="relative">
                    <div className="text-6xl sm:text-8xl md:text-9xl font-serif font-light text-[var(--gold)]/10 absolute -top-8 sm:-top-12 -left-2 sm:-left-4">01</div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-2 relative">TAMASHA</h3>
                    <div className="w-24 h-px bg-[var(--gold)] mb-6" />
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] mb-4 sm:mb-6">Premium Events & Tours</p>
                    <p className="text-muted-foreground font-light leading-relaxed max-w-md">
                      Tamasha lives within Nazaara as our signature live experience—high-voltage shows 
                      that transform venues into cultural epicenters. A-list talent, world-class 
                      production, and the unmistakable South Asian energy that started it all.
                    </p>
                    <div className="mt-8 space-y-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
                        <span className="font-light">Since 2016</span>
                        <span>·</span>
                        <span className="font-light">100+ Productions</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
                        <span className="font-light">25 Countries</span>
                        <span>·</span>
                        <span className="font-light">300K+ Attendees</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--maroon-red)]/20 rounded-tl-[120px]" />
                    <div className="absolute bottom-0 right-0 w-4/5 h-4/5 bg-gradient-to-tl from-[var(--maroon-red)]/10 to-transparent rounded-br-[120px]" />
                  </div>
                </div>
              </div>
              
              {/* Nazaara - Right Aligned */}
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-bl from-[var(--turquoise)]/20 to-[var(--gold)]/20 rounded-tr-[120px]" />
                    <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-gradient-to-tr from-[var(--gold)]/10 to-transparent rounded-bl-[120px]" />
                  </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="relative lg:pl-12">
                    <div className="text-6xl sm:text-8xl md:text-9xl font-serif font-light text-[var(--gold)]/10 absolute -top-8 sm:-top-12 -right-2 sm:-right-4">02</div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-2 relative">Nazaara</h3>
                    <div className="w-24 h-px bg-[var(--gold)] mb-6" />
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] mb-4 sm:mb-6">Cultural Productions</p>
                    <p className="text-muted-foreground font-light leading-relaxed max-w-md">
                      The umbrella for new IPs, cross-cultural collaborations, and curated formats. 
                      We move across genres and mediums, connecting diaspora communities worldwide—
                      familiar energy, new expression.
                    </p>
                    <div className="mt-8 space-y-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
                        <span className="font-light">Since 2022</span>
                        <span>·</span>
                        <span className="font-light">200+ Events</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
                        <span className="font-light">50 Cities</span>
                        <span>·</span>
                        <span className="font-light">Cultural Pioneer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Third Brand - Center Focus */}
              <div className="text-center py-8 sm:py-12">
                <div className="relative inline-block">
                  <div className="text-6xl sm:text-8xl md:text-9xl font-serif font-light text-[var(--gold)]/10 absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2">03</div>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-foreground/30 mb-2 relative">New IPs Incoming</h3>
                  <div className="w-24 h-px bg-[var(--gold)]/30 mx-auto mb-6" />
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)]/50 mb-4 sm:mb-6">Next Chapter</p>
                  <p className="text-muted-foreground/50 font-light leading-relaxed max-w-md mx-auto">
                    Fresh concepts and formats under the Nazaara umbrella—global music, emerging styles, 
                    and diasporic rhythms alongside the iconic South Asian sound that shaped us.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Statement */}
            <div className="mt-16 sm:mt-32 text-center">
              <div className="max-w-3xl mx-auto">
                <p className="text-xl sm:text-2xl font-serif font-light text-foreground">
                  Three distinct brands, <span className="italic text-[var(--gold)]">infinite possibilities</span>
                </p>
                <p className="text-muted-foreground font-light mt-4">
                  Each brand operates independently while sharing our core values of excellence, 
                  authenticity, and innovation in South Asian entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Impact */}
      <section className="py-16 sm:py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] font-light">Impact & Recognition</span>
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground">
                Milestones That
                <span className="block font-serif italic text-[var(--gold)]">Define Us</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Trophy className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Industry Pioneer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">First to bring major South Asian artists to global arenas</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Globe2 className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Global Reach</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">Events across 6 continents and 30+ countries</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Users className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Artist Network</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">Exclusive partnerships with 200+ renowned artists</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Premium Events</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">500+ luxury private celebrations curated</p>
              </div>
            </div>
            
            {/* Key Achievements Timeline */}
            <div className="mt-12 sm:mt-20 space-y-8 sm:space-y-12">
              <div className="flex gap-4 sm:gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-xl sm:text-2xl font-light min-w-[60px] sm:min-w-[80px]">2022</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">The Launch</h3>
                  <p className="text-muted-foreground font-light">Launched to platform experience, culture, and sound—without borders</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-xl sm:text-2xl font-light min-w-[60px] sm:min-w-[80px]">2023</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Tamasha Joins</h3>
                  <p className="text-muted-foreground font-light">Tamasha becomes the signature live experience within Nazaara</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start"> 
                <div className="text-[var(--gold)] font-serif text-2xl font-light min-w-[80px]">2024</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Global Expansion</h3>
                  <p className="text-muted-foreground font-light">Extended operations to Europe, Middle East, and Asia-Pacific</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-xl sm:text-2xl font-light min-w-[60px] sm:min-w-[80px]">2025</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">New IPs</h3>
                  <p className="text-muted-foreground font-light">Introducing curated formats and cross-cultural collaborations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 sm:py-24 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)] font-light">Collaborate</span>
                <div className="w-6 sm:w-8 h-px bg-[var(--gold)]" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground mb-4 sm:mb-6">
                Partner With
                <span className="block font-serif italic text-[var(--gold)]">Excellence</span>
              </h2>
              
              <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                Join the exclusive network of venues, brands, and visionaries shaping the future 
                of South Asian entertainment worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-3 sm:mb-4">For Venues & Promoters</h3>
                <ul className="space-y-3 text-muted-foreground font-light">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Access to exclusive artist roster</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Full production management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Marketing & audience development</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-light text-foreground mb-3 sm:mb-4">For Corporate Partners</h3>
                <ul className="space-y-3 text-muted-foreground font-light">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Brand activation opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Celebrity endorsements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2" />
                    <span>Custom entertainment solutions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Organization"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
                  />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground focus:border-[var(--gold)] focus:outline-none transition-colors font-light rounded-none shadow-none h-auto data-[placeholder]:text-muted-foreground/50">
                      <SelectValue placeholder="Partnership Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="venue" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Venue Partnership</SelectItem>
                      <SelectItem value="corporate" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Corporate Collaboration</SelectItem>
                      <SelectItem value="media" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Media Partnership</SelectItem>
                      <SelectItem value="other" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <textarea
                  placeholder="Tell us about your vision..."
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light resize-none"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between pt-4 sm:pt-6">
                <p className="text-xs text-muted-foreground font-light order-2 sm:order-1">
                  We typically respond within 48 hours
                </p>
                <Button 
                  type="submit"
                  className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-8 sm:px-12 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-wider font-light w-full sm:w-auto order-1 sm:order-2"
                >
                  Begin Conversation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      
    </div>
  );
}
