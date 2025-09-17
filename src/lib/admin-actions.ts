"use server"

import { db } from "@/db/drizzle"
import { events, artists, venues, eventsArtists, galleries, galleryImages, djs } from "@/db/schema"
import { eq, count, sql, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateSlug } from "@/lib/utils/slug"
import { getUTApi } from "@/lib/uploadthing-server"

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
      isPublished: events.isPublished,
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
      slug: artists.slug,
      name: artists.name,
      instagram: artists.instagram,
      soundcloud: artists.soundcloud,
      image: artists.image,
      eventCount: sql<number>`COALESCE(COUNT(${eventsArtists.eventId}), 0)`.as('eventCount'),
    })
    .from(artists)
    .leftJoin(eventsArtists, eq(artists.id, eventsArtists.artistId))
    .groupBy(artists.id, artists.slug, artists.name, artists.instagram, artists.soundcloud, artists.image)
    .orderBy(artists.name)

  return artistsWithEventCount
}

export async function getAdminVenues() {
  const venuesWithEventCount = await db
    .select({
      id: venues.id,
      slug: venues.slug,
      name: venues.name,
      description: venues.description,
      address: venues.address,
      city: venues.city,
      country: venues.country,
      images: venues.images,
      eventCount: sql<number>`COALESCE(COUNT(${events.id}), 0)`.as('eventCount'),
    })
    .from(venues)
    .leftJoin(events, eq(venues.id, events.venueId))
    .groupBy(venues.id, venues.slug, venues.name, venues.description, venues.address, venues.city, venues.country, venues.images)
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
      imageKey: events.imageKey,
      ticketUrl: events.ticketUrl,
      isPublished: events.isPublished,
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

  // First, get the event to retrieve the imageKey if it exists
  const event = await db
    .select({ imageKey: events.imageKey })
    .from(events)
    .where(eq(events.id, eventId))
    .limit(1)

  // If the event has an imageKey, delete the image from UploadThing
  if (event[0]?.imageKey) {
    try {
      const utapi = getUTApi()
      await utapi.deleteFiles(event[0].imageKey)
      console.log(`Deleted image ${event[0].imageKey} from UploadThing`)
    } catch (error) {
      // Log error but don't fail the event deletion
      console.error("Failed to delete image from UploadThing:", error)
    }
  }

  // Delete the event from the database
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
  const imageKey = formData.get("imageKey") as string
  const ticketUrl = formData.get("ticketUrl") as string
  const isPublished = formData.get("isPublished") === "on"
  const venueIdStr = formData.get("venueId") as string
  const venueId = venueIdStr ? parseInt(venueIdStr) : null

  if (!eventId || !slug || !title || !startTime || !endTime) {
    throw new Error("Required fields missing")
  }

  // Parse artist data from form
  const artistData: { id: number; orderIndex: number }[] = []
  let index = 0
  while (formData.has(`artists[${index}][id]`)) {
    const artistId = parseInt(formData.get(`artists[${index}][id]`) as string)
    const orderIndex = parseInt(formData.get(`artists[${index}][orderIndex]`) as string)
    artistData.push({ id: artistId, orderIndex })
    index++
  }

  // Get the current event to check if image is being replaced
  const currentEvent = await db
    .select({ 
      imageKey: events.imageKey,
      image: events.image 
    })
    .from(events)
    .where(eq(events.id, eventId))
    .limit(1)

  // If there's an old imageKey and it's different from the new one, delete the old image
  if (currentEvent[0]?.imageKey && currentEvent[0].imageKey !== imageKey) {
    try {
      const utapi = getUTApi()
      await utapi.deleteFiles(currentEvent[0].imageKey)
      console.log(`Deleted old image ${currentEvent[0].imageKey} from UploadThing`)
    } catch (error) {
      console.error("Failed to delete old image from UploadThing:", error)
    }
  }

  // Update the event
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
      imageKey: imageKey || null,
      ticketUrl: ticketUrl || null,
      isPublished,
      venueId,
    })
    .where(eq(events.id, eventId))

  // Delete existing artist relationships
  await db
    .delete(eventsArtists)
    .where(eq(eventsArtists.eventId, eventId))

  // Insert new artist relationships if any artists were selected
  if (artistData.length > 0) {
    await db
      .insert(eventsArtists)
      .values(
        artistData.map(artist => ({
          eventId: eventId,
          artistId: artist.id,
          orderIndex: artist.orderIndex,
        }))
      )
  }

  revalidatePath("/admin")
  revalidatePath(`/admin/events/${slug}`)
  redirect("/admin?success=event-updated")
}

