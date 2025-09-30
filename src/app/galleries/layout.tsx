import { getSiteSettings } from "@/lib/site-settings";
import { redirect } from "next/navigation";

export default async function GalleriesLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  if (settings.useExternalGallery) {
    redirect("/");
  }
  return <>{children}</>;
}


