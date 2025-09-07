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