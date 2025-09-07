DROP INDEX "event_date_idx";--> statement-breakpoint
DROP INDEX "event_featured_idx";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "start_time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "end_time" timestamp NOT NULL;--> statement-breakpoint
CREATE INDEX "event_start_time_idx" ON "events" USING btree ("start_time");--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "number";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "event_date";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "date_display";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "dates_description";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "year";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "currency";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "is_featured";