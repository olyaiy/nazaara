import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe2, Trophy, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon-red)]/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-light">Est. 2014</span>
              <div className="w-12 h-px bg-[var(--gold)]" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-light text-foreground mb-6">
              Defining South Asian
              <span className="block font-serif italic text-[var(--gold)]">Entertainment Excellence</span>
            </h1>
            
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              A decade of orchestrating unforgettable experiences across continents, 
              bringing the pulse of South Asian culture to global audiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-light">Our Story</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                From Vision to
                <span className="block font-serif italic text-[var(--gold)]">Global Movement</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                <p>
                  What began as a passion project in 2014 has evolved into the premier force 
                  in South Asian entertainment production. Nazaara Live was born from a simple 
                  belief: that the vibrant energy of South Asian culture deserved a global stage.
                </p>
                
                <p>
                  Today, we stand as the bridge between East and West, curating experiences that 
                  honor tradition while embracing innovation. From sold-out arena tours to intimate 
                  private celebrations, we&apos;ve redefined what it means to celebrate South Asian artistry.
                </p>
                
                <p>
                  Our journey spans 150+ cities, 500,000+ hearts touched, and countless moments 
                  that have become memories. Yet, we&apos;re just getting started.
                </p>
              </div>
              
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-serif font-light text-[var(--gold)]">10+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-light text-[var(--gold)]">500K+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Tickets Sold</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-light text-[var(--gold)]">150+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Global Cities</div>
                </div>
              </div>
            </div>
            
            {/* Image Collage */}
            <div className="relative h-[600px]">
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
      <section className="py-24 bg-[var(--maroon-red)]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-light">Our Portfolio</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                Three Brands
                <span className="block font-serif italic text-[var(--gold)]">One Vision</span>
              </h2>
              
              <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                Each brand in our portfolio represents a unique facet of South Asian entertainment, 
                unified by our commitment to excellence and cultural authenticity.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {/* TAMASHA */}
              <div className="group relative">
                <div className="aspect-[4/5] bg-gradient-to-b from-[var(--gold)]/10 to-[var(--maroon-red)]/10 rounded-tl-[60px] rounded-br-[60px] overflow-hidden mb-6 border border-[var(--gold)]/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <h3 className="text-4xl font-serif font-light text-[var(--gold)] mb-4">TAMASHA</h3>
                      <div className="w-16 h-px bg-[var(--gold)]/30 mx-auto mb-4" />
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Premium Events</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-light text-foreground mb-3">Elevated Experiences</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Our flagship brand for large-scale concerts and tours, bringing the biggest 
                    names in South Asian music to prestigious venues worldwide.
                  </p>
                  <div className="mt-6 flex justify-center gap-6 text-xs uppercase tracking-wider text-muted-foreground/60">
                    <span>Est. 2016</span>
                    <span>·</span>
                    <span>100+ Shows</span>
                  </div>
                </div>
              </div>
              
              {/* Nazaara */}
              <div className="group relative">
                <div className="aspect-[4/5] bg-gradient-to-b from-[var(--turquoise)]/10 to-[var(--gold)]/10 rounded-tl-[60px] rounded-br-[60px] overflow-hidden mb-6 border border-[var(--gold)]/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <h3 className="text-4xl font-serif font-light text-[var(--gold)] mb-4">Nazaara</h3>
                      <div className="w-16 h-px bg-[var(--gold)]/30 mx-auto mb-4" />
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Live Productions</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-light text-foreground mb-3">Cultural Celebrations</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Specializing in authentic cultural events and festivals that celebrate 
                    the rich tapestry of South Asian heritage and contemporary artistry.
                  </p>
                  <div className="mt-6 flex justify-center gap-6 text-xs uppercase tracking-wider text-muted-foreground/60">
                    <span>Est. 2014</span>
                    <span>·</span>
                    <span>200+ Events</span>
                  </div>
                </div>
              </div>
              
              {/* Third Brand Placeholder */}
              <div className="group relative">
                <div className="aspect-[4/5] bg-gradient-to-b from-[var(--maroon-red)]/10 to-[var(--turquoise)]/10 rounded-tl-[60px] rounded-br-[60px] overflow-hidden mb-6 border border-[var(--gold)]/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <h3 className="text-4xl font-serif font-light text-[var(--gold)] mb-4">Coming Soon</h3>
                      <div className="w-16 h-px bg-[var(--gold)]/30 mx-auto mb-4" />
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">New Ventures</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-light text-foreground mb-3">Innovation Hub</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Our newest venture pushing boundaries in entertainment technology and 
                    immersive experiences for the next generation of audiences.
                  </p>
                  <div className="mt-6 flex justify-center gap-6 text-xs uppercase tracking-wider text-muted-foreground/60">
                    <span>Launching 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Impact */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-light">Impact & Recognition</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
                Milestones That
                <span className="block font-serif italic text-[var(--gold)]">Define Us</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Trophy className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">Industry Pioneer</h3>
                <p className="text-sm text-muted-foreground font-light">First to bring major South Asian artists to global arenas</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Globe2 className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground font-light">Events across 6 continents and 30+ countries</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Users className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">Artist Network</h3>
                <p className="text-sm text-muted-foreground font-light">Exclusive partnerships with 200+ renowned artists</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">Premium Events</h3>
                <p className="text-sm text-muted-foreground font-light">500+ luxury private celebrations curated</p>
              </div>
            </div>
            
            {/* Key Achievements Timeline */}
            <div className="mt-20 space-y-12">
              <div className="flex gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-2xl font-light min-w-[80px]">2014</div>
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">The Genesis</h3>
                  <p className="text-muted-foreground font-light">Founded with a vision to globalize South Asian entertainment</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-2xl font-light min-w-[80px]">2016</div>
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">Breaking Barriers</h3>
                  <p className="text-muted-foreground font-light">First South Asian concert tour across North America&apos;s premier venues</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-2xl font-light min-w-[80px]">2019</div>
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">Global Expansion</h3>
                  <p className="text-muted-foreground font-light">Extended operations to Europe, Middle East, and Asia-Pacific</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start">
                <div className="text-[var(--gold)] font-serif text-2xl font-light min-w-[80px]">2023</div>
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">Half Million Milestone</h3>
                  <p className="text-muted-foreground font-light">Celebrated 500,000 tickets sold with record-breaking arena tours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-light">Collaborate</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                Partner With
                <span className="block font-serif italic text-[var(--gold)]">Excellence</span>
              </h2>
              
              <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                Join the exclusive network of venues, brands, and visionaries shaping the future 
                of South Asian entertainment worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-light text-foreground mb-4">For Venues & Promoters</h3>
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
                <h3 className="text-xl font-light text-foreground mb-4">For Corporate Partners</h3>
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
                  <select className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground focus:border-[var(--gold)] focus:outline-none transition-colors font-light appearance-none cursor-pointer">
                    <option value="" className="bg-background">Partnership Type</option>
                    <option value="venue" className="bg-background">Venue Partnership</option>
                    <option value="corporate" className="bg-background">Corporate Collaboration</option>
                    <option value="media" className="bg-background">Media Partnership</option>
                    <option value="other" className="bg-background">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <textarea
                  placeholder="Tell us about your vision..."
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light resize-none"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-6">
                <p className="text-xs text-muted-foreground font-light">
                  We typically respond within 48 hours
                </p>
                <Button 
                  type="submit"
                  className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-12 py-6 text-sm uppercase tracking-wider font-light"
                >
                  Begin Conversation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-light text-foreground mb-4">
              Ready to Create
              <span className="block italic text-[var(--gold)]">Something Extraordinary?</span>
            </h3>
            <p className="text-sm text-muted-foreground font-light mb-8">
              Let&apos;s discuss how Nazaara Live can elevate your next event
            </p>
            <div className="flex items-center justify-center gap-6">
              <Button 
                variant="outline"
                className="border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--maroon-red)] px-8 py-6 text-sm uppercase tracking-wider font-light"
              >
                View Gallery
              </Button>
              <Button 
                className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-8 py-6 text-sm uppercase tracking-wider font-light"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}