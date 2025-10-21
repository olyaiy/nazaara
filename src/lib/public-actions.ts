"use server"

import { db } from "@/db/drizzle"
import { events, artists, venues, eventsArtists, galleries, galleryImages, eventStops } from "@/db/schema"
import { eq, and, gte, asc, desc, sql } from "drizzle-orm"

// Regional groupings for smart geographical fallback
const REGIONS = {
  // Canada
  'Vancouver': { country: 'Canada', region: 'Western Canada' },
  'Surrey': { country: 'Canada', region: 'Western Canada' },
  'Burnaby': { country: 'Canada', region: 'Western Canada' },
  'Richmond': { country: 'Canada', region: 'Western Canada' },
  'Calgary': { country: 'Canada', region: 'Western Canada' },
  'Edmonton': { country: 'Canada', region: 'Western Canada' },
  'Toronto': { country: 'Canada', region: 'Eastern Canada' },
  'Ottawa': { country: 'Canada', region: 'Eastern Canada' },
  'Montreal': { country: 'Canada', region: 'Eastern Canada' },
  
  // USA
  'New York': { country: 'United States', region: 'East Coast' },
  'Boston': { country: 'United States', region: 'East Coast' },
  'Philadelphia': { country: 'United States', region: 'East Coast' },
  'Washington': { country: 'United States', region: 'East Coast' },
  'San Francisco': { country: 'United States', region: 'West Coast' },
  'Los Angeles': { country: 'United States', region: 'West Coast' },
  'Seattle': { country: 'United States', region: 'West Coast' },
  'Portland': { country: 'United States', region: 'West Coast' },
  'Chicago': { country: 'United States', region: 'Midwest' },
  'Detroit': { country: 'United States', region: 'Midwest' },
  'Dallas': { country: 'United States', region: 'South' },
  'Houston': { country: 'United States', region: 'South' },
  'Atlanta': { country: 'United States', region: 'South' },
  
  // UK
  'London': { country: 'United Kingdom', region: 'UK' },
  'Manchester': { country: 'United Kingdom', region: 'UK' },
  'Birmingham': { country: 'United Kingdom', region: 'UK' },
} as const;

function getRegionInfo(city: string) {
  return REGIONS[city as keyof typeof REGIONS];
}

// Metro area groupings (priority over regions)
const METRO_AREAS: Record<string, string[]> = {
  // Canada
  Vancouver: [
    "Vancouver", "Surrey", "Burnaby", "Richmond", "North Vancouver", "West Vancouver",
    "Coquitlam", "Port Coquitlam", "Port Moody", "Delta", "Langley", "White Rock",
    "New Westminster"
  ],
  Calgary: ["Calgary", "Airdrie", "Chestermere", "Okotoks"],
  Toronto: [
    "Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill",
    "Oakville", "Burlington", "Milton", "Pickering", "Ajax", "Whitby"
  ],

  // USA
  "New York": [
    "New York", "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island",
    "Jersey City", "Hoboken", "Newark"
  ],
  Boston: ["Boston", "Cambridge", "Somerville", "Brookline"],
  Miami: ["Miami", "Miami Beach", "Doral", "Hialeah", "Coral Gables"],
};

function getMetroAnchor(city?: string): string | undefined {
  if (!city) return undefined;
  const entries = Object.entries(METRO_AREAS);
  for (const [anchor, members] of entries) {
    if (members.some(m => m.toLowerCase() === city.toLowerCase())) return anchor;
  }
  return undefined;
}

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
  startTime: Date | string; // Can be Date object or string "YYYY-MM-DD HH:mm:ss"
  endTime: Date | string; // Can be Date object or string "YYYY-MM-DD HH:mm:ss"
}

export interface PublicEventStop {
  city: string;
  country: string;
  venue?: string | null;
  startTime: Date | string; // Can be Date object or string "YYYY-MM-DD HH:mm:ss"
  endTime: Date | string; // Can be Date object or string "YYYY-MM-DD HH:mm:ss"
  ticketUrl?: string | null;
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
      .map(({ name, instagram, soundcloud, image }) => ({ name, instagram, soundcloud, image }));
    
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
  const now = new Date();
  
  const allEvents = await getPublicEvents();
  
