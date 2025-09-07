import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  decimal, 
  boolean, 
  timestamp, 
  date,
  integer,
  primaryKey,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Venues table
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address"),
  addressUrl: text("address_url"),
  images: text("images").array(), // Array of image URLs
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    nameIdx: index("venue_name_idx").on(table.name),
    cityIdx: index("venue_city_idx").on(table.city),
  };
});

// Artists table
export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  instagram: varchar("instagram", { length: 100 }),
  soundcloud: varchar("soundcloud", { length: 100 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    nameIdx: index("artist_name_idx").on(table.name),
  };
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  number: varchar("number", { length: 10 }), // Display number like "01", "02"
  title: varchar("title", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description"),
  
  // Date fields
  eventDate: date("event_date").notNull(), // Actual date of the event
  dateDisplay: varchar("date_display", { length: 50 }), // e.g., "04 Sep"
  datesDescription: text("dates_description"), // Full date description
  year: varchar("year", { length: 4 }).notNull(),
  
  // Venue relationship
  venueId: integer("venue_id").references(() => venues.id).notNull(),
  
  // Pricing and status
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("CAD"),
  status: varchar("status", { length: 50 }).notNull(), // "On Sale", "Waitlist", "Featured", etc.
  isFeatured: boolean("is_featured").default(false).notNull(),
  
  // Media and links
  image: text("image").notNull(),
  ticketUrl: text("ticket_url"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    slugIdx: index("event_slug_idx").on(table.slug),
    dateIdx: index("event_date_idx").on(table.eventDate),
    statusIdx: index("event_status_idx").on(table.status),
    featuredIdx: index("event_featured_idx").on(table.isFeatured),
  };
});

// Junction table for many-to-many relationship between events and artists
export const eventsArtists = pgTable("events_artists", {
  eventId: integer("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  artistId: integer("artist_id").references(() => artists.id, { onDelete: "cascade" }).notNull(),
  orderIndex: integer("order_index").default(0), // For maintaining artist order in lineup
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.eventId, table.artistId] }),
  eventIdx: index("events_artists_event_idx").on(table.eventId),
  artistIdx: index("events_artists_artist_idx").on(table.artistId),
}));

// Relations
export const venuesRelations = relations(venues, ({ many }) => ({
  events: many(events),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
  eventsArtists: many(eventsArtists),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  eventsArtists: many(eventsArtists),
}));

export const eventsArtistsRelations = relations(eventsArtists, ({ one }) => ({
  event: one(events, {
    fields: [eventsArtists.eventId],
    references: [events.id],
  }),
  artist: one(artists, {
    fields: [eventsArtists.artistId],
    references: [artists.id],
  }),
}));