"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface VenueImageProps {
  src?: string | null
  alt: string
}

export function VenueImage({ src, alt }: VenueImageProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {src && !imageError ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[--gold]/10">
          <MapPin className="h-5 w-5 text-[--gold]" />
        </div>
      )}
    </>
  )
}