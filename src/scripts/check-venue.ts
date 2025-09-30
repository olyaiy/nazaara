import { db } from "@/db/drizzle"
import { venues } from "@/db/schema"
import { eq } from "drizzle-orm"

async function checkVenue() {
  try {
    console.log("Checking for venue with slug: fortune-sound-club")
    
    // Get all venues
    const allVenues = await db.select().from(venues)
    console.log("All venues in database:", allVenues)
    
    // Check specific venue
    const venue = await db
      .select()
      .from(venues)
      .where(eq(venues.slug, "fortune-sound-club"))
      .limit(1)
    
    console.log("Venue with slug 'fortune-sound-club':", venue)
    
    if (venue.length === 0) {
      console.log("❌ No venue found with slug 'fortune-sound-club'")
    } else {
      console.log("✅ Venue found:", venue[0])
    }
    
  } catch (error) {
    console.error("Error checking venue:", error)
  }
  process.exit(0)
}

checkVenue()