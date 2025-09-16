CREATE TABLE "galleries" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"cover_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "galleries_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"gallery_id" integer NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"caption" text,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "gallery_slug_idx" ON "galleries" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "gallery_date_idx" ON "galleries" USING btree ("date");--> statement-breakpoint
CREATE INDEX "gallery_images_gallery_idx" ON "gallery_images" USING btree ("gallery_id");--> statement-breakpoint
CREATE INDEX "gallery_images_order_idx" ON "gallery_images" USING btree ("order_index");