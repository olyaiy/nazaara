import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ArrowRight, Sparkles, Circle, Star, ArrowUpRight } from "lucide-react";

export default function Home() {
  const featuredEvent = {
    id: 1,
    artist: "Arijit Singh",
    title: "Live in Concert",
    tagline: "The Voice That Defines a Generation",
    tour: "North America Tour 2025",
    description: "An evening of soul-stirring melodies and unforgettable moments with Bollywood's most celebrated voice.",
    dates: "15 March — 30 April 2025",
    venue: "Madison Square Garden, New York",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
    price: "89",
    availability: 25
  };

  const upcomingEvents = [
    {
      id: 2,
      number: "02",
      artist: "Holi NYC",
      title: "Festival of Colors",
      date: "08 Mar",
      year: "2025",
      venue: "Madison Square Garden",
      price: "45",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      status: "On Sale"
    },
    {
      id: 3,
      number: "03",
      artist: "Shreya Ghoshal",
      title: "An Intimate Evening",
      date: "05 Apr",
      year: "2025",
      venue: "Dubai Opera",
      price: "120",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      status: "Premium"
    },
    {
      id: 4,
      number: "04",
      artist: "Punjabi Fest",
      title: "Diljit × AP Dhillon",
      date: "20 May",
      year: "2025",
      venue: "Los Angeles Arena",
      price: "65",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
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
      price: "35",
      image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
      status: "On Sale"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 lg:pr-12">
              {/* Premium Badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-light">Featured Event</span>
              </div>
              
              {/* Artist Name - Large */}
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] text-foreground">
                  {featuredEvent.artist}
                </h1>
                <div className="text-2xl md:text-3xl font-serif italic text-primary mt-2">
                  {featuredEvent.title}
                </div>
              </div>
              
              {/* Tagline */}
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-8 font-light">
                {featuredEvent.tagline}
              </p>
              
              {/* Event Details - Minimal */}
              <div className="space-y-4 mb-10 text-sm">
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground uppercase text-xs tracking-wider w-20">Date</span>
                  <span className="text-foreground font-light">{featuredEvent.dates}</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground uppercase text-xs tracking-wider w-20">Venue</span>
                  <span className="text-foreground font-light">{featuredEvent.venue}</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground uppercase text-xs tracking-wider w-20">Tour</span>
                  <span className="text-foreground font-light">{featuredEvent.tour}</span>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">From</div>
                  <div className="text-3xl font-light text-primary">${featuredEvent.price}</div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm uppercase tracking-wider font-light"
                >
                  Reserve Tickets
                </Button>
              </div>
              
              {/* Availability Indicator */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Circle className="w-2 h-2 fill-primary text-primary" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {featuredEvent.availability}% Remaining
                  </span>
                </div>
                <div className="w-full max-w-xs h-[1px] bg-border">
                  <div 
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${featuredEvent.availability}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="lg:col-span-7 relative h-[500px] lg:h-[650px]">
              <div className="absolute inset-0">
                <Image 
                  src={featuredEvent.image}
                  alt={featuredEvent.artist}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              
              {/* Elegant overlay text */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-foreground/80 font-light text-sm leading-relaxed max-w-md">
                  {featuredEvent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border/50" />
      </div>

      {/* Premium Events List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 mb-16">
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
                Upcoming
                <span className="block font-serif italic text-primary">Performances</span>
              </h2>
            </div>
            <div className="lg:col-span-8 flex items-end justify-end">
              <button className="text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
                View Full Calendar
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Events List - Editorial Style */}
          <div className="space-y-px">
            {upcomingEvents.map((event, index) => (
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
                Curate unforgettable moments with exclusive access to the world's most celebrated 
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
              entertainment production. We are the trusted partner for the world's most prestigious 
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