"use server"

import { db } from "@/db/drizzle"
import { events, artists, venues, eventsArtists, galleries, galleryImages, eventStops } from "@/db/schema"
import { eq, and, gte, asc, desc, sql } from "drizzle-orm"

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
  const now = new Date();

  // 1) Try to find the soonest upcoming tour stop in this city
  if (city) {
    const stopRows = await db
      .select({
        eventId: events.id,
        eventSlug: events.slug,
        eventTitle: events.title,
        eventTagline: events.tagline,
        eventDescription: events.description,
        eventImage: events.image,
        eventTicketUrl: events.ticketUrl,
        stopStartTime: eventStops.startTime,
        stopEndTime: eventStops.endTime,
        stopTicketUrl: eventStops.ticketUrl,
        stopCity: eventStops.city,
        stopCountry: eventStops.country,
        venueName: venues.name,
        venueDescription: venues.description,
        venueAddress: venues.address,
        venueAddressUrl: venues.addressUrl,
        venueImages: venues.images,
      })
      .from(eventStops)
      .leftJoin(events, eq(eventStops.eventId, events.id))
      .leftJoin(venues, eq(eventStops.venueId, venues.id))
      .where(
        and(
          eq(events.isPublished, true),
          gte(eventStops.startTime, now),
          sql`LOWER(${eventStops.city}) = LOWER(${city})`
        )
      )
      .orderBy(asc(eventStops.startTime))
      .limit(1)

    const stopRow = stopRows[0]
    if (stopRow) {
      // Load artists for the event
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
        .where(eq(eventsArtists.eventId, stopRow.eventId))
        .orderBy(eventsArtists.orderIndex)

      const artistList: PublicArtist[] = eventArtists
        .filter(a => a.artistName)
        .map(a => ({
          name: a.artistName!,
          instagram: a.artistInstagram,
          soundcloud: a.artistSoundcloud,
          image: a.artistImage,
        }))

      const primaryArtist = artistList[0]?.name || stopRow.eventTitle
      const { date, year } = formatDateToDisplay(stopRow.stopStartTime)
      const ticketUrl = stopRow.stopTicketUrl || stopRow.eventTicketUrl

      const status = ticketUrl
        ? (stopRow.stopStartTime < now ? "Past Event" : "On Sale")
        : "Coming Soon"

      return {
        id: stopRow.eventId,
        slug: stopRow.eventSlug,
        artist: primaryArtist,
        artists: artistList,
        title: stopRow.eventTitle,
        tagline: stopRow.eventTagline,
        description: stopRow.eventDescription,
        date,
        year,
        venue: stopRow.venueName || "TBA",
        venueDescription: stopRow.venueDescription,
        venueAddress: stopRow.venueAddress,
        venueAddressUrl: stopRow.venueAddressUrl,
        venueImages: stopRow.venueImages,
        city: stopRow.stopCity,
        country: stopRow.stopCountry,
        image: stopRow.eventImage,
        status,
        isFeatured: false,
        ticketUrl,
        startTime: stopRow.stopStartTime,
        endTime: stopRow.stopEndTime,
      }
    }
  }

  // 2) Fallback to previous behavior (non-tour events or no matching stop)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allEvents = await getPublicEvents();
  const upcomingEvents = allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  if (city) {
    const match = upcomingEvents.find((e) => e.city.toLowerCase() === city.toLowerCase());
    if (match) return match;
  }
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

// Gallery Types
export interface PublicGalleryImage {
  id: number;
  url: string;
  caption?: string | null;
  orderIndex: number | null;
}

export interface PublicGallery {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  date: Date;
  coverImage?: string | null;
  imageCount: number;
  firstImage?: string | null;
  images?: PublicGalleryImage[];
}

// Get all public galleries
export async function getPublicGalleries(): Promise<PublicGallery[]> {
  const galleriesWithImageCount = await db
    .select({
      id: galleries.id,
      slug: galleries.slug,
      title: galleries.title,
      description: galleries.description,
      date: galleries.date,
      coverImage: galleries.coverImage,
      imageCount: sql<number>`COALESCE(COUNT(${galleryImages.id}), 0)`.as('imageCount'),
      firstImage: sql<string | null>`MIN(${galleryImages.url})`.as('firstImage'),
    })
    .from(galleries)
    .leftJoin(galleryImages, eq(galleries.id, galleryImages.galleryId))
    .groupBy(galleries.id, galleries.slug, galleries.title, galleries.description, galleries.date, galleries.coverImage)
    .orderBy(desc(galleries.date))

  return galleriesWithImageCount.map(gallery => ({
    id: gallery.id,
    slug: gallery.slug,
    title: gallery.title,
    description: gallery.description,
    date: gallery.date,
    coverImage: gallery.coverImage,
    imageCount: Number(gallery.imageCount),
    firstImage: gallery.firstImage,
  }));
}

// Get single gallery by slug with all images
export async function getPublicGalleryBySlug(slug: string): Promise<PublicGallery | null> {
  const gallery = await db
    .select()
    .from(galleries)
    .where(eq(galleries.slug, slug))
    .limit(1)

  if (!gallery[0]) {
    return null
  }

  // Get all images for this gallery, ordered by orderIndex
  const images = await db
    .select({
      id: galleryImages.id,
      url: galleryImages.url,
      caption: galleryImages.caption,
      orderIndex: galleryImages.orderIndex,
    })
    .from(galleryImages)
    .where(eq(galleryImages.galleryId, gallery[0].id))
    .orderBy(galleryImages.orderIndex)

  return {
    id: gallery[0].id,
    slug: gallery[0].slug,
    title: gallery[0].title,
    description: gallery[0].description,
    date: gallery[0].date,
    coverImage: gallery[0].coverImage,
    imageCount: images.length,
    firstImage: images[0]?.url || gallery[0].coverImage,
    images: images.map(img => ({
      id: img.id,
      url: img.url,
      caption: img.caption,
      orderIndex: img.orderIndex,
    })),
  };
}