  // Show events until noon UTC the day after their start date
  return allEvents.filter(event => {
    const eventStartTime = new Date(event.startTime);
    const nextDayNoon = new Date(eventStartTime);
    nextDayNoon.setUTCDate(nextDayNoon.getUTCDate() + 1);
    nextDayNoon.setUTCHours(12, 0, 0, 0);
    return nextDayNoon >= now && !event.isFeatured;
  });
}

export async function getPublicFeaturedEvent(): Promise<PublicEvent | undefined> {
  const now = new Date();
  
  console.log("\n[getPublicFeaturedEvent] ========== FALLBACK EVENT SELECTION START ==========");
  console.log("[getPublicFeaturedEvent] Called as fallback (no city match found)");
  console.log("[getPublicFeaturedEvent] Current time:", now.toISOString());
  
  const allEvents = await getPublicEvents();
  console.log("[getPublicFeaturedEvent] Total published events:", allEvents.length);
  
  // Return the first upcoming event as featured (until noon UTC next day)
  const upcomingEvents = allEvents.filter(event => {
    const eventStartTime = new Date(event.startTime);
    const nextDayNoon = new Date(eventStartTime);
    nextDayNoon.setUTCDate(nextDayNoon.getUTCDate() + 1);
    nextDayNoon.setUTCHours(12, 0, 0, 0);
    return nextDayNoon >= now;
  });
  
  console.log("[getPublicFeaturedEvent] Upcoming events (until noon next day):", upcomingEvents.length);
  
  if (upcomingEvents[0]) {
    console.log("[getPublicFeaturedEvent] ✅ Returning first upcoming event");
    console.log("[getPublicFeaturedEvent] Event details:", {
      slug: upcomingEvents[0].slug,
      title: upcomingEvents[0].title,
      city: upcomingEvents[0].city,
      country: upcomingEvents[0].country,
      venue: upcomingEvents[0].venue,
      startTime: upcomingEvents[0].startTime,
      reason: "First upcoming event (fallback when city-based selection returns nothing)"
    });
  } else {
    console.log("[getPublicFeaturedEvent] ❌ No upcoming events available");
  }
  
  console.log("[getPublicFeaturedEvent] ========== FALLBACK EVENT SELECTION END ==========\n");
  
  return upcomingEvents[0];
}

export async function getPublicEventStops(eventId: number): Promise<PublicEventStop[]> {
  const now = new Date()
  const rows = await db
    .select({
      city: eventStops.city,
      country: eventStops.country,
      venue: venues.name,
      startTime: eventStops.startTime,
      endTime: eventStops.endTime,
      ticketUrl: eventStops.ticketUrl,
    })
    .from(eventStops)
    .leftJoin(venues, eq(eventStops.venueId, venues.id))
    .where(and(eq(eventStops.eventId, eventId), gte(eventStops.startTime, now)))
    .orderBy(asc(eventStops.startTime))

  return rows.map((r) => ({
    city: r.city,
    country: r.country,
    venue: r.venue,
    startTime: r.startTime,
    endTime: r.endTime,
    ticketUrl: r.ticketUrl,
  }))
}

