CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"hide_about" boolean DEFAULT false NOT NULL,
	"hide_bookings" boolean DEFAULT false NOT NULL,
	"use_external_gallery" boolean DEFAULT false NOT NULL,
	"external_gallery_url" text DEFAULT 'https://tamasha.myportfolio.com/' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
