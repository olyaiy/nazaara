"use client"

import { useState, useCallback, useEffect } from "react"
import { X, Loader2, Plus, Image as ImageIcon, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UploadDropzone } from "@/lib/uploadthing"
import type { ClientUploadedFileData } from "uploadthing/types"

interface ImageData {
  id?: number
  url: string
  key: string
  caption?: string | null
  orderIndex: number | null
}

interface GalleryMultiImageUploadProps {
  defaultImages?: ImageData[]
  onImagesChange?: (images: ImageData[]) => void
}

export function GalleryMultiImageUpload({ 
  defaultImages = [], 
  onImagesChange 
}: GalleryMultiImageUploadProps) {
  const [images, setImages] = useState<ImageData[]>(defaultImages)
  const [isUploading, setIsUploading] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  // Notify parent of changes
  useEffect(() => {
    onImagesChange?.(images)
  }, [images, onImagesChange])

  const handleUploadComplete = useCallback((res: ClientUploadedFileData<{
    uploadedBy: string;
    url: string;
    key: string;
    name: string;
    size: number;
  }>[]) => {
    if (res && res.length > 0) {
      const newImages = res.map((file, index) => ({
        url: file.url,
        key: file.key,
        orderIndex: images.length + index,
      }))
      
      setImages(prev => [...prev, ...newImages])
      setIsUploading(false)
    }
  }, [images.length])

  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      // Reindex remaining images
      return newImages.map((img, i) => ({ ...img, orderIndex: i }))
    })
  }, [])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    setImages(prev => {
      const newImages = [...prev]
      const draggedImage = newImages[draggedIndex]
      
      // Remove dragged image from original position
      newImages.splice(draggedIndex, 1)
      
      // Insert at new position
      const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex
      newImages.splice(adjustedDropIndex, 0, draggedImage)
      
      // Reindex all images
      return newImages.map((img, i) => ({ ...img, orderIndex: i }))
    })
    
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.key}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative group rounded-lg overflow-hidden border-2 transition-all",
                draggedIndex === index 
                  ? "border-[--gold] opacity-50" 
                  : "border-border hover:border-muted-foreground/50",
                "cursor-move"
              )}
            >
              <div className="aspect-[4/3] bg-muted">
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div className="absolute top-2 left-2 text-white/80">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="absolute top-2 right-2 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
                  #{index + 1}
                </div>
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
              
              {/* Hidden inputs for form submission */}
              <input type="hidden" name={`images[${index}][url]`} value={image.url} />
              <input type="hidden" name={`images[${index}][key]`} value={image.key} />
            </div>
          ))}
        </div>
      )}

      {/* Upload Zone */}
      <div>
        <UploadDropzone
          endpoint="galleryImage"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error)
            alert(`Upload failed: ${error.message}`)
            setIsUploading(false)
          }}
          onUploadBegin={() => {
            setIsUploading(true)
          }}
          config={{
            mode: "auto"
          }}
          appearance={{
            container: cn(
              "border-2 border-dashed rounded-lg transition-all p-8",
              "flex flex-col items-center justify-center cursor-pointer",
              "hover:border-muted-foreground/50 hover:bg-muted/50",
              "border-muted-foreground/20 bg-muted/30",
              isUploading && "border-[--gold] bg-[--gold]/10",
              "ut-ready:hover:border-[--gold]/50",
              "min-h-[200px]"
            ),
            uploadIcon: "hidden",
            label: "hidden",
            allowedContent: "hidden",
            button: "hidden",
          }}
          content={{
            uploadIcon() {
              if (isUploading) {
                return <Loader2 className="h-12 w-12 mx-auto mb-3 text-[--gold] animate-spin" />
              }
              return (
                <div className="flex flex-col items-center">
                  {images.length === 0 ? (
                    <ImageIcon className="h-12 w-12 mb-3 text-muted-foreground" />
                  ) : (
                    <Plus className="h-12 w-12 mb-3 text-muted-foreground" />
                  )}
                </div>
              )
            },
            label() {
              if (isUploading) {
                return (
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Uploading images...</p>
                    <p className="text-xs text-muted-foreground mt-1">Please wait</p>
                  </div>
                )
              }
              return (
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {images.length === 0 
                      ? "Drop images here or click to upload"
                      : "Add more images"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP up to 1GB each • Max 100 files at once
                  </p>
                  {images.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Drag images to reorder • {images.length} image{images.length !== 1 ? 's' : ''} added
                    </p>
                  )}
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
      </div>

      {images.length === 0 && (
        <>
          <input type="hidden" name="images[0][url]" value="" />
          <input type="hidden" name="images[0][key]" value="" />
        </>
      )}
    </div>
  )
}