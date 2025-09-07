/**
 * Database Schema for Nazaara Live Events Platform
 * 
 * This schema defines the core data structures for managing events, venues, and artists
 * for the Nazaara Live music and events company. The design prioritizes:
 * - Data normalization to prevent duplication
 * - Efficient querying with strategic indexes  
 * - Proper relationships between entities
 * - Scalability for future growth
 */

import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  boolean, 
  timestamp, 
  date,
  integer,
  primaryKey,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * VENUES TABLE
 * 
 * Stores information about event venues. Venues are normalized into their own table
 * since the same venue (e.g., Fortune Sound Club) hosts multiple events.
 * This prevents data duplication and ensures consistency.
 */
export const venues = pgTable("venues", {
  // Primary identifier
  id: serial("id").primaryKey(),
  
  // Basic venue information
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Fortune Sound Club"
  description: text("description"), // Two-sentence venue description for marketing
  
  // Location details
  address: text("address"), // Full physical address
  addressUrl: text("address_url"), // Google Maps or directions URL
  city: varchar("city", { length: 100 }).notNull(), // e.g., "Vancouver"
  country: varchar("country", { length: 100 }).notNull(), // e.g., "Canada"
  
  // Media assets
  images: text("images").array(), // Array of venue image URLs for showcasing
  
  // Audit timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Indexes for common query patterns
    nameIdx: index("venue_name_idx").on(table.name), // Search by venue name
    cityIdx: index("venue_city_idx").on(table.city), // Filter events by city
  };
});

/**
 * ARTISTS TABLE
 * 
 * Stores artist profiles and social media links. Artists are normalized to avoid
 * duplication when the same artist performs at multiple events (e.g., Shalv appears
 * in multiple lineups). The unique constraint on name prevents duplicate entries.
 */
export const artists = pgTable("artists", {
  // Primary identifier
  id: serial("id").primaryKey(),
  
  // Artist identity - unique constraint prevents duplicates
  name: varchar("name", { length: 255 }).notNull().unique(), // e.g., "Yasmina", "AJ WAVY"
  
  // Social media presence
  instagram: varchar("instagram", { length: 100 }), // Instagram handle (without @)
  soundcloud: varchar("soundcloud", { length: 100 }), // SoundCloud username
  
  // Media assets
  image: text("image"), // Artist profile image URL
  
  // Audit timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Index for artist search and lookup
    nameIdx: index("artist_name_idx").on(table.name),
  };
});

/**
 * EVENTS TABLE
 * 
 * Core events table storing all event information. Each event references a venue
 * through a foreign key relationship. Artist lineups are handled through the
 * junction table to support multiple artists per event.
 */
export const events = pgTable("events", {
  // Primary identifier
  id: serial("id").primaryKey(),
  
  // Event identity and routing
  slug: varchar("slug", { length: 255 }).notNull().unique(), // URL-friendly identifier
  
  // Event branding and content
  title: varchar("title", { length: 255 }).notNull(), // e.g., "NAZAARA", "Back 2 School with AJ Wavy"
  tagline: varchar("tagline", { length: 255 }), // e.g., "Live In Vancouver", "An All White Retro Affair"
  description: text("description"), // Full marketing description with formatting
  
  // Date and time information
  // Multiple date fields support different display formats and sorting needs
  eventDate: date("event_date").notNull(), // Actual date for sorting and filtering
  dateDisplay: varchar("date_display", { length: 50 }), // Short format: "04 Sep"
  datesDescription: text("dates_description"), // Full description: "Sunday, August 31 · 10:00 pm - 2:00 am"
  year: varchar("year", { length: 4 }).notNull(), // "2025" - allows for easy year-based filtering
  
  // Venue relationship
  // Foreign key to venues table - ensures referential integrity
  venueId: integer("venue_id").references(() => venues.id).notNull(),
  
  // Media and external links
  image: text("image").notNull(), // Event poster/promotional image
  ticketUrl: text("ticket_url"), // External ticket purchasing link
  
  // Audit timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Strategic indexes for common query patterns
    slugIdx: index("event_slug_idx").on(table.slug), // Route lookup by slug
    dateIdx: index("event_date_idx").on(table.eventDate), // Sort by date, filter upcoming
  };
});

/**
 * EVENTS_ARTISTS JUNCTION TABLE
 * 
 * Manages the many-to-many relationship between events and artists.
 * Each event can have multiple artists, and each artist can perform at multiple events.
 * 
 * The orderIndex field maintains the lineup order for proper display
 * (e.g., headliner first, supporting acts in specific sequence).
 * 
 * Cascade deletes ensure data integrity - if an event or artist is deleted,
 * the corresponding junction records are automatically removed.
 */
export const eventsArtists = pgTable("events_artists", {
  // Foreign key relationships with cascade delete
  eventId: integer("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  artistId: integer("artist_id").references(() => artists.id, { onDelete: "cascade" }).notNull(),
  
  // Lineup ordering - 0 for headliner, 1+ for supporting acts
  orderIndex: integer("order_index").default(0), 
  
  // Creation timestamp for audit trail
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  // Composite primary key prevents duplicate artist-event pairs
  pk: primaryKey({ columns: [table.eventId, table.artistId] }),
  
  // Indexes for efficient relationship queries
  eventIdx: index("events_artists_event_idx").on(table.eventId), // Find artists for an event
  artistIdx: index("events_artists_artist_idx").on(table.artistId), // Find events for an artist
}));

/**
 * DRIZZLE ORM RELATIONS
 * 
 * These relations define how Drizzle ORM should handle joins and queries
 * between related tables. They enable type-safe querying with automatic
 * joins and proper TypeScript inference.
 */

// Venues can have many events
export const venuesRelations = relations(venues, ({ many }) => ({
  events: many(events),
}));

// Artists can perform at many events (through junction table)
export const artistsRelations = relations(artists, ({ many }) => ({
  eventsArtists: many(eventsArtists),
}));

// Events belong to one venue and can have many artists
export const eventsRelations = relations(events, ({ one, many }) => ({
  // One-to-one relationship with venue
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  // One-to-many relationship with junction table
  eventsArtists: many(eventsArtists),
}));

// Junction table relations to both events and artists
export const eventsArtistsRelations = relations(eventsArtists, ({ one }) => ({
  // Each junction record belongs to one event
  event: one(events, {
    fields: [eventsArtists.eventId],
    references: [events.id],
  }),
  // Each junction record belongs to one artist
  artist: one(artists, {
    fields: [eventsArtists.artistId],
    references: [artists.id],
  }),
}));