"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import type { PublicGalleryImage } from "@/lib/public-actions"
import { cn } from "@/lib/utils"

interface GalleryImageViewerProps {
  images: PublicGalleryImage[]
  title: string
}

export function GalleryImageViewer({ images, title }: GalleryImageViewerProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<Set<number>>(new Set())

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      switch (e.key) {
        case "Escape":
          setSelectedImageIndex(null)
          break
        case "ArrowLeft":
          navigatePrevious()
          break
        case "ArrowRight":
          navigateNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImageIndex])

  const navigatePrevious = useCallback(() => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex(
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
    )
  }, [selectedImageIndex, images.length])

  const navigateNext = useCallback(() => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex(
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
    )
  }, [selectedImageIndex, images.length])

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }

  const handleImageLoadStart = (index: number) => {
    setIsLoading(prev => new Set(prev).add(index))
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImageIndex])

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImageIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted hover:shadow-xl transition-all duration-300"
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.caption || `${title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              onLoadingComplete={() => handleImageLoad(index)}
              onLoadStart={() => handleImageLoadStart(index)}
            />
            {isLoading.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImageIndex(null)
            }}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigatePrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}


          {/* Main image */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].caption || `${title} - Image ${selectedImageIndex + 1}`}
                width={1920}
                height={1080}
                className="object-contain w-full h-full"
                priority
                onLoadingComplete={() => handleImageLoad(selectedImageIndex)}
                onLoadStart={() => handleImageLoadStart(selectedImageIndex)}
              />
              {isLoading.has(selectedImageIndex) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Caption if available */}
          {images[selectedImageIndex].caption && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 max-w-2xl text-center">
              <p className="text-white/80 text-sm">{images[selectedImageIndex].caption}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}