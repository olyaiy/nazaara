CREATE TABLE "event_stops" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"venue_id" integer,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"ticket_url" text,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "is_tour" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "event_stops" ADD CONSTRAINT "event_stops_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_stops" ADD CONSTRAINT "event_stops_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "event_stops_event_idx" ON "event_stops" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "event_stops_start_time_idx" ON "event_stops" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "event_stops_city_idx" ON "event_stops" USING btree ("city");