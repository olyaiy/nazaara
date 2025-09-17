"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Camera } from "lucide-react"
import type { PublicGallery } from "@/lib/public-actions"

interface GalleryGridProps {
  galleries: PublicGallery[]
}

export function GalleryGrid({ galleries }: GalleryGridProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getThumbnail = (gallery: PublicGallery) => {
    return  gallery.firstImage || null
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-20">
        <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-foreground mb-2">No galleries yet</h3>
        <p className="text-muted-foreground">Check back soon for event photos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {galleries.map((gallery) => {
        const thumbnail = getThumbnail(gallery)
        
        return (
          <Link
            key={gallery.id}
            href={`/galleries/${gallery.slug}`}
            className="group relative block overflow-hidden rounded-lg bg-muted aspect-[4/3] hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            {thumbnail ? (
              <div className="absolute inset-0">
                <Image
                  src={thumbnail}
                  alt={gallery.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[--gold] transition-colors">
                {gallery.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(gallery.date)}</span>
                </div>
                
              </div>
            </div>

            {/* Hover border */}
            <div className="absolute inset-0 border-2 border-[--gold] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />
          </Link>
        )
      })}
    </div>
  )
}