import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronRight, Sparkles, Calendar, MapPin, Clock, Users } from "lucide-react";

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
      status: "Waitlist",
      featured: true
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-primary via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-[150%] h-[150%] bg-gradient-to-tl from-primary via-transparent to-transparent blur-3xl" />
      </div>

      {/* Hero Section - Luxury Magazine Style */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, currentColor 100px, currentColor 101px),
                             repeating-linear-gradient(0deg, transparent, transparent 100px, currentColor 100px, currentColor 101px)`
          }} 
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content - Editorial Typography */}
            <div className="lg:col-span-5 space-y-10">
              {/* Premium Label */}
              <div className="inline-flex items-center gap-3 group">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-primary/80 font-light">
                  Exclusive Premier
                </span>
                <div className="h-px bg-gradient-to-r from-primary/50 to-transparent w-16 group-hover:w-24 transition-all duration-700" />
              </div>

              {/* Main Title - Editorial Style */}
              <div className="space-y-4">
                <h1 className="text-[clamp(3.5rem,8vw,6rem)] leading-[0.85] font-serif font-extralight">
                  <span className="block text-foreground/90">NAZAARA</span>
                  <span className="block text-primary/90 font-serif italic ml-12 text-[0.6em]">
                    Vancouver Launch
                  </span>
                </h1>
                
                {/* Elegant Divider */}
                <div className="flex items-center gap-6 my-8">
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
                  <div className="w-2 h-2 rotate-45 bg-primary/20" />
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
                </div>

                {/* Tagline with Premium Typography */}
                <p className="text-lg md:text-xl font-light text-muted-foreground/90 leading-relaxed tracking-wide">
                  {featuredEvent.tagline}
                </p>
              </div>

              {/* Event Details - Refined Grid */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary/60">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-light">Date</span>
                    </div>
                    <p className="text-sm font-light text-foreground/90">August 31, 2024</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary/60">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-light">Time</span>
                    </div>
                    <p className="text-sm font-light text-foreground/90">10 PM - 2 AM</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary/60">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-light">Venue</span>
                    </div>
                    <p className="text-sm font-light text-foreground/90">Fortune Sound Club</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary/60">
                      <Users className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-light">Artists</span>
                    </div>
                    <p className="text-sm font-light text-foreground/90">3 Performers</p>
                  </div>
                </div>

                {/* Featured Artists */}
                <div className="pt-6 border-t border-border/20">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-3">Featuring</p>
                  <p className="text-base font-light text-foreground/80 italic">{featuredEvent.tour}</p>
                </div>
              </div>

              {/* CTA Section - Luxury Style */}
              <div className="space-y-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">From</span>
                  <span className="text-5xl font-extralight text-primary">
                    <span className="text-sm align-top">CAD</span> {featuredEvent.price}
                  </span>
                  <span className="text-xs text-primary/60">+ fees</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-xs uppercase tracking-[0.25em] font-light transition-all duration-300 hover:tracking-[0.3em] hover:shadow-2xl hover:shadow-primary/20"
                  >
                    Reserve Your Spot
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-xs uppercase tracking-[0.25em] font-light group"
                  >
                    View Details
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Availability Indicator */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-4 ${i < 7 ? 'bg-primary/60' : 'bg-muted/30'} transition-all duration-300 hover:h-6`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {featuredEvent.availability}% Available
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual - Premium Poster Display */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 lg:-inset-8">
                  <div className="absolute inset-0 border border-primary/10 transform rotate-1" />
                  <div className="absolute inset-0 border border-primary/5 transform -rotate-1" />
                </div>

                {/* Main Poster Container */}
                <div className="relative aspect-[3/4] max-w-[600px] mx-auto overflow-hidden group">
                  {/* Gradient Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent z-10" />
                  
                  {/* Image with Parallax Effect */}
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-1000">
                    <Image 
                      src={featuredEvent.image}
                      alt={featuredEvent.artist}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 z-20">
                    <div className="bg-background/10 backdrop-blur-md border border-foreground/10 px-4 py-2">
                      <p className="text-2xl font-extralight text-foreground">31</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/80">August</p>
                    </div>
                  </div>

                  {/* Bottom Gradient Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-background to-transparent">
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 mb-2">19+ Event</p>
                    <p className="text-sm font-light text-foreground/80">Valid ID Required at Entry</p>
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute -bottom-4 -right-4 grid grid-cols-3 gap-2 opacity-20">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-primary rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="relative py-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-background px-6">
            <div className="w-2 h-2 rotate-45 bg-primary/30" />
          </div>
        </div>
      </div>

      {/* Upcoming Events - Editorial Gallery */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          {/* Section Header - Refined */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1 max-w-[100px]" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-primary/70 font-light">
                Curated Experiences
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1 max-w-[100px]" />
            </div>
            
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-serif font-extralight leading-tight">
              <span className="text-foreground/90">Upcoming</span>
              <span className="block text-primary/80 italic text-[0.85em] mt-2">Performances</span>
            </h2>
            
            <p className="text-muted-foreground/70 font-light mt-6 max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in carefully orchestrated evenings where artistry meets atmosphere
            </p>
          </div>

          {/* Premium Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div 
                key={event.id} 
                className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${index === 0 ? 'h-[600px]' : 'h-[286px]'}`}>
                  {/* Background Image */}
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image 
                      src={event.image}
                      alt={event.artist}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 ${
                          event.status === 'Waitlist' ? 'bg-primary/20' : 
                          event.status === 'Exclusive' ? 'bg-primary/30' : 
                          'bg-background/20'
                        } backdrop-blur-sm text-foreground/80 text-[10px] uppercase tracking-[0.2em] border border-foreground/10`}>
                          {event.status}
                        </span>
                        {event.featured && (
                          <Sparkles className="w-4 h-4 text-primary/60 animate-pulse" />
                        )}
                      </div>
                      <div className="text-4xl font-serif font-extralight text-foreground/20">
                        {event.number}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div>
                      <div className={`space-y-3 ${index === 0 ? 'max-w-md' : ''}`}>
                        <h3 className={`font-serif font-extralight text-foreground ${
                          index === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                        }`}>
                          {event.artist}
                        </h3>
                        <p className={`font-light text-foreground/70 ${
                          index === 0 ? 'text-lg' : 'text-base'
                        }`}>
                          {event.title}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-6">
                        <div>
                          <p className="text-sm text-foreground/50 uppercase tracking-wider">
                            {event.date} {event.year}
                          </p>
                          <p className="text-sm text-foreground/50 font-light">
                            {event.venue}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-1">From</p>
                          <p className="text-2xl font-extralight text-primary">
                            ${event.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>

          {/* Events List - Minimalist Luxury */}
          <div className="max-w-6xl mx-auto">
            <div className="border-t border-border/20 pt-8">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="group cursor-pointer border-b border-border/20 py-8 hover:bg-muted/5 transition-colors duration-300"
                >
                  <div className="grid grid-cols-12 gap-6 items-center">
                    {/* Number */}
                    <div className="col-span-1">
                      <span className="text-3xl font-serif font-extralight text-muted-foreground/20">
                        {event.number}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="col-span-2">
                      <div className="relative h-20 w-full overflow-hidden">
                        <Image 
                          src={event.image}
                          alt={event.artist}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="col-span-5">
                      <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                        {event.artist}
                      </h3>
                      <p className="text-sm text-muted-foreground/70 font-light mt-1">
                        {event.title} · {event.venue}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-center">
                      <p className="text-base font-light text-foreground/80">
                        {event.date}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mt-1">
                        {event.year}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="col-span-2 text-right">
                      <p className="text-xl font-extralight text-primary mb-2">
                        ${event.price}
                      </p>
                      <button className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 ml-auto group">
                        View
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                className="border-primary/30 text-primary hover:bg-primary/10 px-10 py-6 text-xs uppercase tracking-[0.3em] font-light group"
              >
                Explore All Events
                <ArrowUpRight className="w-4 h-4 ml-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Refined Minimalism */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { value: "500K", label: "Global Audience", suffix: "+" },
                { value: "150", label: "World Cities", suffix: "+" },
                { value: "200", label: "Featured Artists", suffix: "+" },
                { value: "10", label: "Years of Excellence", suffix: "" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative">
                    <div className="text-5xl lg:text-6xl font-serif font-extralight text-primary/80 mb-3 transition-transform duration-500 group-hover:scale-105">
                      {stat.value}
                      <span className="text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mt-4">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Private Events - Ultra Luxury */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="space-y-10">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-4 h-4 text-primary/60" />
                    <span className="text-[11px] uppercase tracking-[0.35em] text-primary/70 font-light">
                      Bespoke Services
                    </span>
                  </div>
                  
                  <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-serif font-extralight leading-tight mb-6">
                    <span className="text-foreground/90">Private</span>
                    <span className="text-primary/80 italic"> Celebrations</span>
                  </h2>
                  
                  <p className="text-muted-foreground/70 font-light leading-relaxed text-lg">
                    Elevate your most precious moments with world-class entertainment, 
                    meticulously crafted to reflect your unique vision and exceed every expectation.
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      title: "Celebrity Performances",
                      description: "Exclusive access to internationally acclaimed artists",
                      icon: "✦"
                    },
                    {
                      title: "Luxury Weddings",
                      description: "Bespoke entertainment curation for your special day",
                      icon: "✧"
                    },
                    {
                      title: "Corporate Excellence",
                      description: "Premium events that leave lasting impressions",
                      icon: "✦"
                    }
                  ].map((service, index) => (
                    <div 
                      key={index} 
                      className="group cursor-pointer border border-border/20 p-6 hover:border-primary/30 transition-all duration-500 hover:bg-muted/5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-primary/60 text-xl">{service.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground/60 font-light">
                            {service.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-xs uppercase tracking-[0.3em] font-light group"
                  >
                    Begin Your Journey
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Visual - Overlapping Images */}
            <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0">
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden">
                  <div className="relative w-full h-full group">
                    <Image 
                      src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                      alt="Luxury private event"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  </div>
                </div>
                
                {/* Secondary Image */}
                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden border-[6px] border-background shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image 
                      src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                      alt="Exclusive performance"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 w-20 h-20 border border-primary/20" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border border-primary/20 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Editorial Minimalism */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Decorative Header */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-20" />
              <div className="relative">
                <span className="text-[11px] uppercase tracking-[0.4em] text-primary/60 font-light">
                  EST. 2014
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-20" />
            </div>

            {/* Main Content */}
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-serif font-extralight leading-tight mb-8">
              <span className="text-foreground/90">A Decade of</span>
              <span className="text-primary/80 italic block mt-2">Unparalleled Excellence</span>
            </h2>

            <p className="text-lg text-muted-foreground/70 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
              Nazaara Live has redefined South Asian entertainment globally, creating moments 
              that transcend the ordinary and establish new standards of artistic excellence.
            </p>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { number: "500+", label: "World-Class Productions" },
                { number: "150+", label: "Global Partnerships" },
                { number: "98%", label: "Client Satisfaction" }
              ].map((achievement, index) => (
                <div key={index} className="group">
                  <div className="bg-muted/5 border border-border/20 p-8 hover:border-primary/30 transition-all duration-500">
                    <div className="text-4xl font-serif font-extralight text-primary/80 mb-3">
                      {achievement.number}
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                      {achievement.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center justify-center gap-8">
              <button className="text-sm uppercase tracking-[0.2em] text-primary/70 hover:text-primary transition-colors flex items-center gap-2 group font-light">
                Our Heritage
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="w-1 h-1 bg-primary/30 rounded-full" />
              <button className="text-sm uppercase tracking-[0.2em] text-primary/70 hover:text-primary transition-colors flex items-center gap-2 group font-light">
                Global Network
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Sophisticated CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary/60" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-3xl font-serif font-extralight text-foreground mb-4">
              Join the <span className="italic text-primary">Inner Circle</span>
            </h3>
            
            <p className="text-muted-foreground/70 font-light mb-10 leading-relaxed">
              Receive exclusive presale access, VIP invitations, and curated cultural insights 
              delivered to your inbox
            </p>

            {/* Email Input - Luxury Style */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-border/30 px-6 py-4 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xs uppercase tracking-[0.25em] font-light"
              >
                Subscribe
              </Button>
            </div>

            {/* Privacy Note */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mt-6">
              We respect your privacy · Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-24" />
              <div className="w-2 h-2 rotate-45 bg-primary/30" />
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}