export async function createEvent(formData: FormData) {
  const slug = formData.get("slug") as string
  const title = formData.get("title") as string
  const tagline = formData.get("tagline") as string
  const description = formData.get("description") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const image = formData.get("image") as string
  const imageKey = formData.get("imageKey") as string
  const ticketUrl = formData.get("ticketUrl") as string
  const isPublished = formData.get("isPublished") === "on"
  const venueIdStr = formData.get("venueId") as string
  const venueId = venueIdStr ? parseInt(venueIdStr) : null

  if (!slug || !title || !startTime || !endTime) {
    throw new Error("Required fields missing")
  }

  // Parse artist data from form
  const artistData: { id: number; orderIndex: number }[] = []
  let index = 0
  while (formData.has(`artists[${index}][id]`)) {
    const artistId = parseInt(formData.get(`artists[${index}][id]`) as string)
    const orderIndex = parseInt(formData.get(`artists[${index}][orderIndex]`) as string)
    artistData.push({ id: artistId, orderIndex })
    index++
  }

  // Insert event and get the ID
  const [newEvent] = await db
    .insert(events)
    .values({
      slug,
      title,
      tagline: tagline || null,
      description: description || null,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      image: image || null,
      imageKey: imageKey || null,
      ticketUrl: ticketUrl || null,
      isPublished,
      venueId,
    })
    .returning({ id: events.id })

  // Insert artist relationships if any artists were selected
  if (artistData.length > 0 && newEvent) {
    await db
      .insert(eventsArtists)
      .values(
        artistData.map(artist => ({
          eventId: newEvent.id,
          artistId: artist.id,
          orderIndex: artist.orderIndex,
        }))
      )
  }

  revalidatePath("/admin")
  redirect(`/admin?success=event-created`)
}

// Venue CRUD operations
export async function getVenueBySlug(slug: string) {
  const venue = await db
    .select()
    .from(venues)
    .where(eq(venues.slug, slug))
    .limit(1)

  if (!venue[0]) {
    return null
  }

  // Get event count for this venue
  const eventCount = await db
    .select({ count: count() })
    .from(events)
    .where(eq(events.venueId, venue[0].id))

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
  
  // Handle multiple images
  const image1 = formData.get("image1") as string
  const image2 = formData.get("image2") as string
  const image3 = formData.get("image3") as string
  const images = [image1, image2, image3].filter(Boolean)

  if (!name || !city || !country) {
    throw new Error("Required fields missing")
  }

  const slug = generateSlug(name)

  const result = await db
    .insert(venues)
    .values({
      slug,
      name,
      description: description || null,
      address: address || null,
      addressUrl: addressUrl || null,
      city,
      country,
      images: images.length > 0 ? images : null,
    })
    .returning({ slug: venues.slug })

  revalidatePath("/admin")
  redirect(`/admin?success=venue-created`)
}

export async function updateVenue(formData: FormData) {
  const venueId = parseInt(formData.get("venueId") as string)
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string
  const addressUrl = formData.get("addressUrl") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  
  // Handle multiple images and their keys
  const image1 = formData.get("image1") as string
  const image2 = formData.get("image2") as string
  const image3 = formData.get("image3") as string
  const image1Key = formData.get("image1Key") as string
  const image2Key = formData.get("image2Key") as string
  const image3Key = formData.get("image3Key") as string
  
  const images = [image1, image2, image3].filter(Boolean)
  const imageKeys = [image1Key, image2Key, image3Key].filter(Boolean)

  if (!venueId || !name || !city || !country) {
    throw new Error("Required fields missing")
  }

  const slug = generateSlug(name)

  await db
    .update(venues)
    .set({
      slug,
      name,
      description: description || null,
      address: address || null,
      addressUrl: addressUrl || null,
      city,
      country,
      images: images.length > 0 ? images : null,
      imageKeys: imageKeys.length > 0 ? imageKeys : null,
      updatedAt: new Date(),
    })
    .where(eq(venues.id, venueId))

  revalidatePath("/admin")
  revalidatePath(`/admin/venues/${slug}`)
  redirect("/admin?success=venue-updated")
}

