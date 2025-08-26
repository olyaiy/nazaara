import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, events } from "@/content/events";
import EventHero from "@/components/event-page/hero";
import VenueFeatures from "@/components/event-page/venue-features";
import ArtistShowcase from "@/components/event-page/artist-showcase";
import EventBio from "@/components/event-page/event-bio";

interface EventPageProps {
  params: Promise<{
    "event-slug": string;
  }>;
}

// Generate metadata for each event page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { "event-slug": eventSlug } = await params;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    return {
      title: "Event Not Found | Nazaara Live",
      description: "The event you're looking for could not be found.",
    };
  }

  return {
    title: `${event.artist} - ${event.title} | Nazaara Live`,
    description: `${event.tagline || `Join us for ${event.artist} ${event.title} at ${event.venue} in ${event.city}, ${event.country} on ${event.date}, ${event.year}.`} Tickets starting from $${event.price}.`,
    openGraph: {
      title: `${event.artist} - ${event.title}`,
      description: event.tagline || `Experience ${event.artist} live at ${event.venue}`,
      images: [
        {
          url: event.image,
          width: 800,
          height: 1000,
          alt: `${event.artist} - ${event.title} poster`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.artist} - ${event.title}`,
      description: event.tagline || `Experience ${event.artist} live at ${event.venue}`,
      images: [event.image],
    },
  };
}

// Generate static params for all events (optional, for better performance)
export async function generateStaticParams() {
  return events.map((event) => ({
    "event-slug": event.slug,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { "event-slug": eventSlug } = await params;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-[var(--maroon-red)]">
      <EventHero event={event} />
      <EventBio bio={event.description} />
      <ArtistShowcase artists={event.artists} />
      <VenueFeatures event={event} />
    </div>
  );
}
