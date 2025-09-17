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
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false)

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
    setLightboxImageLoading(true)
    setSelectedImageIndex(
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
    )
  }, [selectedImageIndex, images.length])

  const navigateNext = useCallback(() => {
    if (selectedImageIndex === null) return
    setLightboxImageLoading(true)
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
    // Clear lightbox loading state when the currently selected image finishes loading
    if (index === selectedImageIndex) {
      setLightboxImageLoading(false)
    }
  }

  const handleImageLoadStart = (index: number) => {
    setIsLoading(prev => new Set(prev).add(index))
    // Set lightbox loading state when starting to load the currently selected image
    if (index === selectedImageIndex) {
      setLightboxImageLoading(true)
    }
  }

  // Prevent body scroll when modal is open and handle initial loading state
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden'
      // Reset lightbox loading state when opening a new image
      setLightboxImageLoading(true)
    } else {
      document.body.style.overflow = ''
      setLightboxImageLoading(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImageIndex])

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              setLightboxImageLoading(true)
              setSelectedImageIndex(index)
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted hover:shadow-2xl transition-all duration-300"
            aria-label={`View image ${index + 1}`}
          >
            {/* Skeleton loading background */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted",
              "animate-pulse transition-opacity duration-300",
              isLoading.has(index) ? "opacity-100" : "opacity-0"
            )} />
            
            <Image
              src={image.url}
              alt={image.caption || `${title} - Image ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-all duration-300 group-hover:scale-110",
                isLoading.has(index) ? "opacity-0" : "opacity-100"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoadingComplete={() => handleImageLoad(index)}
              onLoadStart={() => handleImageLoadStart(index)}
            />
            
            {/* Loading spinner overlay */}
            {isLoading.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">Loading...</span>
                </div>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className={cn(
              "absolute inset-0 bg-black/20 transition-opacity",
              isLoading.has(index) ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            )} />
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
              {/* Loading backdrop */}
              {(lightboxImageLoading || isLoading.has(selectedImageIndex)) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
                  <div className="flex flex-col items-center gap-4 text-white">
                    <Loader2 className="h-12 w-12 animate-spin" />
                    <span className="text-lg font-medium tracking-wide">Loading image...</span>
                  </div>
                </div>
              )}
              
              <Image
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].caption || `${title} - Image ${selectedImageIndex + 1}`}
                width={1920}
                height={1080}
                className={cn(
                  "object-contain w-full h-full transition-opacity duration-300",
                  (lightboxImageLoading || isLoading.has(selectedImageIndex)) ? "opacity-0" : "opacity-100"
                )}
                priority
                onLoadingComplete={() => handleImageLoad(selectedImageIndex)}
                onLoadStart={() => handleImageLoadStart(selectedImageIndex)}
              />
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