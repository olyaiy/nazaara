"use client"

import { useState, useCallback } from "react"
import { X, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UploadDropzone } from "@/lib/uploadthing"
import type { ClientUploadedFileData } from "uploadthing/types"

interface ImageData {
  url: string | null
  key: string | null
}

interface MultiImageUploadProps {
  defaultImages?: (string | null)[]
  defaultImageKeys?: (string | null)[]
  names?: string[]
}

export function MultiImageUpload({ 
  defaultImages = [], 
  defaultImageKeys = [],
  names = ["image1", "image2", "image3"] 
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageData[]>([
    { url: defaultImages[0] || null, key: defaultImageKeys[0] || null },
    { url: defaultImages[1] || null, key: defaultImageKeys[1] || null },
    { url: defaultImages[2] || null, key: defaultImageKeys[2] || null },
  ])
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  const handleUploadComplete = useCallback((index: number) => (res: ClientUploadedFileData<{
    uploadedBy: string;
    url: string;
    key: string;
    name: string;
    size: number;
  }>[]) => {
    if (res && res[0]) {
      const file = res[0]
      const newImages = [...images]
      newImages[index] = { url: file.url, key: file.key }
      setImages(newImages)
      setUploadingIndex(null)
    }
  }, [images])

  const removeImage = useCallback((index: number) => {
    const newImages = [...images]
    newImages[index] = { url: null, key: null }
    setImages(newImages)
  }, [images])

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Image {index + 1}</span>
              {index === 0 && <span className="text-xs text-[--gold]">(Primary)</span>}
            </div>
            
            {images[index].url ? (
              <div className="relative group">
                <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={images[index].url!}
                    alt={`Venue image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
                {/* Hidden inputs for form submission */}
                <input type="hidden" name={names[index]} value={images[index].url || ""} />
                <input type="hidden" name={`${names[index]}Key`} value={images[index].key || ""} />
              </div>
            ) : (
              <div>
                <UploadDropzone
                  endpoint="venueImage"
                  onClientUploadComplete={handleUploadComplete(index)}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error)
                    alert(`Upload failed: ${error.message}`)
                    setUploadingIndex(null)
                  }}
                  onUploadBegin={() => {
                    setUploadingIndex(index)
                  }}
                  config={{
                    mode: "auto"
                  }}
                  appearance={{
                    container: cn(
                      "aspect-[16/10] border-2 border-dashed rounded-lg transition-all",
                      "flex flex-col items-center justify-center cursor-pointer",
                      "hover:border-muted-foreground/50 hover:bg-muted/50",
                      "border-muted-foreground/20 bg-muted/30",
                      uploadingIndex === index && "border-[--gold] bg-[--gold]/10",
                      "ut-ready:hover:border-[--gold]/50"
                    ),
                    uploadIcon: "hidden",
                    label: "hidden",
                    allowedContent: "hidden",
                    button: "hidden",
                  }}
                  content={{
                    uploadIcon() {
                      if (uploadingIndex === index) {
                        return <Loader2 className="h-10 w-10 mx-auto mb-2 text-[--gold] animate-spin" />
                      }
                      return (
                        <div className="flex flex-col items-center">
                          <Plus className="h-10 w-10 mb-2 text-muted-foreground" />
                        </div>
                      )
                    },
                    label() {
                      if (uploadingIndex === index) {
                        return (
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">Uploading...</p>
                            <p className="text-xs text-muted-foreground mt-1">Please wait</p>
                          </div>
                        )
                      }
                      return (
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Drop image or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP up to 1GB
                          </p>
                        </div>
                      )
                    },
                    allowedContent() {
                      return null
                    },
                    button() {
                      return null
                    }
                  }}
                />
                {/* Hidden inputs for empty slots */}
                <input type="hidden" name={names[index]} value="" />
                <input type="hidden" name={`${names[index]}Key`} value="" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Add up to 3 images to showcase the venue. The first image will be featured prominently.
      </p>
    </div>
  )
}