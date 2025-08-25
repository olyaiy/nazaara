'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Star, Crown } from "lucide-react";
import { useState } from "react";

export default function BookingsPage() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
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


  return (
    <div className="min-h-screen bg-[var(--black-grey)]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bookings-bg.webp"
            alt="DJ performing with dramatic lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)]/80 via-[var(--maroon-red)]/60 to-[var(--dark-green)]/70" />
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
              From intimate soir�es to grand celebrations, we orchestrate extraordinary entertainment 
              experiences with exclusive access to the world&apos;s most celebrated South Asian artists.
            </p>
            
          </div>
        </div>

      </section>

      {/* Private Events Introduction */}
      <section className="py-24 bg-gradient-to-b from-[var(--black-grey)] to-[var(--maroon-red)]/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[var(--gold)]/40" />
                  <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/60">
                    Private Services
                  </span>
                </div>
                
                <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-8">
                  Beyond
                  <span className="block text-[var(--gold)]">Extraordinary</span>
                </h2>
                
                <div className="space-y-6 text-[var(--white)]/70 font-neue-haas leading-relaxed mb-12">
                  <p>
                    From intimate celebrations to grand spectacles, we orchestrate private experiences 
                    that transcend the ordinary. Our reputation isn&apos;t built on portfolios—it&apos;s earned 
                    through whispers in elite circles.
                  </p>
                  
                  <p>
                    Whether you seek Bollywood royalty for your private celebration or world-class DJs 
                    for your luxury wedding, we provide exclusive access to the impossible.
                  </p>
                </div>
                
                {/* Service Details */}
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <Star className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">Bollywood A-Listers</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Direct access to India&apos;s biggest stars for your most prestigious private events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Crown className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">International Artists</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Global South Asian sensations and cultural icons for exclusive performances
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-[var(--gold)] mt-1" />
                    <div>
                      <h3 className="text-lg font-prettywise text-[var(--white)] mb-2">Private Concerts</h3>
                      <p className="text-sm font-neue-haas text-[var(--white)]/50">
                        Intimate performances and private concerts by legendary artists
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual - Image Composition */}
              <div className="relative h-[600px]">
                {/* Main image - luxury event */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                    alt="Luxury private event"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)]/40 to-transparent" />
                </div>
                
                {/* Secondary image - celebrity performance */}
                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden border-8 border-[var(--black-grey)]">
                  <Image
                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80"
                    alt="Celebrity performance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/60 to-transparent" />
                </div>
                
              </div>
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
                  Available Artists
                </span>
                <div className="w-16 h-px bg-[var(--gold)]/20" />
              </div>
              <h2 className="text-[clamp(3rem,6vw,6rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-6">
                <span className="text-[var(--gold)]">DJ Roster</span>
              </h2>
              <p className="text-lg font-neue-haas text-[var(--white)]/60 max-w-2xl mx-auto">
                Professional DJs available for private bookings
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
                      {dj.image && !imageErrors[dj.id] ? (
                        <>
                          <Image
                            src={dj.image}
                            alt={dj.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [dj.id]: true }));
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/50 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-[var(--black-grey)] transition-transform duration-700 group-hover:scale-105">
                          {/* Simple border frame */}
                          <div className="absolute inset-8 border border-[var(--gold)]/10" />
                          {/* Minimalist user icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg 
                              className="w-24 h-24 text-[var(--gold)]/15" 
                              viewBox="0 0 24 24" 
                              fill="none"
                            >
                              <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1" />
                              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/50 to-transparent" />
                        </div>
                      )}
                      
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

  

      {/* Contact Section */}
      <section className="py-24 border-t border-[var(--gold)]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-px bg-[var(--gold)]/20" />
                  <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                    Begin Your Journey
                  </span>
                </div>
                
                <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--white)] mb-8">
                  Let&apos;s Create
                  <span className="block text-[var(--gold)]">Magic Together</span>
                </h2>
                
                <p className="text-lg font-neue-haas text-[var(--white)]/60 leading-relaxed mb-12">
                  Every extraordinary event begins with a conversation. Share your vision, 
                  and we&apos;ll orchestrate an experience beyond imagination.
                </p>
                
                <div className="space-y-8 mb-12">
                  <div>
                    <h3 className="text-xl font-prettywise text-[var(--white)] mb-2">What We Need</h3>
                    <p className="text-sm font-neue-haas text-[var(--white)]/50">
                      Event type, date, location, and guest count to get started
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-prettywise text-[var(--white)] mb-2">Response Time</h3>
                    <p className="text-sm font-neue-haas text-[var(--white)]/50">
                      We typically respond within 24 hours with initial availability
                    </p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-[var(--gold)]/10">
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

              {/* Right Form */}
              <div className="lg:pl-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Event Type"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Event Date"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Location"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Guest Count"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Tell us about your vision and requirements..."
                      rows={4}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[var(--gold)]/20 text-[var(--white)] placeholder:text-[var(--white)]/40 focus:border-[var(--gold)] focus:outline-none transition-colors font-neue-haas resize-none"
                    />
                  </div>
                  
                  <div className="pt-8">
                    <Button 
                      type="submit"
                      className="w-full bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-12 py-6 text-sm uppercase tracking-[0.3em] font-light"
                    >
                      Send Inquiry
                      <ArrowRight className="ml-3 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}