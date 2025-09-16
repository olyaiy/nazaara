import { notFound } from "next/navigation"
import Link from "next/link"
import { getPublicGalleryBySlug } from "@/lib/public-actions"
import { GalleryImageViewer } from "@/components/galleries/gallery-image-viewer"
import { ArrowLeft, Calendar, Camera } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const gallery = await getPublicGalleryBySlug(slug)
  
  if (!gallery) {
    return {
      title: "Gallery Not Found - Nazaara Live",
    }
  }

  return {
    title: `${gallery.title} - Nazaara Live`,
    description: gallery.description || `View photos from ${gallery.title}`,
    openGraph: {
      title: `${gallery.title} - Nazaara Live`,
      description: gallery.description || `View photos from ${gallery.title}`,
      url: `https://nazaaralive.com/galleries/${slug}`,
      siteName: "Nazaara Live",
      images: gallery.firstImage ? [
        {
          url: gallery.firstImage,
          width: 1200,
          height: 630,
          alt: gallery.title,
        },
      ] : [],
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params
  const gallery = await getPublicGalleryBySlug(slug)

  if (!gallery || !gallery.images) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <Link 
              href="/galleries"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Galleries</span>
            </Link>

            {/* Gallery info */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-foreground">
                {gallery.title}
              </h1>
              
              {gallery.description && (
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {gallery.description}
                </p>
              )}

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(gallery.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>{gallery.imageCount} {gallery.imageCount === 1 ? 'photo' : 'photos'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {gallery.images.length > 0 ? (
            <GalleryImageViewer 
              images={gallery.images} 
              title={gallery.title}
            />
          ) : (
            <div className="text-center py-20">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No images in this gallery</h3>
              <p className="text-muted-foreground">Check back soon for updates</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}