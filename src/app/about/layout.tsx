import { getSiteSettings } from "@/lib/site-settings";
import { redirect } from "next/navigation";

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  if (settings.hideAbout) {
    redirect("/");
  }
  return <>{children}</>;
}