export async function deleteVenue(formData: FormData) {
  const venueId = parseInt(formData.get("venueId") as string)
  
  if (!venueId) {
    throw new Error("Venue ID is required")
  }

  // Delete venue - associated events will have their venueId set to null
  await db.delete(venues).where(eq(venues.id, venueId))
  
  revalidatePath("/admin")
  redirect("/admin")
}

// Artist CRUD operations
export async function getArtistBySlug(slug: string) {
  const artist = await db
    .select()
    .from(artists)
    .where(eq(artists.slug, slug))
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
    .where(eq(eventsArtists.artistId, artist[0].id))
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

  const slug = generateSlug(name)

  const result = await db
    .insert(artists)
    .values({
      slug,
      name,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
    })
    .returning({ slug: artists.slug })

  revalidatePath("/admin")
  redirect(`/admin?success=artist-created`)
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

  const slug = generateSlug(name)

  await db
    .update(artists)
    .set({
      slug,
      name,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
      updatedAt: new Date(),
    })
    .where(eq(artists.id, artistId))

  revalidatePath("/admin")
  revalidatePath(`/admin/artists/${slug}`)
  redirect("/admin?success=artist-updated")
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

// Gallery CRUD operations
export async function getAdminGalleries() {
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

  return galleriesWithImageCount
}

export async function getGalleryBySlug(slug: string) {
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
      key: galleryImages.key,
      caption: galleryImages.caption,
      orderIndex: galleryImages.orderIndex,
    })
    .from(galleryImages)
    .where(eq(galleryImages.galleryId, gallery[0].id))
    .orderBy(galleryImages.orderIndex)

  return {
    ...gallery[0],
    images,
  }
}

export async function createGallery(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const dateStr = formData.get("date") as string
  
  if (!title || !dateStr) {
    throw new Error("Required fields missing")
  }

  const slug = generateSlug(title)
  const date = new Date(dateStr)

  // Parse image data from form
  const imageData: { url: string; key: string; orderIndex: number }[] = []
  let index = 0
  while (formData.has(`images[${index}][url]`)) {
    const url = formData.get(`images[${index}][url]`) as string
    const key = formData.get(`images[${index}][key]`) as string
    if (url && key) {
      imageData.push({ url, key, orderIndex: index })
    }
    index++
  }

  // Create the gallery
  const [newGallery] = await db
    .insert(galleries)
    .values({
      slug,
      title,
      description: description || null,
      date,
      coverImage: imageData[0]?.url || null, // Use first image as cover by default
    })
    .returning({ id: galleries.id })

  // Insert gallery images if any
  if (imageData.length > 0 && newGallery) {
    await db
      .insert(galleryImages)
      .values(
        imageData.map(image => ({
          galleryId: newGallery.id,
          url: image.url,
          key: image.key,
          orderIndex: image.orderIndex,
        }))
      )
  }

  revalidatePath("/admin")
  redirect("/admin?tab=galleries&success=gallery-created")
}

