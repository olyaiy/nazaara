import { getSiteSettings } from "@/lib/site-settings";
import { redirect } from "next/navigation";

export default async function BookingsLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  if (settings.hideBookings) {
    redirect("/");
  }
  return <>{children}</>;
}


