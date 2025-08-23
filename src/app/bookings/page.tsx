import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Mic2, Users, Star, Crown, Sparkles } from "lucide-react";

export default function BookingsPage() {
  const djRoster = [
    {
      id: 1,
      name: "DJ RISHI",
      title: "The Maestro",
      specialty: "Bollywood & House Fusion",
      experience: "15+ Years",
      performances: "500+ Events",
      image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
      availability: "Select Dates"
    },
    {
      id: 2,
      name: "DJ PRIYA",
      title: "The Innovator",
      specialty: "Electronic & Classical Blend",
      experience: "10+ Years",
      performances: "300+ Events",
      image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800&q=80",
      availability: "Booking Now"
    },
    {
      id: 3,
      name: "DJ ARJUN",
      title: "The Crowd Pleaser",
      specialty: "Multi-Genre Specialist",
      experience: "12+ Years",
      performances: "400+ Events",
      image: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=800&q=80",
      availability: "Limited Availability"
    },
    {
      id: 4,
      name: "DJ MAYA",
      title: "The Trendsetter",
      specialty: "Hip-Hop & Bhangra",
      experience: "8+ Years",
      performances: "250+ Events",
      image: "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800&q=80",
      availability: "Booking Now"
    },
    {
      id: 5,
      name: "DJ KABIR",
      title: "The Virtuoso",
      specialty: "Traditional & Modern Mix",
      experience: "20+ Years",
      performances: "1000+ Events",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
      availability: "Exclusive Events Only"
    },
    {
      id: 6,
      name: "DJ SARA",
      title: "The Visionary",
      specialty: "Progressive & Sufi",
      experience: "7+ Years",
      performances: "200+ Events",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
      availability: "Open for Bookings"
    }
  ];

  const services = [
    {
      icon: Music,
      title: "Celebrity Performances",
      description: "A-list Bollywood artists and international South Asian stars",
      highlight: "Exclusive Access"
    },
    {
      icon: Crown,
      title: "Luxury Weddings",
      description: "Bespoke entertainment curation for once-in-a-lifetime celebrations",
      highlight: "Full Production"
    },
    {
      icon: Mic2,
      title: "Keynote Speakers",
      description: "Thought leaders and cultural icons for corporate excellence",
      highlight: "Global Network"
    },
    {
      icon: Sparkles,
      title: "Private Celebrations",
      description: "Intimate gatherings with world-class entertainment",
      highlight: "Tailored Experience"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--black-grey)]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background gradient with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)]/90 to-[var(--dark-green)]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,var(--gold)_0%,transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--gold)]/40" />
              <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/60">
                Private Bookings
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-[clamp(4rem,10vw,10rem)] font-prettywise leading-[0.8] text-[var(--white)] mb-8">
              Curated
              <span className="block text-[var(--gold)]">Excellence</span>
            </h1>
            
            <p className="text-lg font-neue-haas text-[var(--white)]/70 leading-relaxed max-w-2xl mb-12">
              From intimate soirées to grand celebrations, we orchestrate extraordinary entertainment 
              experiences with exclusive access to the world's most celebrated South Asian artists.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-[var(--gold)]/10">
              <div>
                <p className="text-4xl font-prettywise text-[var(--gold)]">500+</p>
                <p className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mt-1">
                  Private Events
                </p>
              </div>
              <div>
                <p className="text-4xl font-prettywise text-[var(--gold)]">200+</p>
                <p className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mt-1">
                  Celebrity Bookings
                </p>
              </div>
              <div>
                <p className="text-4xl font-prettywise text-[var(--gold)]">98%</p>
                <p className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40 mt-1">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative side element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-[var(--gold)]/30 rounded-full" />
            <div className="absolute inset-8 border border-[var(--gold)]/20 rounded-full" />
            <div className="absolute inset-16 border border-[var(--gold)]/10 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-b from-[var(--black-grey)] to-[var(--maroon-red)]/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-16">
              <div className="flex items-baseline gap-8 mb-4">
                <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                  Our Services
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold)]/20 to-transparent" />
              </div>
              <h2 className="text-[clamp(3rem,6vw,6rem)] font-prettywise leading-[0.9] text-[var(--white)]">
                Exceptional
                <span className="text-[var(--gold)]"> Experiences</span>
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group relative p-8 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 border border-[var(--gold)]/20 flex items-center justify-center group-hover:bg-[var(--gold)]/10 transition-colors">
                      <service.icon className="w-6 h-6 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40">
                        {service.highlight}
                      </span>
                      <h3 className="text-2xl font-prettywise text-[var(--white)] mt-2 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-[var(--gold)]/20 group-hover:border-[var(--gold)]/40 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DJ Roster */}
      <section className="py-24 bg-[var(--black-grey)]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-px bg-[var(--gold)]/20" />
                <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                  Elite Roster
                </span>
                <div className="w-16 h-px bg-[var(--gold)]/20" />
              </div>
              <h2 className="text-[clamp(3rem,6vw,6rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-6">
                Our <span className="text-[var(--gold)]">Resident Artists</span>
              </h2>
              <p className="text-lg font-neue-haas text-[var(--white)]/60 max-w-2xl mx-auto">
                Six visionary DJs who define the sound of modern South Asian entertainment
              </p>
            </div>

            {/* DJ Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {djRoster.map((dj) => (
                <div key={dj.id} className="group relative">
                  {/* Card */}
                  <div className="relative overflow-hidden bg-gradient-to-b from-[var(--maroon-red)]/10 to-transparent">
                    {/* Image Container */}
                    <div className="relative h-[400px] overflow-hidden">
                      <Image
                        src={dj.image}
                        alt={dj.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/50 to-transparent" />
                      
                      {/* Availability Badge */}
                      <div className="absolute top-4 right-4 bg-[var(--gold)]/90 backdrop-blur-sm px-4 py-2">
                        <span className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">
                          {dj.availability}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      {/* Title Block */}
                      <div className="mb-4">
                        <p className="text-[9px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40 mb-2">
                          {dj.title}
                        </p>
                        <h3 className="text-2xl font-prettywise text-[var(--white)]">
                          {dj.name}
                        </h3>
                      </div>

                      {/* Info */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-baseline py-2 border-b border-[var(--gold)]/10">
                          <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                            Specialty
                          </span>
                          <span className="text-sm font-neue-haas text-[var(--white)]/70">
                            {dj.specialty}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/40">
                            Experience
                          </span>
                          <span className="text-sm font-prettywise text-[var(--gold)]">
                            {dj.experience}
                          </span>
                        </div>
                      </div>

                      {/* Performances Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-neue-haas text-[var(--white)]/50">
                          {dj.performances}
                        </span>
                        <button className="text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[var(--gold)]/10" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[var(--gold)]/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Booking Section */}
      <section className="py-24 bg-gradient-to-b from-[var(--maroon-red)]/10 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[var(--gold)]/30" />
                  <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                    Celebrity Access
                  </span>
                </div>
                
                <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-8">
                  Beyond
                  <span className="block text-[var(--gold)]">Ordinary</span>
                </h2>
                
                <p className="text-lg font-neue-haas text-[var(--white)]/70 leading-relaxed mb-8">
                  We don't showcase portfolios. Our reputation speaks through whispers in elite circles. 
                  When you need Bollywood royalty, international sensations, or cultural icons, we make it happen.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <Star className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">Bollywood A-Listers</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Direct access to India's biggest stars for your most prestigious events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Crown className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">Keynote Speakers</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Thought leaders and cultural ambassadors for corporate excellence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">Exclusive Performances</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Private concerts and intimate performances by legendary artists
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-10 py-6 text-sm uppercase tracking-[0.3em] font-light"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
              </div>

              {/* Right Visual */}
              <div className="relative h-[600px]">
                {/* Overlapping images composition */}
                <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80"
                    alt="Celebrity performance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)]/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-3/4 h-3/4 overflow-hidden border-8 border-[var(--black-grey)]">
                  <Image
                    src="https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80"
                    alt="Luxury event"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)]/60 to-transparent" />
                </div>
                
                {/* Floating accent */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--gold)] flex items-center justify-center">
                  <p className="text-center">
                    <span className="text-3xl font-prettywise text-[var(--maroon-red)]">200+</span>
                    <span className="block text-[8px] font-neue-haas uppercase tracking-[0.2em] text-[var(--maroon-red)]">Celebrities</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[var(--gold)]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-[var(--gold)]/20" />
              <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                Begin Your Journey
              </span>
              <div className="w-16 h-px bg-[var(--gold)]/20" />
            </div>
            
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-6">
              Let's Create
              <span className="block text-[var(--gold)]">Magic Together</span>
            </h2>
            
            <p className="text-lg font-neue-haas text-[var(--white)]/60 max-w-2xl mx-auto mb-12">
              Every extraordinary event begins with a conversation. Share your vision, 
              and we'll orchestrate an experience beyond imagination.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-12 py-6 text-sm uppercase tracking-[0.3em] font-light"
              >
                Book Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[var(--gold)]/10 px-12 py-6 text-sm uppercase tracking-[0.3em] font-light"
              >
                Send Inquiry
              </Button>
            </div>
            
            <div className="mt-16 pt-16 border-t border-[var(--gold)]/10">
              <p className="text-sm font-neue-haas text-[var(--white)]/40 mb-4">
                Preferred contact for urgent bookings
              </p>
              <a 
                href="mailto:bookings@nazaaralive.com" 
                className="text-xl font-prettywise text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors"
              >
                bookings@nazaaralive.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}