"use server"

import { db } from "@/db/drizzle"
import { events, artists, venues, eventsArtists } from "@/db/schema"
import { eq, and, gte, asc, desc } from "drizzle-orm"

export interface PublicArtist {
  name: string;
  instagram?: string | null;
  soundcloud?: string | null;
  image?: string | null;
}

export interface PublicEvent {
  id: number;
  slug: string;
  artist: string; // Primary artist for backward compatibility
  artists: PublicArtist[];
  title: string;
  tagline?: string | null;
  description?: string | null;
  date: string; // Formatted as "DD MMM"
  year: string;
  venue: string;
  venueDescription?: string | null;
  venueAddress?: string | null;
  venueAddressUrl?: string | null;
  venueImages?: string[] | null;
  city: string;
  country: string;
  image: string | null;
  status: string;
  isFeatured: boolean;
  ticketUrl?: string | null;
  startTime: Date;
  endTime: Date;
}

function formatDateToDisplay(date: Date): { date: string; year: string } {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  
  return {
    date: `${day.toString().padStart(2, '0')} ${month}`,
    year
  };
}

export async function getPublicEvents(): Promise<PublicEvent[]> {
  const eventsWithDetails = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      tagline: events.tagline,
      description: events.description,
      startTime: events.startTime,
      endTime: events.endTime,
      image: events.image,
      ticketUrl: events.ticketUrl,
      venueId: events.venueId,
      venueName: venues.name,
      venueDescription: venues.description,
      venueAddress: venues.address,
      venueAddressUrl: venues.addressUrl,
      venueImages: venues.images,
      venueCity: venues.city,
      venueCountry: venues.country,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .where(eq(events.isPublished, true))
    .orderBy(asc(events.startTime))

  // Get artists for all events (we'll filter them later)
  const eventIds = eventsWithDetails.map(e => e.id);
  const eventArtists = eventIds.length > 0 ? await db
    .select({
      eventId: eventsArtists.eventId,
      artistName: artists.name,
      artistInstagram: artists.instagram,
      artistSoundcloud: artists.soundcloud,
      artistImage: artists.image,
      orderIndex: eventsArtists.orderIndex,
    })
    .from(eventsArtists)
    .leftJoin(artists, eq(eventsArtists.artistId, artists.id))
    .orderBy(eventsArtists.orderIndex) : []

  // Group artists by event and filter to only include our events
  const eventIdSet = new Set(eventIds);
  const artistsByEvent = eventArtists
    .filter(row => eventIdSet.has(row.eventId))
    .reduce((acc, row) => {
      if (!acc[row.eventId]) acc[row.eventId] = []
      if (row.artistName) {
        acc[row.eventId].push({
          name: row.artistName,
          instagram: row.artistInstagram,
          soundcloud: row.artistSoundcloud,
          image: row.artistImage,
          orderIndex: row.orderIndex || 0,
        })
      }
      return acc
    }, {} as Record<number, (PublicArtist & { orderIndex: number })[]>)

  return eventsWithDetails.map(event => {
    const { date, year } = formatDateToDisplay(event.startTime);
    const eventArtistsList = (artistsByEvent[event.id] || [])
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map(({ orderIndex, ...artist }) => artist);
    
    // Use the first artist as the primary artist for backward compatibility
    const primaryArtist = eventArtistsList[0]?.name || event.title;
    
    // Determine if featured (you may want to add an isFeatured field to the database)
    // For now, we'll consider the first upcoming event as featured
    const now = new Date();
    const isFeatured = event.startTime >= now && eventsWithDetails[0]?.id === event.id;
    
    // Determine status based on ticket availability and date
    let status = "On Sale";
    if (!event.ticketUrl) {
      status = "Coming Soon";
    } else if (event.startTime < now) {
      status = "Past Event";
    } else if (isFeatured) {
      status = "Featured";
    }
    
    return {
      id: event.id,
      slug: event.slug,
      artist: primaryArtist,
      artists: eventArtistsList,
      title: event.title,
      tagline: event.tagline,
      description: event.description,
      date,
      year,
      venue: event.venueName || "TBA",
      venueDescription: event.venueDescription,
      venueAddress: event.venueAddress,
      venueAddressUrl: event.venueAddressUrl,
      venueImages: event.venueImages,
      city: event.venueCity || "TBA",
      country: event.venueCountry || "TBA",
      image: event.image,
      status,
      isFeatured,
      ticketUrl: event.ticketUrl,
      startTime: event.startTime,
      endTime: event.endTime,
    };
  });
}

