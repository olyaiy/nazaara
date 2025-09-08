import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function fixDatabase() {
  try {
    console.log("Starting database cleanup...");
    
    // Step 1: Check orphaned events
    const orphanedEvents = await sql`
      SELECT e.id, e.title, e.venue_id 
      FROM events e 
      LEFT JOIN venues v ON e.venue_id = v.id 
      WHERE e.venue_id IS NOT NULL AND v.id IS NULL
    `;
    
    if (orphanedEvents.length > 0) {
      console.log(`Found ${orphanedEvents.length} orphaned events:`, orphanedEvents);
      
      // Step 2: Set orphaned events venue_id to NULL
      console.log("Setting orphaned events venue_id to NULL...");
      await sql`
        UPDATE events 
        SET venue_id = NULL 
        WHERE venue_id IS NOT NULL 
        AND venue_id NOT IN (SELECT id FROM venues)
      `;
      console.log("✓ Fixed orphaned events");
    } else {
      console.log("✓ No orphaned events found");
    }
    
    // Step 3: Check if venues table has the slug column
    const venueColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'venues' 
      AND column_name = 'slug'
    `;
    
    if (venueColumns.length === 0) {
      console.log("Venues table doesn't have slug column yet - this is expected");
    } else {
      // Step 4: Generate slugs for existing venues if needed
      const venuesWithoutSlug = await sql`
        SELECT id, name FROM venues WHERE slug IS NULL
      `;
      
      if (venuesWithoutSlug.length > 0) {
        console.log(`Found ${venuesWithoutSlug.length} venues without slugs`);
        
        for (const venue of venuesWithoutSlug) {
          const slug = venue.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          
          console.log(`Setting slug for venue ${venue.name}: ${slug}`);
          await sql`
            UPDATE venues 
            SET slug = ${slug} 
            WHERE id = ${venue.id}
          `;
        }
        console.log("✓ Generated slugs for venues");
      }
    }
    
    // Step 5: Check if artists table has the slug column
    const artistColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'artists' 
      AND column_name = 'slug'
    `;
    
    if (artistColumns.length === 0) {
      console.log("Artists table doesn't have slug column yet - this is expected");
    } else {
      // Step 6: Generate slugs for existing artists if needed
      const artistsWithoutSlug = await sql`
        SELECT id, name FROM artists WHERE slug IS NULL
      `;
      
      if (artistsWithoutSlug.length > 0) {
        console.log(`Found ${artistsWithoutSlug.length} artists without slugs`);
        
        for (const artist of artistsWithoutSlug) {
          const slug = artist.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          
          console.log(`Setting slug for artist ${artist.name}: ${slug}`);
          await sql`
            UPDATE artists 
            SET slug = ${slug} 
            WHERE id = ${artist.id}
          `;
        }
        console.log("✓ Generated slugs for artists");
      }
    }
    
    console.log("\n✅ Database cleanup complete!");
    console.log("You can now run: npx drizzle-kit push");
    
  } catch (error) {
    console.error("Error fixing database:", error);
    process.exit(1);
  }
}

fixDatabase();