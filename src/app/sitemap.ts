import { MetadataRoute } from "next";
import { db } from "@/db/drizzle";
import { events, galleries } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nazaara.live";

  // Fetch all published events
  const publishedEvents = await db
    .select({
      slug: events.slug,
      updatedAt: events.updatedAt,
    })
    .from(events)
    .where(eq(events.isPublished, true));

  // Fetch all galleries
  const allGalleries = await db
    .select({
      slug: galleries.slug,
      updatedAt: galleries.updatedAt,
    })
    .from(galleries);

  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bookings`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/galleries`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Event pages - high priority as they're main content
  const eventPages = publishedEvents.map((event) => ({
    url: `${baseUrl}/event/${event.slug}`,
    lastModified: event.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Gallery pages - medium-high priority
  const galleryPages = allGalleries.map((gallery) => ({
    url: `${baseUrl}/galleries/${gallery.slug}`,
    lastModified: gallery.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...eventPages, ...galleryPages];
}