export async function updateGallery(formData: FormData) {
  const galleryId = parseInt(formData.get("galleryId") as string)
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const dateStr = formData.get("date") as string
  
  if (!galleryId || !title || !slug || !dateStr) {
    throw new Error("Required fields missing")
  }
  const date = new Date(dateStr)

  // Parse new image data from form
  const imageData: { url: string; key: string; orderIndex: number }[] = []
  let index = 0
  while (formData.has(`images[${index}][url]`)) {
    const url = formData.get(`images[${index}][url]`) as string
    const key = formData.get(`images[${index}][key]`) as string
    if (url && key) {
      imageData.push({ url, key, orderIndex: index })
    }
    index++
  }

  // Get existing images to clean up any removed ones
  const existingImages = await db
    .select({ key: galleryImages.key })
    .from(galleryImages)
    .where(eq(galleryImages.galleryId, galleryId))

  const existingKeys = new Set(existingImages.map(img => img.key))
  const newKeys = new Set(imageData.map(img => img.key))
  
  // Find keys to delete from UploadThing
  const keysToDelete = Array.from(existingKeys).filter(key => !newKeys.has(key))
  
  if (keysToDelete.length > 0) {
    const utapi = getUTApi()
    await utapi.deleteFiles(keysToDelete)
  }

  // Update gallery
  await db
    .update(galleries)
    .set({
      slug,
      title,
      description: description || null,
      date,
      coverImage: imageData[0]?.url || null,
      updatedAt: new Date(),
    })
    .where(eq(galleries.id, galleryId))

  // Delete existing image records
  await db
    .delete(galleryImages)
    .where(eq(galleryImages.galleryId, galleryId))

  // Insert new image records
  if (imageData.length > 0) {
    await db
      .insert(galleryImages)
      .values(
        imageData.map(image => ({
          galleryId,
          url: image.url,
          key: image.key,
          orderIndex: image.orderIndex,
        }))
      )
  }

  revalidatePath("/admin")
  revalidatePath(`/admin/galleries/${slug}`)
  redirect("/admin?tab=galleries&success=gallery-updated")
}

export async function deleteGallery(formData: FormData) {
  const galleryId = parseInt(formData.get("galleryId") as string)
  
  if (!galleryId) {
    throw new Error("Gallery ID is required")
  }

  // Get all image keys for cleanup
  const images = await db
    .select({ key: galleryImages.key })
    .from(galleryImages)
    .where(eq(galleryImages.galleryId, galleryId))

  if (images.length > 0) {
    const utapi = getUTApi()
    await utapi.deleteFiles(images.map(img => img.key))
  }

  // Delete gallery - images will be cascade deleted
  await db.delete(galleries).where(eq(galleries.id, galleryId))
  
  revalidatePath("/admin")
  redirect("/admin?tab=galleries&success=gallery-deleted")
}

// DJ CRUD operations
export async function getAdminDJs() {
  const djsWithEventCount = await db
    .select({
      id: djs.id,
      slug: djs.slug,
      name: djs.name,
      title: djs.title,
      specialty: djs.specialty,
      experience: djs.experience,
      performances: djs.performances,
      instagram: djs.instagram,
      soundcloud: djs.soundcloud,
      image: djs.image,
      isActive: djs.isActive,
      createdAt: djs.createdAt,
      updatedAt: djs.updatedAt,
    })
    .from(djs)
    .orderBy(djs.name)

  return djsWithEventCount
}

export async function getDJBySlug(slug: string) {
  const dj = await db
    .select()
    .from(djs)
    .where(eq(djs.slug, slug))
    .limit(1)

  if (!dj[0]) {
    return null
  }

  return dj[0]
}

export async function createDJ(formData: FormData) {
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const specialty = formData.get("specialty") as string
  const experience = formData.get("experience") as string
  const performances = formData.get("performances") as string
  const bio = formData.get("bio") as string
  const instagram = formData.get("instagram") as string
  const soundcloud = formData.get("soundcloud") as string
  const image = formData.get("image") as string
  const imageKey = formData.get("imageKey") as string
  const isActive = formData.get("isActive") === "on"

  // Parse highlights array from form
  const highlights: string[] = []
  let index = 0
  while (formData.has(`highlights[${index}]`)) {
    const highlight = formData.get(`highlights[${index}]`) as string
    if (highlight.trim()) {
      highlights.push(highlight.trim())
    }
    index++
  }

  if (!name) {
    throw new Error("DJ name is required")
  }

  const slug = generateSlug(name)

  const result = await db
    .insert(djs)
    .values({
      slug,
      name,
      title: title || null,
      specialty: specialty || null,
      experience: experience || null,
      performances: performances || null,
      bio: bio || null,
      highlights: highlights.length > 0 ? highlights : null,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
      imageKey: imageKey || null,
      isActive,
    })
    .returning({ slug: djs.slug })

  revalidatePath("/admin")
  redirect(`/admin?success=dj-created`)
}

