"use client"

import { useState, useCallback } from "react"
import { X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UploadDropzone } from "@/lib/uploadthing"
import type { ClientUploadedFileData } from "uploadthing/types"

interface ImageUploadProps {
  defaultImage?: string | null
  defaultImageKey?: string | null
  name?: string
  onImageChange?: (url: string | null, key: string | null) => void
  aspectRatio?: "square" | "poster"
}

export function ImageUpload({ 
  defaultImage, 
  defaultImageKey,
  name = "image",
  onImageChange,
  aspectRatio = "poster"
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImage || null)
  const [imageKey, setImageKey] = useState<string | null>(defaultImageKey || null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = useCallback((res: ClientUploadedFileData<{
    uploadedBy: string;
    url: string;
    key: string;
    name: string;
    size: number;
  }>[]) => {
    if (res && res[0]) {
      const file = res[0]
      setImageUrl(file.url)
      setImageKey(file.key)
      onImageChange?.(file.url, file.key)
    }
  }, [onImageChange])

  const removeImage = useCallback(() => {
    setImageUrl(null)
    setImageKey(null)
    onImageChange?.(null, null)
  }, [onImageChange])

  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[3/4]"

  if (imageUrl) {
    return (
      <div className="space-y-2">
        <div className="relative group">
          <div className={cn(aspectClass, "bg-muted rounded-lg overflow-hidden")}>
            <img
              src={imageUrl}
              alt={aspectRatio === "square" ? "Artist photo" : "Event poster"}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
        
        {/* Hidden inputs to maintain the image data for form submission */}
        <input type="hidden" name={name} value={imageUrl || ""} />
        <input type="hidden" name={`${name}Key`} value={imageKey || ""} />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <UploadDropzone
        endpoint="eventPoster"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error)
          alert(`Upload failed: ${error.message}`)
        }}
        onUploadBegin={() => {
          setIsUploading(true)
        }}
        onUploadProgress={() => {
          // Could add progress tracking here if needed
        }}
        config={{
          mode: "auto"
        }}
        appearance={{
          container: cn(
            aspectClass, "border-2 border-dashed rounded-lg transition-all",
            "flex flex-col items-center justify-center cursor-pointer",
            "hover:border-muted-foreground/50 hover:bg-muted/50",
            "border-muted-foreground/20 bg-muted/30",
            "ut-uploading:border-[--gold] ut-uploading:bg-[--gold]/10",
            "ut-ready:hover:border-[--gold]/50"
          ),
          uploadIcon: "hidden",
          label: "hidden",
          allowedContent: "hidden",
          button: cn(
            "hidden" // We'll use our custom UI instead
          ),
        }}
        content={{
          uploadIcon() {
            if (isUploading) {
              return <Loader2 className="h-12 w-12 mx-auto mb-3 text-[--gold] animate-spin" />
            }
            return <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          },
          label() {
            if (isUploading) {
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
                  Drop image here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP up to 4MB
                </p>
              </div>
            )
          },
          allowedContent() {
            return null // Hidden via appearance
          },
          button() {
            return null // Hidden via appearance
          }
        }}
      />
      
      {/* Hidden inputs for form submission */}
      <input type="hidden" name={name} value={imageUrl || ""} />
      <input type="hidden" name={`${name}Key`} value={imageKey || ""} />
    </div>
  )
}