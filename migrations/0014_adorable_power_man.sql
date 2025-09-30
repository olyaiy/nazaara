CREATE TABLE "djs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255),
	"specialty" varchar(255),
	"experience" varchar(100),
	"performances" varchar(100),
	"availability" varchar(100),
	"bio" text,
	"highlights" text[],
	"instagram" varchar(100),
	"soundcloud" varchar(100),
	"image" text,
	"image_key" text,
	"order_index" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "djs_slug_unique" UNIQUE("slug"),
	CONSTRAINT "djs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX "dj_slug_idx" ON "djs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "dj_name_idx" ON "djs" USING btree ("name");--> statement-breakpoint
CREATE INDEX "dj_order_idx" ON "djs" USING btree ("order_index");--> statement-breakpoint
CREATE INDEX "dj_active_idx" ON "djs" USING btree ("is_active");