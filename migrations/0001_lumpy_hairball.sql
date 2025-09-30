CREATE TABLE "artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"instagram" varchar(100),
	"soundcloud" varchar(100),
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "artists_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"number" varchar(10),
	"title" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"description" text,
	"event_date" date NOT NULL,
	"date_display" varchar(50),
	"dates_description" text,
	"year" varchar(4) NOT NULL,
	"venue_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'CAD',
	"status" varchar(50) NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"image" text NOT NULL,
	"ticket_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "events_artists" (
	"event_id" integer NOT NULL,
	"artist_id" integer NOT NULL,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_artists_event_id_artist_id_pk" PRIMARY KEY("event_id","artist_id")
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"address" text,
	"address_url" text,
	"images" text[],
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "todo" CASCADE;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events_artists" ADD CONSTRAINT "events_artists_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events_artists" ADD CONSTRAINT "events_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "artist_name_idx" ON "artists" USING btree ("name");--> statement-breakpoint
CREATE INDEX "event_slug_idx" ON "events" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "event_date_idx" ON "events" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "event_status_idx" ON "events" USING btree ("status");--> statement-breakpoint
CREATE INDEX "event_featured_idx" ON "events" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "events_artists_event_idx" ON "events_artists" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "events_artists_artist_idx" ON "events_artists" USING btree ("artist_id");--> statement-breakpoint
CREATE INDEX "venue_name_idx" ON "venues" USING btree ("name");--> statement-breakpoint
CREATE INDEX "venue_city_idx" ON "venues" USING btree ("city");