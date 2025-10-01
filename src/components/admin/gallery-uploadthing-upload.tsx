"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { X, Upload, GripVertical, Loader2, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { deleteUploadedFiles } from "@/lib/admin-actions"

interface ImageData {
  id?: number
  url: string
  key: string
  caption?: string | null
  orderIndex: number | null
  isNew?: boolean // Track if this is a newly uploaded image
}

interface GalleryUploadThingUploadProps {
  defaultImages?: ImageData[]
  onImagesChange?: (images: ImageData[]) => void
}

export function GalleryUploadThingUpload({ 
  defaultImages = [], 
  onImagesChange 
}: GalleryUploadThingUploadProps) {
  const [images, setImages] = useState<ImageData[]>(defaultImages)
  const [isDragOver, setIsDragOver] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadingCount, setUploadingCount] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize UploadThing with batch upload handling
  const { startUpload, isUploading } = useUploadThing("galleryImage", {
    onUploadBegin: (files) => {
      setUploadingCount(files.length)
      setUploadProgress(0)
    },
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        const newImages = res.map((file, index) => ({
          url: file.url,
          key: file.key,
          caption: null,
          orderIndex: images.length + index,
          isNew: true,
        }))
        
        setImages(prev => [...prev, ...newImages])
        setError(null)
        setUploadingCount(0)
        setUploadProgress(0)
      }
    },
    onUploadError: (error: Error) => {
      console.error("Upload error:", error)
      setError(error.message || "Upload failed. Please try again.")
      setTimeout(() => setError(null), 5000)
      setUploadingCount(0)
      setUploadProgress(0)
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    },
  })

  // Notify parent of changes
  useEffect(() => {
    onImagesChange?.(images)
  }, [images, onImagesChange])

  const removeImage = useCallback(async (index: number) => {
    const imageToRemove = images[index]
    
    // Delete from UploadThing server if it's a newly uploaded image
    if (imageToRemove?.key && imageToRemove.isNew) {
      await deleteUploadedFiles(imageToRemove.key)
    }
    
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      // Reindex remaining images
      return newImages.map((img, i) => ({ ...img, orderIndex: i }))
    })
  }, [images])

  const removeAllImages = useCallback(async () => {
    // Delete all newly uploaded images from UploadThing server
    const newImageKeys = images.filter(img => img.isNew).map(img => img.key)
    if (newImageKeys.length > 0) {
      await deleteUploadedFiles(newImageKeys)
    }
    
    setImages([])
  }, [images])

  // Efficient file handling for batch uploads
  const validateFile = (file: File): string | null => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    const maxFileSize = 1024 // MB (1GB)
    
    if (!acceptedTypes.includes(file.type)) {
      return `${file.name} is not a supported file type`
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `${file.name} is too large (max 1GB)`
    }
    return null
  }

  const processFiles = async (fileList: FileList) => {
    // Process files in batches for efficiency
    const files = Array.from(fileList)
    const validFiles: File[] = []
    const errors: string[] = []
    let errorCount = 0
    const maxErrors = 5 // Only show first 5 errors to avoid overwhelming the user

    for (const file of files) {
      const validationError = validateFile(file)
      if (validationError) {
        errorCount++
        if (errors.length < maxErrors) {
          errors.push(validationError)
        }
      } else {
        validFiles.push(file)
      }
    }

    if (errorCount > 0) {
      const errorMessage = errors.join('; ')
      const additionalErrors = errorCount - errors.length
      setError(
        additionalErrors > 0 
          ? `${errorMessage}; and ${additionalErrors} more errors`
          : errorMessage
      )
      setTimeout(() => setError(null), 5000)
    }

    if (validFiles.length > 0) {
      // Upload valid files even if some had errors
      await startUpload(validFiles)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await processFiles(files)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ""
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await processFiles(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  // Photo reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOverPhoto = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleDragLeavePhoto = () => {
    setDragOverIndex(null)
  }

  const handleDropPhoto = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    setImages(prev => {
      const newImages = [...prev]
      const draggedImage = newImages[draggedIndex]
      
      // Remove from old position
      newImages.splice(draggedIndex, 1)
      
      // Insert at new position
      const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex
      newImages.splice(adjustedDropIndex, 0, draggedImage)
      
      // Reindex all images
      return newImages.map((img, i) => ({ ...img, orderIndex: i }))
    })
    
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full space-y-6">
      {/* Upload Area */}
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 cursor-pointer",
          "hover:border-[--gold]/50 hover:bg-[--gold]/5",
          isDragOver ? "border-[--gold] bg-[--gold]/10 scale-[1.02]" : "border-muted-foreground/30",
          images.length > 0 ? "p-8" : "p-12",
          isUploading && "pointer-events-none opacity-75"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={cn(
              "rounded-full p-4 transition-colors",
              isDragOver ? "bg-[--gold] text-[--maroon-red]" : "bg-muted text-muted-foreground",
              isUploading && "animate-pulse"
            )}
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              {isUploading 
                ? `Uploading ${uploadingCount} image${uploadingCount !== 1 ? 's' : ''}...`
                : images.length === 0 
                  ? "Upload gallery images" 
                  : "Add more images"}
            </h3>
            <p className="text-sm text-muted-foreground text-balance">
              {isUploading 
                ? `Processing your images • ${uploadProgress}% complete`
                : "Drag and drop your images here, or click to browse"}
            </p>
            {!isUploading && (
              <p className="text-xs text-muted-foreground">
                Supports JPEG, PNG, WebP, GIF • Up to 1GB per image • Batch upload supported
              </p>
            )}
            {isUploading && uploadingCount > 10 && (
              <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[--gold] h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Photo Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              {images.length} image{images.length !== 1 ? "s" : ""} in gallery
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeAllImages}
              className="text-muted-foreground hover:text-destructive bg-transparent"
              disabled={isUploading}
            >
              Remove all
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.key}
                className={cn(
                  "group relative cursor-move",
                  draggedIndex === index && "opacity-50",
                  dragOverIndex === index && "scale-105 transition-transform"
                )}
                draggable={!isUploading}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOverPhoto(e, index)}
                onDragLeave={handleDragLeavePhoto}
                onDrop={(e) => handleDropPhoto(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                  <img
                    src={image.url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 text-white p-1 rounded">
                    <GripVertical className="w-3 h-3" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  #{index + 1}
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  disabled={isUploading}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Drag images to reorder them in the gallery
          </p>
        </div>
      )}

    </div>
  )
}