export async function updateDJ(formData: FormData) {
  const djId = parseInt(formData.get("djId") as string)
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const specialty = formData.get("specialty") as string
  const experience = formData.get("experience") as string
  const performances = formData.get("performances") as string
  const bio = formData.get("bio") as string
  const instagram = formData.get("instagram") as string
  const soundcloud = formData.get("soundcloud") as string
  const image = formData.get("image") as string
  const imageKey = formData.get("imageKey") as string
  const isActive = formData.get("isActive") === "on"

  // Parse highlights array from form
  const highlights: string[] = []
  let index = 0
  while (formData.has(`highlights[${index}]`)) {
    const highlight = formData.get(`highlights[${index}]`) as string
    if (highlight.trim()) {
      highlights.push(highlight.trim())
    }
    index++
  }

  if (!djId || !name) {
    throw new Error("Required fields missing")
  }

  // Get the current DJ to check if image is being replaced
  const currentDJ = await db
    .select({ 
      imageKey: djs.imageKey,
      image: djs.image 
    })
    .from(djs)
    .where(eq(djs.id, djId))
    .limit(1)

  // If there's an old imageKey and it's different from the new one, delete the old image
  if (currentDJ[0]?.imageKey && currentDJ[0].imageKey !== imageKey) {
    try {
      const utapi = getUTApi()
      await utapi.deleteFiles(currentDJ[0].imageKey)
      console.log(`Deleted old image ${currentDJ[0].imageKey} from UploadThing`)
    } catch (error) {
      console.error("Failed to delete old image from UploadThing:", error)
    }
  }

  const slug = generateSlug(name)

  await db
    .update(djs)
    .set({
      slug,
      name,
      title: title || null,
      specialty: specialty || null,
      experience: experience || null,
      performances: performances || null,
      bio: bio || null,
      highlights: highlights.length > 0 ? highlights : null,
      instagram: instagram || null,
      soundcloud: soundcloud || null,
      image: image || null,
      imageKey: imageKey || null,
      isActive,
      updatedAt: new Date(),
    })
    .where(eq(djs.id, djId))

  revalidatePath("/admin")
  revalidatePath(`/admin/djs/${slug}`)
  redirect("/admin?success=dj-updated")
}

export async function deleteDJ(formData: FormData) {
  const djId = parseInt(formData.get("djId") as string)
  
  if (!djId) {
    throw new Error("DJ ID is required")
  }

  // Get DJ image key for cleanup
  const djData = await db
    .select({ imageKey: djs.imageKey })
    .from(djs)
    .where(eq(djs.id, djId))
    .limit(1)

  if (djData[0]?.imageKey) {
    try {
      const utapi = getUTApi()
      await utapi.deleteFiles(djData[0].imageKey)
      console.log(`Deleted image ${djData[0].imageKey} from UploadThing`)
    } catch (error) {
      console.error("Failed to delete image from UploadThing:", error)
    }
  }

  await db.delete(djs).where(eq(djs.id, djId))
  
  revalidatePath("/admin")
  redirect("/admin")
}

// Get DJs for bookings page - only active DJs ordered by orderIndex
export async function getBookingsDJs() {
  const activeDJs = await db
    .select({
      id: djs.id,
      name: djs.name,
      title: djs.title,
      specialty: djs.specialty,
      experience: djs.experience,
      performances: djs.performances,
      bio: djs.bio,
      highlights: djs.highlights,
      instagram: djs.instagram,
      soundcloud: djs.soundcloud,
      image: djs.image,
    })
    .from(djs)
    .where(eq(djs.isActive, true))
    .orderBy(djs.name)

  return activeDJs
}