export async function getPublicUpcomingEvents(): Promise<PublicEvent[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const allEvents = await getPublicEvents();
  
  return allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today && !event.isFeatured;
  });
}

export async function getPublicFeaturedEvent(): Promise<PublicEvent | undefined> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const allEvents = await getPublicEvents();
  
  // Return the first upcoming event as featured
  const upcomingEvents = allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  
  return upcomingEvents[0];
}

export async function getPublicEventForCity(city?: string): Promise<PublicEvent | undefined> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const allEvents = await getPublicEvents();
  
  // Filter out past events
  const upcomingEvents = allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  
  if (city) {
    const match = upcomingEvents.find((e) => e.city.toLowerCase() === city.toLowerCase());
    if (match) return match;
  }
  
  // Fallback – return the first upcoming event
  return upcomingEvents[0];
}

export async function getPublicEventBySlug(slug: string): Promise<PublicEvent | null> {
  const eventWithDetails = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      tagline: events.tagline,
      description: events.description,
      startTime: events.startTime,
      endTime: events.endTime,
      image: events.image,
      ticketUrl: events.ticketUrl,
      venueId: events.venueId,
      venueName: venues.name,
      venueDescription: venues.description,
      venueAddress: venues.address,
      venueAddressUrl: venues.addressUrl,
      venueImages: venues.images,
      venueCity: venues.city,
      venueCountry: venues.country,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .where(and(
      eq(events.slug, slug),
      eq(events.isPublished, true)
    ))
    .limit(1)

  if (!eventWithDetails[0]) {
    return null
  }

  const event = eventWithDetails[0];

  // Get artists for this event
  const eventArtists = await db
    .select({
      artistName: artists.name,
      artistInstagram: artists.instagram,
      artistSoundcloud: artists.soundcloud,
      artistImage: artists.image,
      orderIndex: eventsArtists.orderIndex,
    })
    .from(eventsArtists)
    .leftJoin(artists, eq(eventsArtists.artistId, artists.id))
    .where(eq(eventsArtists.eventId, event.id))
    .orderBy(eventsArtists.orderIndex)

  const { date, year } = formatDateToDisplay(event.startTime);
  
  const eventArtistsList = eventArtists
    .filter(a => a.artistName)
    .map(a => ({
      name: a.artistName!,
      instagram: a.artistInstagram,
      soundcloud: a.artistSoundcloud,
      image: a.artistImage,
    }));
  
  const primaryArtist = eventArtistsList[0]?.name || event.title;
  
  const now = new Date();
  const isFeatured = event.startTime >= now;
  
  let status = "On Sale";
  if (!event.ticketUrl) {
    status = "Coming Soon";
  } else if (event.startTime < now) {
    status = "Past Event";
  } else if (isFeatured) {
    status = "Featured";
  }
  
  return {
    id: event.id,
    slug: event.slug,
    artist: primaryArtist,
    artists: eventArtistsList,
    title: event.title,
    tagline: event.tagline,
    description: event.description,
    date,
    year,
    venue: event.venueName || "TBA",
    venueDescription: event.venueDescription,
    venueAddress: event.venueAddress,
    venueAddressUrl: event.venueAddressUrl,
    venueImages: event.venueImages,
    city: event.venueCity || "TBA",
    country: event.venueCountry || "TBA",
    image: event.image,
    status,
    isFeatured,
    ticketUrl: event.ticketUrl,
    startTime: event.startTime,
    endTime: event.endTime,
  };
}