export async function getPublicEventForCity(city?: string, userCountry?: string): Promise<PublicEvent | undefined> {
  const now = new Date();
  
  console.log("\n[getPublicEventForCity] ========== EVENT SELECTION START ==========");
  console.log("[getPublicEventForCity] Input location:", { city: city || "<none>", country: userCountry || "<none>" });
  console.log("[getPublicEventForCity] Current time:", now.toISOString());
  
  // Get region info for user's city
  const userRegionInfo = city ? getRegionInfo(city) : undefined;
  if (userRegionInfo) {
    console.log("[getPublicEventForCity] User region info from mapping:", userRegionInfo);
  } else if (city) {
    console.log("[getPublicEventForCity] City not in region mapping, will use country-based fallback");
  }

  // 1) Try to find the soonest upcoming tour stop in this city
  if (city) {
    console.log("[getPublicEventForCity][Step 1] Searching for tour stops in city:", city);
    const stopRows = await db
      .select({
        eventId: eventStops.eventId,
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
      .innerJoin(events, eq(eventStops.eventId, events.id))
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

    console.log("[getPublicEventForCity][Step 1] Tour stop query returned:", stopRows.length, "results");
    
    const stopRow = stopRows[0]
    if (stopRow) {
      console.log("[getPublicEventForCity][Step 1] ✅ MATCH FOUND - Tour stop in city");
      console.log("[getPublicEventForCity][Step 1] Event details:", {
        slug: stopRow.eventSlug,
        title: stopRow.eventTitle,
        city: stopRow.stopCity,
        country: stopRow.stopCountry,
        venue: stopRow.venueName,
        startTime: stopRow.stopStartTime,
        reason: "Tour stop matches requested city (case-insensitive)"
      });
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

      console.log("[getPublicEventForCity][Step 1] Returning tour stop event");
      console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");

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
    } else {
      console.log("[getPublicEventForCity][Step 1] ❌ No tour stops found for city:", city);
    }
  } else {
    console.log("[getPublicEventForCity][Step 1] ⊘ Skipped - no city provided");
  }

  // 2) Fallback to previous behavior (non-tour events or no matching stop)
  console.log("[getPublicEventForCity][Step 2] Fallback - searching non-tour events");
  const nowFallback = new Date();
  const allEvents = await getPublicEvents();
  console.log("[getPublicEventForCity][Step 2] Total published events:", allEvents.length);
  
  const upcomingEvents = allEvents.filter(event => {
    const eventStartTime = new Date(event.startTime);
    const nextDayNoon = new Date(eventStartTime);
    nextDayNoon.setUTCDate(nextDayNoon.getUTCDate() + 1);
    nextDayNoon.setUTCHours(12, 0, 0, 0);
    return nextDayNoon >= nowFallback;
  });
  
  console.log("[getPublicEventForCity][Step 2] Upcoming events (until noon next day):", upcomingEvents.length);
  if (upcomingEvents.length > 0) {
    console.log("[getPublicEventForCity][Step 2] Upcoming events list:", 
      upcomingEvents.map(e => ({ 
        slug: e.slug, 
        title: e.title, 
        city: e.city,
        country: e.country,
        startTime: e.startTime 
      }))
    );
  }
  
  if (city) {
    console.log("[getPublicEventForCity][Step 2] Searching for city match in non-tour events:", city);
    const match = upcomingEvents.find((e) => e.city.toLowerCase() === city.toLowerCase());
    if (match) {
      console.log("[getPublicEventForCity][Step 2] ✅ MATCH FOUND - Non-tour event in city");
      console.log("[getPublicEventForCity][Step 2] Event details:", {
        slug: match.slug,
        title: match.title,
        city: match.city,
        country: match.country,
        venue: match.venue,
        startTime: match.startTime,
        reason: "Non-tour event matches requested city (case-insensitive)"
      });
      console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");
      return match;
    } else {
      console.log("[getPublicEventForCity][Step 2] ❌ No non-tour events found for city:", city);
    }
  }
  
  // 3) Smart geographical fallback
  console.log("[getPublicEventForCity][Step 3] Smart geographical fallback");
  
  // 3a) Same metro fallback (highest priority in Step 3)
  const userMetro = getMetroAnchor(city);
  if (userMetro) {
    console.log("[getPublicEventForCity][Step 3a] Filtering by same metro:", userMetro);
    const sameMetroEvents = upcomingEvents.filter(e => {
      const eventMetro = getMetroAnchor(e.city);
      return eventMetro && eventMetro.toLowerCase() === userMetro.toLowerCase();
    });
    console.log("[getPublicEventForCity][Step 3a] Events in same metro:", sameMetroEvents.length);
    if (sameMetroEvents.length > 0) {
      console.log("[getPublicEventForCity][Step 3a] ✅ MATCH FOUND - Event in same metro area");
      console.log("[getPublicEventForCity][Step 3a] Event details:", {
        slug: sameMetroEvents[0].slug,
        title: sameMetroEvents[0].title,
        city: sameMetroEvents[0].city,
        country: sameMetroEvents[0].country,
        venue: sameMetroEvents[0].venue,
        startTime: sameMetroEvents[0].startTime,
        reason: `Same metro area (${userMetro}) - strongest local match`
      });
      console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========");
      return sameMetroEvents[0];
    }
    console.log("[getPublicEventForCity][Step 3a] ❌ No events in same metro");
  } else {
    console.log("[getPublicEventForCity][Step 3a] City not part of any known metro");
  }
  
  if (upcomingEvents.length === 0) {
    console.log("[getPublicEventForCity][Step 3] ❌ No upcoming events found at all");
    console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");
    return undefined;
  }
  
  // Try to find events in same region first
  if (userRegionInfo) {
    console.log("[getPublicEventForCity][Step 3a] Filtering by same region:", userRegionInfo.region);
    const sameRegionEvents = upcomingEvents.filter(event => {
      const eventRegionInfo = getRegionInfo(event.city);
      return eventRegionInfo?.region === userRegionInfo.region;
    });
    
    console.log("[getPublicEventForCity][Step 3a] Events in same region:", sameRegionEvents.length);
    if (sameRegionEvents.length > 0) {
      console.log("[getPublicEventForCity][Step 3a] ✅ MATCH FOUND - Event in same region");
      console.log("[getPublicEventForCity][Step 3a] Event details:", {
        slug: sameRegionEvents[0].slug,
        title: sameRegionEvents[0].title,
        city: sameRegionEvents[0].city,
        country: sameRegionEvents[0].country,
        venue: sameRegionEvents[0].venue,
        startTime: sameRegionEvents[0].startTime,
        reason: `Same region (${userRegionInfo.region}) - closest geographical match`
      });
      console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");
      return sameRegionEvents[0];
    }
    console.log("[getPublicEventForCity][Step 3a] ❌ No events in same region");
  }
  
  // Try to find events in same country
  const userCountryFinal = userRegionInfo?.country || userCountry;
  if (userCountryFinal) {
    console.log("[getPublicEventForCity][Step 3b] Filtering by same country:", userCountryFinal);
    
    // Normalize country names for comparison
    const normalizeCountry = (c: string) => c.toLowerCase().trim();
    const normalizedUserCountry = normalizeCountry(userCountryFinal);
    
    const sameCountryEvents = upcomingEvents.filter(event => {
      const normalizedEventCountry = normalizeCountry(event.country);
      // Handle US variations
      if (normalizedUserCountry === 'us' || normalizedUserCountry === 'usa' || normalizedUserCountry === 'united states') {
        return normalizedEventCountry === 'united states' || normalizedEventCountry === 'usa' || normalizedEventCountry === 'us';
      }
      // Handle Canada variations
      if (normalizedUserCountry === 'ca' || normalizedUserCountry === 'canada') {
        return normalizedEventCountry === 'canada' || normalizedEventCountry === 'ca';
      }
      return normalizedEventCountry === normalizedUserCountry;
    });
    
    console.log("[getPublicEventForCity][Step 3b] Events in same country:", sameCountryEvents.length);
    if (sameCountryEvents.length > 0) {
      console.log("[getPublicEventForCity][Step 3b] ✅ MATCH FOUND - Event in same country");
      console.log("[getPublicEventForCity][Step 3b] Event details:", {
        slug: sameCountryEvents[0].slug,
        title: sameCountryEvents[0].title,
        city: sameCountryEvents[0].city,
        country: sameCountryEvents[0].country,
        venue: sameCountryEvents[0].venue,
        startTime: sameCountryEvents[0].startTime,
        reason: `Same country (${userCountryFinal}) - national proximity`
      });
      console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");
      return sameCountryEvents[0];
    }
    console.log("[getPublicEventForCity][Step 3b] ❌ No events in same country");
  }
  
  // Final fallback - chronologically first event
  console.log("[getPublicEventForCity][Step 3c] Final fallback - returning chronologically first event");
  console.log("[getPublicEventForCity][Step 3c] ✅ MATCH FOUND - First upcoming event (no geographical match)");
  console.log("[getPublicEventForCity][Step 3c] Event details:", {
    slug: upcomingEvents[0].slug,
    title: upcomingEvents[0].title,
    city: upcomingEvents[0].city,
    country: upcomingEvents[0].country,
    venue: upcomingEvents[0].venue,
    startTime: upcomingEvents[0].startTime,
    reason: city 
      ? `No geographical match for "${city}" - showing first upcoming event` 
      : "No location specified - showing first upcoming event"
  });
  console.log("[getPublicEventForCity] ========== EVENT SELECTION END ==========\n");
  
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