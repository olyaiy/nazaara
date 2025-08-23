import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function UpcomingEvents() {
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
  );
}