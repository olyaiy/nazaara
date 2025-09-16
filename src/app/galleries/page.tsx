import { getPublicGalleries } from "@/lib/public-actions"
import { GalleryGrid } from "@/components/galleries/gallery-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galleries - Nazaara Live",
  description: "Explore our collection of event photos from Nazaara Live shows across the world.",
  openGraph: {
    title: "Galleries - Nazaara Live",
    description: "Explore our collection of event photos from Nazaara Live shows across the world.",
    url: "https://nazaaralive.com/galleries",
    siteName: "Nazaara Live",
    locale: "en_US",
    type: "website",
  },
}

export default async function GalleriesPage() {
  const galleries = await getPublicGalleries()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[--maroon-red]/20 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 text-foreground">
              Event Galleries
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Relive the moments from our unforgettable events
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <GalleryGrid galleries={galleries} />
        </div>
      </section>
    </div>
  )
}