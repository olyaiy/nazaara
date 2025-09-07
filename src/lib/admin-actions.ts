"use server"

import { db } from "@/db/drizzle"
import { events, artists, venues, eventsArtists } from "@/db/schema"
import { eq, count, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getAdminStats() {
  const [eventCount, artistCount, venueCount] = await Promise.all([
    db.select({ count: count() }).from(events),
    db.select({ count: count() }).from(artists),
    db.select({ count: count() }).from(venues),
  ])

  return {
    totalEvents: eventCount[0]?.count || 0,
    totalArtists: artistCount[0]?.count || 0,
    totalVenues: venueCount[0]?.count || 0,
  }
}

export async function getAdminEvents() {
  const eventsWithDetails = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      tagline: events.tagline,
      startTime: events.startTime,
      endTime: events.endTime,
      image: events.image,
      venueName: venues.name,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .orderBy(events.startTime)

  // Get artists for each event in a single query
  const eventArtists = await db
    .select({
      eventId: eventsArtists.eventId,
      artistName: artists.name,
      orderIndex: eventsArtists.orderIndex,
    })
    .from(eventsArtists)
    .leftJoin(artists, eq(eventsArtists.artistId, artists.id))
    .orderBy(eventsArtists.eventId, eventsArtists.orderIndex)

  // Group artists by event
  const artistsByEvent = eventArtists.reduce((acc, row) => {
    if (!acc[row.eventId]) acc[row.eventId] = []
    if (row.artistName) acc[row.eventId].push(row.artistName)
    return acc
  }, {} as Record<number, string[]>)

  return eventsWithDetails.map(event => ({
    ...event,
    artists: artistsByEvent[event.id] || [],
  }))
}

export async function getAdminArtists() {
  const artistsWithEventCount = await db
    .select({
      id: artists.id,
      name: artists.name,
      instagram: artists.instagram,
      soundcloud: artists.soundcloud,
      image: artists.image,
      eventCount: sql<number>`COALESCE(COUNT(${eventsArtists.eventId}), 0)`.as('eventCount'),
    })
    .from(artists)
    .leftJoin(eventsArtists, eq(artists.id, eventsArtists.artistId))
    .groupBy(artists.id, artists.name, artists.instagram, artists.soundcloud, artists.image)
    .orderBy(artists.name)

  return artistsWithEventCount
}

export async function getAdminVenues() {
  const venuesWithEventCount = await db
    .select({
      id: venues.id,
      name: venues.name,
      description: venues.description,
      address: venues.address,
      city: venues.city,
      country: venues.country,
      eventCount: sql<number>`COALESCE(COUNT(${events.id}), 0)`.as('eventCount'),
    })
    .from(venues)
    .leftJoin(events, eq(venues.id, events.venueId))
    .groupBy(venues.id, venues.name, venues.description, venues.address, venues.city, venues.country)
    .orderBy(venues.name)

  return venuesWithEventCount
}

export async function getEventBySlug(slug: string) {
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
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .where(eq(events.slug, slug))
    .limit(1)

  if (!eventWithDetails[0]) {
    return null
  }

  const eventArtists = await db
    .select({
      artistId: artists.id,
      artistName: artists.name,
      orderIndex: eventsArtists.orderIndex,
    })
    .from(eventsArtists)
    .leftJoin(artists, eq(eventsArtists.artistId, artists.id))
    .where(eq(eventsArtists.eventId, eventWithDetails[0].id))
    .orderBy(eventsArtists.orderIndex)

  return {
    ...eventWithDetails[0],
    artists: eventArtists.map(a => ({
      id: a.artistId,
      name: a.artistName,
      orderIndex: a.orderIndex,
    })),
  }
}

export async function deleteEvent(formData: FormData) {
  
  const eventId = parseInt(formData.get("eventId") as string)
  
  if (!eventId) {
    throw new Error("Event ID is required")
  }

  await db.delete(events).where(eq(events.id, eventId))
  
  revalidatePath("/admin")
  redirect("/admin")
}

export async function updateEvent(formData: FormData) {
  
  const eventId = parseInt(formData.get("eventId") as string)
  const slug = formData.get("slug") as string
  const title = formData.get("title") as string
  const tagline = formData.get("tagline") as string
  const description = formData.get("description") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const image = formData.get("image") as string
  const ticketUrl = formData.get("ticketUrl") as string
  const isPublished = formData.get("isPublished") === "on"
  const venueId = parseInt(formData.get("venueId") as string)

  if (!eventId || !slug || !title || !startTime || !endTime || !venueId) {
    throw new Error("Required fields missing")
  }

  await db
    .update(events)
    .set({
      slug,
      title,
      tagline: tagline || null,
      description: description || null,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      image: image || null,
      ticketUrl: ticketUrl || null,
      isPublished,
      venueId,
    })
    .where(eq(events.id, eventId))

  revalidatePath("/admin")
  revalidatePath(`/admin/events/${slug}`)
  redirect("/admin")
}

export async function createEvent(formData: FormData) {
  const slug = formData.get("slug") as string
  const title = formData.get("title") as string
  const tagline = formData.get("tagline") as string
  const description = formData.get("description") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const image = formData.get("image") as string
  const ticketUrl = formData.get("ticketUrl") as string
  const isPublished = formData.get("isPublished") === "on"
  const venueId = parseInt(formData.get("venueId") as string)

  if (!slug || !title || !startTime || !endTime || !venueId) {
    throw new Error("Required fields missing")
  }

  await db
    .insert(events)
    .values({
      slug,
      title,
      tagline: tagline || null,
      description: description || null,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      image: image || null,
      ticketUrl: ticketUrl || null,
      isPublished,
      venueId,
    })

  revalidatePath("/admin")
  redirect(`/admin/events/${slug}`)
}

// Venue CRUD operations
export async function getVenueById(id: number) {
  const venue = await db
    .select()
    .from(venues)
    .where(eq(venues.id, id))
    .limit(1)

  if (!venue[0]) {
    return null
  }

  // Get event count for this venue
  const eventCount = await db
    .select({ count: count() })
    .from(events)
    .where(eq(events.venueId, id))

  return {
    ...venue[0],
    eventCount: eventCount[0]?.count || 0,
  }
}

export async function createVenue(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string
  const addressUrl = formData.get("addressUrl") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string

  if (!name || !city || !country) {
    throw new Error("Required fields missing")
  }

  const result = await db
    .insert(venues)
    .values({
      name,
      description: description || null,
      address: address || null,
      addressUrl: addressUrl || null,
      city,
      country,
    })
    .returning({ id: venues.id })

  revalidatePath("/admin")
  redirect(`/admin/venues/${result[0].id}`)
}

export async function updateVenue(formData: FormData) {
  const venueId = parseInt(formData.get("venueId") as string)
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string
  const addressUrl = formData.get("addressUrl") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string

  if (!venueId || !name || !city || !country) {
    throw new Error("Required fields missing")
  }

  await db
    .update(venues)
    .set({
      name,
      description: description || null,
      address: address || null,
      addressUrl: addressUrl || null,
      city,
      country,
      updatedAt: new Date(),
    })
    .where(eq(venues.id, venueId))

  revalidatePath("/admin")
  revalidatePath(`/admin/venues/${venueId}`)
  redirect("/admin")
}

export async function deleteVenue(formData: FormData) {
  const venueId = parseInt(formData.get("venueId") as string)
  
  if (!venueId) {
    throw new Error("Venue ID is required")
  }

  // Check if there are events using this venue
  const eventCount = await db
    .select({ count: count() })
    .from(events)
    .where(eq(events.venueId, venueId))

  if (eventCount[0]?.count > 0) {
    throw new Error("Cannot delete venue with associated events")
  }

  await db.delete(venues).where(eq(venues.id, venueId))
  
  revalidatePath("/admin")
  redirect("/admin")
}

// Artist CRUD operations
export async function getArtistById(id: number) {
  const artist = await db
    .select()
    .from(artists)
    .where(eq(artists.id, id))
    .limit(1)

  if (!artist[0]) {
    return null
  }

  // Get events for this artist
  const artistEvents = await db
    .select({
      eventId: events.id,
      eventTitle: events.title,
      eventSlug: events.slug,
      startTime: events.startTime,
    })
    .from(eventsArtists)
    .leftJoin(events, eq(eventsArtists.eventId, events.id))
    .where(eq(eventsArtists.artistId, id))
    .orderBy(events.startTime)

  return {
    ...artist[0],
    events: artistEvents,
  }
}

export async function createArtist(formData: FormData) {
  const name = formData.get("name") as string
  const instagram = formData.get("instagram") as string
  const soundcloud = formData.get("soundcloud") as string
  const image = formData.get("image") as string

  if (!name) {
    throw new Error("Artist name is required")
  }

  const result = await db
    .insert(artists)
    .values({
      name,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
    })
    .returning({ id: artists.id })

  revalidatePath("/admin")
  redirect(`/admin/artists/${result[0].id}`)
}

export async function updateArtist(formData: FormData) {
  const artistId = parseInt(formData.get("artistId") as string)
  const name = formData.get("name") as string
  const instagram = formData.get("instagram") as string
  const soundcloud = formData.get("soundcloud") as string
  const image = formData.get("image") as string

  if (!artistId || !name) {
    throw new Error("Required fields missing")
  }

  await db
    .update(artists)
    .set({
      name,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
      updatedAt: new Date(),
    })
    .where(eq(artists.id, artistId))

  revalidatePath("/admin")
  revalidatePath(`/admin/artists/${artistId}`)
  redirect("/admin")
}

export async function deleteArtist(formData: FormData) {
  const artistId = parseInt(formData.get("artistId") as string)
  
  if (!artistId) {
    throw new Error("Artist ID is required")
  }

  // Deleting artist will cascade delete from eventsArtists junction table
  await db.delete(artists).where(eq(artists.id, artistId))
  
  revalidatePath("/admin")
  redirect("/admin")
}