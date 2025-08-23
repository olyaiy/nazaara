
import Image from "next/image";

export default function Hero() {
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
    <section className="relative min-h-screen bg-gradient-to-br from-[var(--maroon-red)] via-[var(--maroon-red)] to-[var(--dark-green)]">
      {/* Geometric Accent Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--gold)] opacity-[0.02] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[var(--turquoise)] opacity-[0.02] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Main Container */}
      <div className="relative min-h-screen px-6 lg:px-12 py-8 lg:py-12">
        <div className="max-w-[1600px] mx-auto min-h-screen flex items-center">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left Section - Poster Display */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] lg:max-w-[550px]">
                {/* Luxury Frame Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--gold)] via-[var(--gold)]/30 to-transparent" />
                <div className="absolute -inset-[0.5px] bg-[var(--maroon-red)]" />
                
                {/* Poster Container */}
                <div className="relative w-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--black)]">
                    <Image 
                      src={featuredEvent.image}
                      alt={featuredEvent.artist}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Floating Label - Nazaara Live Presents */}
                  <div className="absolute -top-8 -left-8 lg:-top-10 lg:-left-10">
                    <p className="text-[9px] font-neue-haas uppercase text-[var(--gold)]/60 tracking-[0.5em]">Nazaara Live</p>
                    <p className="text-[8px] font-neue-haas uppercase text-[var(--gold)]/40 tracking-[0.5em]">Presents</p>
                  </div>
                  
                  {/* Date Badge - Bottom Right */}
                  <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-[var(--gold)] px-4 py-3">
                    <p className="text-2xl font-prettywise text-[var(--maroon-red)] leading-none">31</p>
                    <p className="text-[8px] font-neue-haas uppercase tracking-[0.3em] text-[var(--maroon-red)]">August</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section - Event Information */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="space-y-10 lg:space-y-12 max-w-xl">
                {/* Title Block */}
                <div>
                  <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-prettywise leading-[0.85] text-[var(--white)] mb-4">
                    {featuredEvent.artist}
                  </h1>
                  <p className="text-3xl lg:text-4xl font-prettywise text-[var(--gold)] mb-6">
                    {featuredEvent.title}
                  </p>
                  <p className="text-sm font-neue-haas text-[var(--white)]/60 leading-relaxed max-w-md">
                    {featuredEvent.tagline}
                  </p>
                </div>
                
                {/* Artists Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {["Yasmina", "Sabzi", "Wian"].map((artist, i) => (
                    <div key={i}>
                      <p className="text-[8px] font-neue-haas uppercase tracking-[0.4em] text-[var(--gold)]/40 mb-1">Artist</p>
                      <p className="text-base font-prettywise text-[var(--white)]">{artist}</p>
                    </div>
                  ))}
                </div>
                
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-[var(--gold)]/10">
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-3">Venue</p>
                    <p className="text-lg font-prettywise text-[var(--white)]">Fortune Sound Club</p>
                    <p className="text-xs font-neue-haas text-[var(--white)]/40">Vancouver, Canada</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-3">Time</p>
                    <p className="text-lg font-neue-haas text-[var(--white)]">10:00 PM</p>
                    <p className="text-xs font-neue-haas text-[var(--white)]/40">Late Night Session</p>
                  </div>
                </div>
                
                {/* Price & Action */}
                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40 mb-2">Starting From</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl lg:text-7xl font-prettywise text-[var(--gold)]">${featuredEvent.price}</span>
                      <span className="text-xs font-neue-haas text-[var(--gold)]/40 uppercase tracking-wider">CAD</span>
                    </div>
                  </div>
                  
                  {/* Luxury CTA */}
                  <div className="space-y-4">
                    <button className="w-full relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--gold)]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--dark-gold)] opacity-0 group-hover:opacity-100" />
                      <div className="relative px-8 py-6">
                        <p className="text-[11px] font-neue-haas uppercase tracking-[0.5em] text-[var(--maroon-red)] font-medium">
                          Reserve Experience
                        </p>
                      </div>
                    </button>
                    
                    <div className="flex items-center justify-between text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--white)]/30">
                      <span>19+ Event</span>
                      <span>{featuredEvent.availability}% Capacity</span>
                      <span>ID Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
