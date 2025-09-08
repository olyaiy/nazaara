"use client"

import { useState } from "react"
import { Users } from "lucide-react"

interface ArtistImageProps {
  src?: string | null
  alt: string
}

export function ArtistImage({ src, alt }: ArtistImageProps) {
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
        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-[--gold]/10">
          <Users className="h-8 w-8 text-[--gold]" />
        </div>
      )}
    </>
  )
}