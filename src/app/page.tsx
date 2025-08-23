import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Home() {
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

  const upcomingEvents = [
    {
      id: 2,
      number: "02",
      artist: "AJ WAVY",
      title: "Back 2 School",
      date: "04 Sep",
      year: "2024",
      venue: "Icon Boston",
      city: "Boston",
      country: "USA",
      price: "35",
      image: "/events/back 2 school poster.webp",
      status: "Waitlist"
    },
    {
      id: 3,
      number: "03",
      artist: "TAMASHA",
      title: "Strictly Bollywood",
      date: "23 Aug",
      year: "2024",
      venue: "LVL Three Calgary",
      city: "Calgary",
      country: "Canada",
      price: "28",
      image: "/events/TAMASHA Strictly Bollywood Poster.webp",
      status: "On Sale"
    },
    {
      id: 4,
      number: "04",
      artist: "AJ WAVY",
      title: "Back 2 School NYC",
      date: "05 Sep",
      year: "2024",
      venue: "EVOL New York",
      city: "New York",
      country: "USA",
      price: "40",
      image: "/events/back 2 school NYC Poster.webp",
      status: "On Sale"
    },
    {
      id: 5,
      number: "05",
      artist: "AR Rahman",
      title: "Symphony Orchestra",
      date: "15 Jun",
      year: "2025",
      venue: "Sydney Opera House",
      city: "Sydney",
      country: "Australia",
      price: "250",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      status: "Exclusive"
    },
    {
      id: 6,
      number: "06",
      artist: "Bollywood Night",
      title: "Summer Beach Party",
      date: "04 Jul",
      year: "2025",
      venue: "Miami Beach",
      city: "Miami",
      country: "USA",
      price: "35",
      image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
      status: "On Sale"
    }
  ];

  

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Premium Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] flex items-center py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 lg:pr-8 xl:pr-12">
              {/* Premium Badge */}
              <div className="flex items-center gap-3 mb-4 md:mb-6 lg:mb-8">
                <div className="w-6 md:w-8 h-px bg-primary" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-light">Featured Event</span>
              </div>
              
              {/* Artist Name - Large */}
              <div className="mb-4 md:mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light leading-[0.85] text-foreground">
                  {featuredEvent.artist}
                </h1>
                <div className="text-xl sm:text-2xl md:text-3xl font-serif italic text-primary mt-1 md:mt-2">
                  {featuredEvent.title}
                </div>
              </div>
              
              {/* Tagline */}
              <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-wide md:tracking-wider mb-4 md:mb-6 lg:mb-8 font-light">
                {featuredEvent.tagline}
              </p>
              
              {/* Event Details - Minimal */}
              <div className="space-y-2 md:space-y-3 lg:space-y-4 mb-6 md:mb-8 lg:mb-10 text-xs md:text-sm">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-muted-foreground uppercase text-[10px] md:text-xs tracking-wider w-16 md:w-20">Date</span>
                  <span className="text-foreground font-light">{featuredEvent.dates}</span>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-muted-foreground uppercase text-[10px] md:text-xs tracking-wider w-16 md:w-20">Venue</span>
                  <span className="text-foreground font-light">{featuredEvent.venue}</span>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-muted-foreground uppercase text-[10px] md:text-xs tracking-wider w-16 md:w-20">Tour</span>
                  <span className="text-foreground font-light">{featuredEvent.tour}</span>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                <div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mb-1">From</div>
                  <div className="text-2xl md:text-3xl font-light text-primary">${featuredEvent.price}</div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-xs md:text-sm uppercase tracking-wide md:tracking-wider font-light"
                >
                  Reserve Tickets
                </Button>
              </div>
              
            </div>
            
            {/* Right Image - 4:5 Aspect Ratio */}
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative w-full max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                  <Image 
                    src={featuredEvent.image}
                    alt={featuredEvent.artist}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border/50" />
      </div>

      {/* Events Section - Featured & Complete List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-light">Upcoming Events</span>
              </div>
              <button className="text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
                View Full Calendar
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
              Signature
              <span className="block font-serif italic text-primary">Experiences</span>
            </h2>
          </div>

          {/* Asymmetric Luxury Grid */}
          <div className="grid lg:grid-cols-12 gap-6 mb-24">
            {/* Primary Featured Event - Takes 7 columns */}
            <div className="lg:col-span-7 group cursor-pointer">
              <div className="relative h-[450px] overflow-hidden">
                <Image 
                  src={upcomingEvents[0].image}
                  alt={upcomingEvents[0].artist}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-background/10 backdrop-blur-sm text-foreground/90 text-xs uppercase tracking-wider border border-foreground/10">
                      {upcomingEvents[0].status}
                    </span>
                    <div className="text-right">
                      <div className="text-3xl font-serif font-light text-foreground/90">{upcomingEvents[0].number}</div>
                    </div>
                  </div>
                  
                  {/* Bottom Content */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-2">
                      {upcomingEvents[0].artist}
                    </h3>
                    <p className="text-lg font-light text-foreground/80 mb-4">{upcomingEvents[0].title}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-foreground/60 uppercase tracking-wider">{upcomingEvents[0].date} {upcomingEvents[0].year}</p>
                        <p className="text-sm text-foreground/60">{upcomingEvents[0].venue}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-1">From</div>
                        <div className="text-2xl font-light text-primary">${upcomingEvents[0].price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary Featured Events - Takes 5 columns, stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {upcomingEvents.slice(1, 3).map((event) => (
                <div key={event.id} className="group cursor-pointer flex-1">
                  <div className="relative h-full min-h-[213px] overflow-hidden">
                    <Image 
                      src={event.image}
                      alt={event.artist}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    
                    {/* Minimal Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs uppercase tracking-wider text-foreground/70">
                          {event.status}
                        </span>
                        <div className="text-2xl font-serif font-light text-foreground/80">{event.number}</div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-serif font-light text-foreground mb-1">
                          {event.artist}
                        </h3>
                        <p className="text-sm text-foreground/70 mb-3">{event.title}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-foreground/60 uppercase tracking-wider">
                            {event.date} · {event.venue}
                          </p>
                          <span className="text-lg font-light text-primary">${event.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events List - Editorial Style */}
          <div className="space-y-px">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group">
                <div className="grid lg:grid-cols-12 gap-4 py-8 border-b border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="text-5xl font-serif font-light text-muted-foreground/30">
                      {event.number}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="lg:col-span-2">
                    <div className="relative h-24 w-full overflow-hidden">
                      <Image 
                        src={event.image}
                        alt={event.artist}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-background/20" />
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="lg:col-span-6 flex items-center">
                    <div>
                      <h3 className="text-2xl font-serif font-light text-foreground group-hover:text-primary transition-colors">
                        {event.artist}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light mt-1">
                        {event.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Date & Venue */}
                  <div className="lg:col-span-2 flex items-center">
                    <div className="text-right lg:text-left">
                      <div className="text-lg font-light text-foreground">
                        {event.date}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price & Status */}
                  <div className="lg:col-span-1 flex items-center justify-end">
                    <div className="text-right">
                      <div className="text-xl font-light text-primary">
                        ${event.price}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {event.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

  
