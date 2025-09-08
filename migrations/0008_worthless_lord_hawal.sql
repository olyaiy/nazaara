ALTER TABLE "events" DROP CONSTRAINT "events_venue_id_venues_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "venue_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "artists" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "venues" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "artist_slug_idx" ON "artists" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "venue_slug_idx" ON "venues" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "venues" ADD CONSTRAINT "venues_slug_unique" UNIQUE("slug");