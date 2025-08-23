import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Star, ArrowRight, Sparkles, Clock, Trophy, Building2, ChevronRight, Mic2, PartyPopper, Briefcase, TrendingUp, Ticket } from "lucide-react";

export default function Home() {
  const featuredEvent = {
    id: 1,
    title: "Arijit Singh Live",
    subtitle: "North America Tour 2025",
    description: "Experience the magic of Bollywood's most celebrated voice",
    date: "March 15 - April 30, 2025",
    nextShow: "New York - Madison Square Garden",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    price: "From $89",
    status: "selling-fast",
    soldPercentage: 75
  };

  const upcomingEvents = [
    {
      id: 2,
      title: "Holi Festival NYC",
      subtitle: "Festival of Colors",
      date: "March 8, 2025",
      location: "Madison Square Garden",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      price: "$45+",
      category: "Festival",
      trending: true
    },
    {
      id: 3,
      title: "Shreya Ghoshal",
      subtitle: "An Intimate Evening",
      date: "April 5, 2025",
      location: "Dubai Opera",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      price: "$120+",
      category: "Concert"
    },
    {
      id: 4,
      title: "Punjabi Music Fest",
      subtitle: "Diljit, AP Dhillon & More",
      date: "May 20, 2025",
      location: "Los Angeles Arena",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
      price: "$65+",
      category: "Festival"
    },
    {
      id: 5,
      title: "Rahman Symphony",
      subtitle: "Oscar Winner Live",
      date: "June 15, 2025",
      location: "Sydney Opera House",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      price: "$150+",
      category: "Concert",
      premium: true
    },
    {
      id: 6,
      title: "Bollywood Nights",
      subtitle: "DJ Chetas & Friends",
      date: "July 4, 2025",
      location: "Miami Beach",
      image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
      price: "$35+",
      category: "Party"
    }
  ];

  const privateServices = [
    {
      icon: Mic2,
      title: "Celebrity Performances",
      description: "Book A-list Bollywood stars and musicians for your exclusive events"
    },
    {
      icon: PartyPopper,
      title: "Wedding Entertainment",
      description: "Transform your special day with world-class South Asian entertainment"
    },
    {
      icon: Briefcase,
      title: "Corporate Events",
      description: "Elevate your corporate gatherings with cultural performances"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - More compact */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary rounded-full" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Event Info - Taking 3 columns */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured Event</span>
                <div className="h-px bg-primary/30 w-12" />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4 leading-[0.9]">
                {featuredEvent.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-primary mb-6">
                {featuredEvent.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                {featuredEvent.description}
              </p>
              
              {/* Event details in a cleaner layout */}
              <div className="flex flex-wrap gap-6 mb-8 text-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span className="text-sm">{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{featuredEvent.nextShow}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">75% Sold</span>
                </div>
              </div>
              
              {/* Minimal progress indicator */}
              <div className="w-full max-w-md mb-8">
                <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${featuredEvent.soldPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Tickets • {featuredEvent.price}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent">
                  View All Tour Dates
                </Button>
              </div>
            </div>
            
            {/* Right: Event Image - Taking 2 columns */}
            <div className="lg:col-span-2 relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image 
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-background/10" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium">
                <Clock className="inline-block w-4 h-4 mr-2" />
                Limited Availability
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events - Clean grid layout */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Ticket className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">All Events</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                Upcoming Spectacles
              </h2>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent group">
              View All
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Events Grid - No cards, cleaner design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                  <Image 
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/20" />
                  
                  {/* Event badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-background/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                    {event.trending && (
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Trending
                      </span>
                    )}
                    {event.premium && (
                      <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.subtitle}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="space-y-1 text-sm">
                      <div className="text-muted-foreground">{event.date}</div>
                      <div className="text-foreground font-medium">{event.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{event.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner - Minimalist */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">500K+</div>
              <div className="text-sm text-muted-foreground">Tickets Sold</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">200+</div>
              <div className="text-sm text-muted-foreground">Artists</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Bookings - Modern layout */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-secondary mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Exclusive Services</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Private Entertainment
                <span className="block text-primary mt-2">Tailored for You</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                From intimate gatherings to grand celebrations, we bring the biggest names in 
                South Asian entertainment directly to your exclusive events.
              </p>
              
              {/* Services list */}
              <div className="space-y-6 mb-8">
                {privateServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Right: Visual element */}
            <div className="relative">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full" />
                <div className="absolute inset-8 bg-primary/10 rounded-full" />
                <div className="absolute inset-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-serif font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / B2B - Clean split section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* About Us */}
            <div className="group cursor-pointer border-r border-border/30 pr-8">
              <div className="inline-flex items-center gap-2 text-primary mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">About Nazaara</span>
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                A Decade of Excellence
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Since 2014, we've been the bridge between legendary South Asian artists and their 
                global audience, creating unforgettable experiences across continents.
              </p>
              
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Productions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5M+</div>
                  <div className="text-xs text-muted-foreground">Happy Fans</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">A-List Artists</div>
                </div>
              </div>
              
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 group">
                Learn Our Story
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* B2B */}
            <div className="group cursor-pointer pl-8">
              <div className="inline-flex items-center gap-2 text-secondary mb-6">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">B2B Partnership</span>
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Partner With Us
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Join leading venues, corporations, and organizations who trust us to deliver 
                world-class South Asian entertainment for their audiences.
              </p>
              
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-xs text-muted-foreground">Venue Partners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">Corporate Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-xs text-muted-foreground">Partner Rating</div>
                </div>
              </div>
              
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 group">
                Explore Partnership
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Simple and clean */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
              Never Miss a Beat
            </h3>
            <p className="text-muted-foreground mb-6">
              Get exclusive presale access and event announcements
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Subscribe for Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}