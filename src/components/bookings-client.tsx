'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BookingsClient() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [expandedDj, setExpandedDj] = useState<number | null>(null);
  const djRoster = [
    {
      id: 1,
      name: "DJ RISHI",
      title: "The Maestro",
      specialty: "Bollywood & House Fusion",
      experience: "15+ Years",
      performances: "500+ Events",
      image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
      availability: "Select Dates",
      instagram: "https://instagram.com/djrishi",
      soundcloud: "https://soundcloud.com/djrishi",
      bio: "With over 15 years of experience, DJ Rishi has become synonymous with the evolution of Bollywood fusion. His signature blend of traditional Indian melodies with contemporary house beats has graced stages from Mumbai to Manhattan, creating unforgettable moments at over 500 exclusive events worldwide.",
      highlights: ["Resident DJ at Mumbai's premier clubs", "Official tour DJ for major Bollywood artists", "Curated performances at Cannes Film Festival"]
    },
    {
      id: 2,
      name: "DJ PRIYA",
      title: "The Innovator",
      specialty: "Electronic & Classical Blend",
      experience: "10+ Years",
      performances: "300+ Events",
      image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800&q=80",
      availability: "Booking Now",
      instagram: "https://instagram.com/djpriya",
      soundcloud: "https://soundcloud.com/djpriya",
      bio: "DJ Priya pioneered the electronic-classical fusion movement, seamlessly weaving traditional ragas with cutting-edge electronic production. Her innovative approach has redefined South Asian music for a new generation, earning residencies at the world's most exclusive venues.",
      highlights: ["First female DJ to headline major South Asian festivals", "Collaborations with Grammy-winning producers", "Pioneer of the 'Neo-Classical' movement"]
    },
    {
      id: 3,
      name: "DJ ARJUN",
      title: "The Crowd Pleaser",
      specialty: "Multi-Genre Specialist",
      experience: "12+ Years",
      performances: "400+ Events",
      image: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=800&q=80",
      availability: "Limited Availability",
      instagram: "https://instagram.com/djarjun",
      soundcloud: "https://soundcloud.com/djarjun",
      bio: "Known as 'The Crowd Pleaser,' DJ Arjun's versatility spans from intimate gatherings to stadium-sized celebrations. His ability to read any room and deliver the perfect sonic journey has made him the go-to artist for discerning clients across the globe.",
      highlights: ["400+ luxury weddings across 6 continents", "Preferred DJ for Fortune 500 corporate events", "Master of multi-genre mixing"]
    },
    {
      id: 4,
      name: "DJ MAYA",
      title: "The Trendsetter",
      specialty: "Hip-Hop & Bhangra",
      experience: "8+ Years",
      performances: "250+ Events",
      image: "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800&q=80",
      availability: "Booking Now",
      instagram: "https://instagram.com/djmaya",
      soundcloud: "https://soundcloud.com/djmaya",
      bio: "DJ Maya brings the energy of underground hip-hop to traditional Bhangra, creating an explosive fusion that ignites dance floors worldwide. Her sets are a celebration of rhythm, culture, and pure musical innovation.",
      highlights: ["Breakthrough artist at Coachella 2023", "Creator of viral Bhangra remixes", "Youth icon with 2M+ social media following"]
    },
    {
      id: 5,
      name: "DJ KABIR",
      title: "The Virtuoso",
      specialty: "Traditional & Modern Mix",
      experience: "20+ Years",
      performances: "1000+ Events",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
      availability: "Exclusive Events Only",
      instagram: "https://instagram.com/djkabir",
      soundcloud: "https://soundcloud.com/djkabir",
      bio: "A living legend with two decades of mastery, DJ Kabir has performed at over 1000 events, each one a testament to his unparalleled ability to blend tradition with modernity. His sets are not just performances—they're cultural experiences.",
      highlights: ["20+ years of international acclaim", "Performed for royal families and heads of state", "Mentor to emerging South Asian DJs"]
    },
    {
      id: 6,
      name: "DJ SARA",
      title: "The Visionary",
      specialty: "Progressive & Sufi",
      experience: "7+ Years",
      performances: "200+ Events",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
      availability: "Open for Bookings",
      instagram: "https://instagram.com/djsara",
      soundcloud: "https://soundcloud.com/djsara",
      bio: "DJ Sara's visionary approach to Progressive and Sufi fusion creates transcendent experiences that touch the soul. Her sets are spiritual journeys, blending ancient Sufi poetry with modern progressive house to create something truly magical.",
      highlights: ["Rising star in the global fusion scene", "Featured in Rolling Stone India", "Creator of the 'Sufi House' movement"]
    }
  ];


  return (
    <div className="min-h-screen bg-[var(--black-grey)]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
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
        
            
            {/* Main Title */}
            <h1 className="text-[clamp(4rem,10vw,10rem)] font-prettywise leading-[0.8] text-[var(--off-white)] mb-8">
              Curated
              <span className="block text-[var(--gold)]">Excellence</span>
            </h1>
            
            <p className="text-lg font-neue-haas text-[var(--off-white)]/70 leading-relaxed max-w-2xl mb-12">
              From intimate gatherings to grand celebrations, we orchestrate extraordinary entertainment 
              experiences with exclusive access to the world&apos;s most celebrated South Asian artists.
            </p>
            
          </div>
        </div>

        {/* Gold accent at the exact bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9]">
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12">
            {/* Upward glow from the edge (fades horizontally) */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--gold)]/18 to-transparent [mask-image:linear-gradient(to_right,transparent,black_35%,black_65%,transparent)]" />
            {/* Hairline sits exactly on the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] via-60% to-transparent" />
          </div>
        </div>

      </section>

      {/* Private Events Introduction */}
      <section className="py-24 bg-gradient-to-b from-[var(--black-grey)] to-[var(--maroon-red)]/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[var(--gold)]/40" />
              <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/60">
                Private Services
              </span>
              <div className="w-8 h-px bg-[var(--gold)]/40" />
            </div>
            
            {/* Title */}
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--off-white)] mb-8">
              Beyond
              <span className="block text-[var(--gold)]">Extraordinary</span>
            </h2>
            
            {/* Description */}
            <p className="text-lg text-[var(--off-white)]/70 font-neue-haas leading-relaxed mb-16 max-w-3xl mx-auto">
              From intimate celebrations to grand spectacles, we orchestrate private experiences 
              that transcend the ordinary. Our reputation isn&apos;t built on portfolios—it&apos;s earned 
              through whispers in elite circles.
            </p>
            
            {/* Service Details - Centered */}
            <div className="space-y-12 mb-16">
              <div className="space-y-3">
                <h3 className="text-2xl font-prettywise text-[var(--off-white)]">Bollywood A-Listers</h3>
                <p className="text-base font-neue-haas text-[var(--off-white)]/60 max-w-2xl mx-auto">
                  Direct access to India&apos;s biggest stars for your most prestigious private events
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-prettywise text-[var(--off-white)]">International Artists</h3>
                <p className="text-base font-neue-haas text-[var(--off-white)]/60 max-w-2xl mx-auto">
                  Global South Asian sensations and cultural icons for exclusive performances
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-prettywise text-[var(--off-white)]">Private Concerts</h3>
                <p className="text-base font-neue-haas text-[var(--off-white)]/60 max-w-2xl mx-auto">
                  Intimate performances and private concerts by legendary artists
                </p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="pt-8">
              <Button 
                size="lg"
                className="px-7 py-4 text-xs uppercase tracking-[0.3em] font-light border-0 min-w-60"
                style={{ 
                  backgroundColor: 'var(--gold)', 
                  color: 'var(--maroon-red)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                onClick={() => {
                  const formSection = document.getElementById('contact-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DJ Roster */}
      <section className="py-32 bg-gradient-to-b from-[var(--black-grey)] via-[var(--black-grey)] to-[var(--maroon-red)]/10">
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
              <h2 className="text-[clamp(3rem,6vw,6rem)] font-prettywise leading-[0.9] text-[var(--off-white)] mb-6">
                <span className="text-[var(--gold)]">DJ Roster</span>
              </h2>
              <p className="text-lg font-neue-haas text-[var(--off-white)]/60 max-w-2xl mx-auto">
                Professional DJs available for private bookings
              </p>
            </div>

            {/* DJ Grid with Expandable Rows */}
            <div className="space-y-8">
              {/* Group DJs into rows of 3 for desktop */}
              {[0, 3].map((startIdx) => (
                <div key={startIdx} className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {djRoster.slice(startIdx, startIdx + 3).map((dj) => (
                      <div key={dj.id} className="group relative">
                        {/* Card */}
                        <div 
                          className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                          onClick={() => setExpandedDj(expandedDj === dj.id ? null : dj.id)}
                        >
                          {/* Click indicator */}
                          <div className="absolute top-4 right-4 z-10 bg-[var(--black-grey)]/80 backdrop-blur-sm px-3 py-1.5 border border-[var(--gold)]/20">
                            <span className="text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60">
                              {expandedDj === dj.id ? 'Close' : 'View Bio'}
                            </span>
                          </div>
                    
                    {/* Square Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[var(--maroon-red)]/5 to-[var(--black-grey)]">
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
                          {/* Enhanced gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-grey)] via-[var(--black-grey)]/30 to-transparent" />
                          {/* Gold accent line at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon-red)]/10 to-[var(--black-grey)]">
                          {/* Geometric pattern background */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-8 border border-[var(--gold)]" />
                            <div className="absolute inset-12 border border-[var(--gold)] rotate-45" />
                          </div>
                          {/* Minimalist user icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg 
                              className="w-20 h-20 text-[var(--gold)]/10" 
                              viewBox="0 0 24 24" 
                              fill="none"
                            >
                              <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1" />
                              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content - Refined Layout */}
                    <div className="relative">
                      {/* Name and specialty */}
                      <div className="border-t border-[var(--gold)]/10 pt-6 pb-4">
                        <h3 className="text-2xl font-prettywise text-[var(--off-white)] mb-3">
                          {dj.name}
                        </h3>
                        <p className="text-sm font-neue-haas text-[var(--gold)]/60 tracking-wide">
                          {dj.specialty}
                        </p>
                      </div>

                      {/* Social Media Icons - More elegant placement */}
                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--gold)]/5">
                        <a 
                          href={dj.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-9 h-9 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5 transition-all duration-300"
                        >
                          <svg 
                            className="w-4 h-4 text-[var(--gold)]/40 group-hover:text-[var(--gold)]/80 transition-all duration-300" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
                            <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"/>
                          </svg>
                        </a>
                        <a 
                          href={dj.soundcloud} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-9 h-9 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5 transition-all duration-300"
                        >
                          <svg 
                            className="w-4 h-4 text-[var(--gold)]/40 group-hover:text-[var(--gold)]/80 transition-all duration-300" 
                            viewBox="-271 345.8 256 111.2" 
                            fill="currentColor"
                          >
                            <path d="M-238.4,398.1c-0.8,0-1.4,0.6-1.5,1.5l-2.3,28l2.3,27.1c0.1,0.8,0.7,1.5,1.5,1.5c0.8,0,1.4-0.6,1.5-1.5l2.6-27.1l-2.6-28C-237,398.7-237.7,398.1-238.4,398.1z"/>
                            <path d="M-228.2,399.9c-0.9,0-1.7,0.7-1.7,1.7l-2.1,26l2.1,27.3c0.1,1,0.8,1.7,1.7,1.7c0.9,0,1.6-0.7,1.7-1.7l2.4-27.3l-2.4-26C-226.6,400.6-227.3,399.9-228.2,399.9z"/>
                            <path d="M-258.6,403.5c-0.5,0-1,0.4-1.1,1l-2.5,23l2.5,22.5c0.1,0.6,0.5,1,1.1,1c0.5,0,1-0.4,1.1-1l2.9-22.5l-2.9-23C-257.7,404-258.1,403.5-258.6,403.5z"/>
                            <path d="M-268.1,412.3c-0.5,0-1,0.4-1,1l-1.9,14.3l1.9,14c0.1,0.6,0.5,1,1,1s0.9-0.4,1-1l2.2-14l-2.2-14.2C-267.2,412.8-267.6,412.3-268.1,412.3z"/>
                            <path d="M-207.5,373.5c-1.2,0-2.1,0.9-2.2,2.1l-1.9,52l1.9,27.2c0.1,1.2,1,2.1,2.2,2.1s2.1-0.9,2.2-2.1l2.1-27.2l-2.1-52C-205.4,374.4-206.4,373.5-207.5,373.5z"/>
                            <path d="M-248.6,399c-0.7,0-1.2,0.5-1.3,1.3l-2.4,27.3l2.4,26.3c0.1,0.7,0.6,1.3,1.3,1.3c0.7,0,1.2-0.5,1.3-1.2l2.7-26.3l-2.7-27.3C-247.4,399.6-247.9,399-248.6,399z"/>
                            <path d="M-217.9,383.4c-1,0-1.9,0.8-1.9,1.9l-2,42.3l2,27.3c0.1,1.1,0.9,1.9,1.9,1.9s1.9-0.8,1.9-1.9l2.3-27.3l-2.3-42.3C-216,384.2-216.9,383.4-217.9,383.4z"/>
                            <path d="M-154.4,359.3c-1.8,0-3.2,1.4-3.2,3.2l-1.2,65l1.2,26.1c0,1.8,1.5,3.2,3.2,3.2c1.8,0,3.2-1.5,3.2-3.2l1.4-26.1l-1.4-65C-151.1,360.8-152.6,359.3-154.4,359.3z"/>
                            <path d="M-197.1,368.9c-1.3,0-2.3,1-2.4,2.4l-1.8,56.3l1.8,26.9c0,1.3,1.1,2.3,2.4,2.3s2.3-1,2.4-2.4l2-26.9l-2-56.3C-194.7,370-195.8,368.9-197.1,368.9z"/>
                            <path d="M-46.5,394c-4.3,0-8.4,0.9-12.2,2.4C-61.2,368-85,345.8-114,345.8c-7.1,0-14,1.4-20.1,3.8c-2.4,0.9-3,1.9-3,3.7v99.9c0,1.9,1.5,3.5,3.4,3.7c0.1,0,86.7,0,87.3,0c17.4,0,31.5-14.1,31.5-31.5C-15,408.1-29.1,394-46.5,394z"/>
                            <path d="M-143.6,353.2c-1.9,0-3.4,1.6-3.5,3.5l-1.4,70.9l1.4,25.7c0,1.9,1.6,3.4,3.5,3.4c1.9,0,3.4-1.6,3.5-3.5l1.5-25.8l-1.5-70.9C-140.2,354.8-141.7,353.2-143.6,353.2z"/>
                            <path d="M-186.5,366.8c-1.4,0-2.5,1.1-2.6,2.6l-1.6,58.2l1.6,26.7c0,1.4,1.2,2.6,2.6,2.6s2.5-1.1,2.6-2.6l1.8-26.7l-1.8-58.2C-184,367.9-185.1,366.8-186.5,366.8z"/>
                            <path d="M-175.9,368.1c-1.5,0-2.8,1.2-2.8,2.8l-1.5,56.7l1.5,26.5c0,1.6,1.3,2.8,2.8,2.8s2.8-1.2,2.8-2.8l1.7-26.5l-1.7-56.7C-173.1,369.3-174.3,368.1-175.9,368.1z"/>
                            <path d="M-165.2,369.9c-1.7,0-3,1.3-3,3l-1.4,54.7l1.4,26.3c0,1.7,1.4,3,3,3c1.7,0,3-1.3,3-3l1.5-26.3l-1.5-54.7C-162.2,371.3-163.5,369.9-165.2,369.9z"/>
                          </svg>
                        </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Expandable Bio Section for this row */}
                  {djRoster.slice(startIdx, startIdx + 3).some(dj => expandedDj === dj.id) && (
                    <div className="mt-8">
                      {djRoster.slice(startIdx, startIdx + 3).map(dj => {
                        if (expandedDj !== dj.id) return null;
                        return (
                          <div key={`bio-${dj.id}`} className="relative bg-[var(--black-grey)] border border-[var(--gold)]/10 overflow-hidden">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
                            
                            <div className="p-8 lg:p-12">
                              <div className="grid lg:grid-cols-3 gap-8">
                                {/* Bio Text */}
                                <div className="lg:col-span-2 space-y-6">
                                  <div>
                                    <h3 className="text-2xl font-prettywise text-[var(--gold)] mb-4">
                                      About {dj.name}
                                    </h3>
                                    <p className="text-base font-neue-haas text-[var(--off-white)]/70 leading-relaxed">
                                      {dj.bio}
                                    </p>
                                  </div>
                                  
                                  {/* Highlights */}
                                  <div>
                                    <h4 className="text-sm font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60 mb-4">
                                      Career Highlights
                                    </h4>
                                    <ul className="space-y-2">
                                      {dj.highlights?.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                          <div className="w-1 h-1 bg-[var(--gold)]/60 rounded-full mt-2" />
                                          <span className="text-sm font-neue-haas text-[var(--off-white)]/60">
                                            {highlight}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                {/* Contact/Booking CTA */}
                                <div className="lg:border-l border-[var(--gold)]/10 lg:pl-8">
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="text-sm font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/60 mb-2">
                                        Booking Status
                                      </h4>
                                      <p className="text-lg font-prettywise text-[var(--off-white)]">
                                        {dj.availability}
                                      </p>
                                    </div>
                                    
                                    <div className="pt-4">
                                      <Button 
                                        size="sm"
                                        className="w-full px-6 py-3 text-xs uppercase tracking-[0.3em] font-light border-0"
                                        style={{ 
                                          backgroundColor: 'var(--gold)', 
                                          color: 'var(--maroon-red)'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const formSection = document.getElementById('contact-form');
                                          formSection?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                      >
                                        Inquire About {dj.name.split(' ')[1]}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Close button */}
                              <div 
                                className="absolute top-4 right-4 text-[var(--gold)]/40 hover:text-[var(--gold)]/60 cursor-pointer transition-colors"
                                onClick={() => setExpandedDj(null)}
                              >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  

      {/* Contact Section */}
      <section id="contact-form" className="py-24 border-t border-[var(--gold)]/10">
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
                
                <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--off-white)] mb-8">
                  Let&apos;s Create
                  <span className="block text-[var(--gold)]">Magic Together</span>
                </h2>
                
                <p className="text-lg font-neue-haas text-[var(--off-white)]/60 leading-relaxed mb-12">
                  Every extraordinary event begins with a conversation. Share your vision, 
                  and we&apos;ll orchestrate an experience beyond imagination.
                </p>
                
                <div className="space-y-8 mb-12">
                  <div>
                    <h3 className="text-xl font-prettywise text-[var(--off-white)] mb-2">What We Need</h3>
                    <p className="text-sm font-neue-haas text-[var(--off-white)]/50">
                      Event type, date, location, and guest count to get started
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-prettywise text-[var(--off-white)] mb-2">Response Time</h3>
                    <p className="text-sm font-neue-haas text-[var(--off-white)]/50">
                      We typically respond within 24 hours with initial availability
                    </p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-[var(--gold)]/10">
                  <p className="text-sm font-neue-haas text-[var(--off-white)]/40 mb-4">
                    Preferred contact for urgent bookings
                  </p>
                  <a 
                    href="mailto:bookings@nazaara.live" 
                    className="text-xl font-prettywise text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors"
                  >
                    bookings@nazaara.live
                  </a>
                </div>
              </div>

              {/* Right Form - Enhanced Design */}
              <div className="relative">
                {/* Premium form container with subtle gradient background */}
                <div className="relative bg-gradient-to-br from-[var(--maroon-red)]/10 via-transparent to-[var(--dark-green)]/5 p-12 backdrop-blur-sm">
                  
                  <form className="space-y-8">
                    {/* Personal Information Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    {/* Event Details Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Event Type
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="Wedding, Corporate Event, etc."
                        />
                      </div>
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Event Date
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="MM/DD/YYYY"
                        />
                      </div>
                    </div>
                    
                    {/* Location and Scale Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Event Location
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="relative">
                        <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                          Expected Guests
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                          placeholder="500"
                        />
                      </div>
                    </div>
                    
                    {/* Vision Section */}
                    <div className="relative">
                      <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                        Your Vision
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg resize-none"
                        placeholder="Share your dream event details, special requirements, and artistic preferences..."
                      />
                    </div>
                    
                    {/* Submit Section with Enhanced Design */}
                    <div className="pt-8 space-y-6">
                      {/* Privacy Note */}
                      <p className="text-[10px] font-neue-haas text-[var(--off-white)]/30 tracking-wider">
                        Your information is kept strictly confidential and used solely for event planning purposes.
                      </p>
                      
                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        size="lg"
                        className="w-full px-7 py-4 text-xs uppercase tracking-[0.3em] font-light border-0"
                        style={{ 
                          backgroundColor: 'var(--gold)', 
                          color: 'var(--maroon-red)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        Send Inquiry
                      </Button>
                    </div>
                  </form>
                </div>
                
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[var(--gold)] rotate-45" />
                  <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-[var(--gold)] rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}