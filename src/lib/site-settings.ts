import { db } from "@/db/drizzle";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface SiteSettings {
  hideAbout: boolean;
  hideBookings: boolean;
  useExternalGallery: boolean;
  externalGalleryUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  hideAbout: false,
  hideBookings: false,
  useExternalGallery: false,
  externalGalleryUrl: "https://tamasha.myportfolio.com/",
};

/**
 * Get site settings from database
 * Uses a singleton pattern - always reads/updates row with id=1
 * Creates the row with defaults if it doesn't exist
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    // Try to get existing settings (id=1)
    const settings = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, 1),
    });

    if (settings) {
      return {
        hideAbout: settings.hideAbout,
        hideBookings: settings.hideBookings,
        useExternalGallery: settings.useExternalGallery,
        externalGalleryUrl: settings.externalGalleryUrl,
      };
    }

    // If no settings exist, create default row
    const [newSettings] = await db
      .insert(siteSettings)
      .values({
        id: 1,
        ...DEFAULT_SETTINGS,
      })
      .returning();

    return {
      hideAbout: newSettings.hideAbout,
      hideBookings: newSettings.hideBookings,
      useExternalGallery: newSettings.useExternalGallery,
      externalGalleryUrl: newSettings.externalGalleryUrl,
    };
  } catch (error) {
    console.error("Error getting site settings:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update site settings in database
 * Always updates the singleton row with id=1
 */
export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    // Ensure settings row exists
    await getSiteSettings();

    // Update the settings
    const [updated] = await db
      .update(siteSettings)
      .set({
        ...partial,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, 1))
      .returning();

    return {
      hideAbout: updated.hideAbout,
      hideBookings: updated.hideBookings,
      useExternalGallery: updated.useExternalGallery,
      externalGalleryUrl: updated.externalGalleryUrl,
    };
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
}


