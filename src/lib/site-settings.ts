import { promises as fs } from "fs";
import path from "path";

export interface SiteSettings {
  hideAbout: boolean;
  hideBookings: boolean;
  useExternalGallery: boolean;
  externalGalleryUrl: string;
}

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src", "content", "site-settings.json");

const DEFAULT_SETTINGS: SiteSettings = {
  hideAbout: false,
  hideBookings: false,
  useExternalGallery: false,
  externalGalleryUrl: "https://tamasha.myportfolio.com/",
};

let inMemorySettings: SiteSettings | null = null;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (inMemorySettings) return inMemorySettings;
  try {
    const raw = await fs.readFile(SETTINGS_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    inMemorySettings = {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch {
    inMemorySettings = { ...DEFAULT_SETTINGS };
  }
  return inMemorySettings;
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next: SiteSettings = { ...current, ...partial };
  await fs.mkdir(path.dirname(SETTINGS_FILE_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(next, null, 2), "utf8");
  inMemorySettings = next;
  return next;
}

export function clearSiteSettingsCache(): void {
  inMemorySettings = null;
}


