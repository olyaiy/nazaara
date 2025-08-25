import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Star, Crown } from "lucide-react";
import type { Metadata } from "next";
import BookingsClient from "@/components/bookings-client";

export const metadata: Metadata = {
  title: "Private Bookings - Nazaara Live | Celebrity Artists & Premium DJ Services",
  description: "Book exclusive South Asian entertainment for your private events. From Bollywood A-listers to our elite DJ roster, we orchestrate extraordinary experiences for luxury celebrations worldwide.",
  keywords: ["private bookings", "celebrity bookings", "Bollywood artists", "South Asian DJ", "luxury events", "private concerts", "wedding entertainment"],
  openGraph: {
    title: "Private Bookings - Nazaara Live | Celebrity Artists & Premium DJ Services",
    description: "Book exclusive South Asian entertainment for your private events. From Bollywood A-listers to our elite DJ roster, we orchestrate extraordinary experiences for luxury celebrations worldwide.",
    url: "https://nazaaralive.com/bookings",
    siteName: "Nazaara Live",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "Nazaara Live Private Bookings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Bookings - Nazaara Live | Celebrity Artists & Premium DJ Services", 
    description: "Book exclusive South Asian entertainment for your private events. From Bollywood A-listers to our elite DJ roster, we orchestrate extraordinary experiences for luxury celebrations worldwide.",
    images: ["/OG.png"],
  },
};

export default function BookingsPage() {
  return <BookingsClient />;
}