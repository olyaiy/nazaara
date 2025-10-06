import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPublicEventBySlug, getPublicEvents, getPublicEventStops } from "@/lib/public-actions";
import EventHero from "@/components/event-page/hero";
import VenueFeatures from "@/components/event-page/venue-features";
import ArtistShowcase from "@/components/event-page/artist-showcase";
import EventBio from "@/components/event-page/event-bio";

// Revalidate every 60 seconds (or set to 0 for no caching)
export const revalidate = 0;

interface EventPageProps {
  params: Promise<{
    "event-slug": string;
  }>;
}

// Generate metadata for each event page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { "event-slug": eventSlug } = await params;
  const event = await getPublicEventBySlug(eventSlug);

  if (!event) {
    return {
      title: "Event Not Found | Nazaara Live",
      description: "The event you're looking for could not be found.",
    };
  }

  // Format dates for better readability
  const eventDate = `${event.date} ${event.year}`;
  const allArtists = event.artists.map(a => a.name).join(", ");
  const artistsDisplay = allArtists || event.artist;

  // Create comprehensive title and description
  const pageTitle = `${event.title}${event.tagline ? ` - ${event.tagline}` : ""} | ${event.city} ${event.year} | Nazaara Live`;
  const pageDescription = event.description 
    ? event.description.substring(0, 155) + (event.description.length > 155 ? "..." : "")
    : `Join us for ${event.title}${event.tagline ? `: ${event.tagline}` : ""} featuring ${artistsDisplay} at ${event.venue} in ${event.city}, ${event.country} on ${eventDate}. ${event.ticketUrl ? "Get your tickets now!" : "Event details coming soon."}`;

  // Generate keywords based on event data
  const keywords = [
    event.title,
    ...event.artists.map(a => a.name),
    event.venue,
    event.city,
    event.country,
    "live music",
    "concert",
    "event",
    "Nazaara Live",
  ].filter(Boolean);

  const canonicalUrl = `https://nazaara.live/event/${eventSlug}`;
  const imageUrl = event.image || "https://nazaara.live/OG.png";

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(", "),
    authors: [{ name: "Nazaara Live" }],
    creator: "Nazaara Live",
    publisher: "Nazaara Live",
    
    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "Nazaara Live",
      title: `${event.title}${event.tagline ? ` - ${event.tagline}` : ""}`,
      description: event.tagline || `Experience ${artistsDisplay} live at ${event.venue}`,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${event.title} - ${artistsDisplay} at ${event.venue}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@nazaaralive",
      creator: "@nazaaralive",
      title: `${event.title}${event.tagline ? ` - ${event.tagline}` : ""}`,
      description: event.tagline || `Experience ${artistsDisplay} live at ${event.venue}`,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params for all events (optional, for better performance)
export async function generateStaticParams() {
  const events = await getPublicEvents();
  return events.map((event) => ({
    "event-slug": event.slug,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { "event-slug": eventSlug } = await params;
  const event = await getPublicEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }
  const stops = await getPublicEventStops(event.id);

  // Generate JSON-LD structured data for SEO
  const eventStartDate = typeof event.startTime === "string" 
    ? new Date(event.startTime).toISOString()
    : event.startTime.toISOString();
  
  const eventEndDate = typeof event.endTime === "string"
    ? new Date(event.endTime).toISOString()
    : event.endTime.toISOString();

  // Determine event status - keep as EventScheduled (can be updated to EventCancelled if needed)
  const eventStatus = "https://schema.org/EventScheduled";

  // Build location object
  const locationObject = event.venueAddress ? {
    "@type": "Place",
    name: event.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: event.venueAddress,
      addressLocality: event.city,
      addressCountry: event.country,
    },
  } : {
    "@type": "Place",
    name: event.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: event.city,
      addressCountry: event.country,
    },
  };

  // Build performers array
  const performers = event.artists.map(artist => ({
    "@type": "MusicGroup",
    name: artist.name,
    ...(artist.image && { image: artist.image }),
    ...(artist.instagram && { 
      sameAs: [`https://instagram.com/${artist.instagram}`] 
    }),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.title,
    ...(event.tagline && { alternateName: event.tagline }),
    ...(event.description && { description: event.description }),
    image: event.image || "https://nazaara.live/OG.png",
    startDate: eventStartDate,
    endDate: eventEndDate,
    eventStatus,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: locationObject,
    ...(performers.length > 0 && { performer: performers }),
    organizer: {
      "@type": "Organization",
      name: "Nazaara Live",
      url: "https://nazaara.live",
    },
    ...(event.ticketUrl && {
      offers: {
        "@type": "Offer",
        url: event.ticketUrl,
        price: "0",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString(),
      },
    }),
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-dvh bg-[var(--maroon-red)]">
        <EventHero event={event} />
        <EventBio bio={event.description || ""} />
        <ArtistShowcase artists={event.artists} />
        {stops.length === 0 && <VenueFeatures event={event} />}
      </div>
    </>
  );
}
