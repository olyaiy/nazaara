"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Upload, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoFile {
  file: File
  id: string
  preview: string
}

interface PhotoUploadProps {
  onFilesChange?: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
}

export function PhotoUpload({
  onFilesChange,
  maxFiles,
  maxFileSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  className,
}: PhotoUploadProps) {
  const [photos, setPhotos] = useState<PhotoFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `${file.name} is not a supported file type`
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `${file.name} is too large (max ${maxFileSize}MB)`
    }
    return null
  }

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: PhotoFile[] = []
      const errors: string[] = []

      Array.from(fileList).forEach((file) => {
        const validationError = validateFile(file)
        if (validationError) {
          errors.push(validationError)
          return
        }

        const id = Math.random().toString(36).substring(7)
        const preview = URL.createObjectURL(file)
        newFiles.push({ file, id, preview })
      })

      if (errors.length > 0) {
        setError(errors[0])
        setTimeout(() => setError(null), 4000)
      } else {
        setError(null)
      }

      if (newFiles.length > 0) {
        const updatedPhotos = [...photos, ...newFiles]
        setPhotos(updatedPhotos)
        onFilesChange?.(updatedPhotos.map((p) => p.file))
      }
    },
    [photos, onFilesChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        processFiles(files)
      }
    },
    [processFiles],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        processFiles(files)
      }
      // Reset input value to allow selecting the same file again
      e.target.value = ""
    },
    [processFiles],
  )

  const removePhoto = useCallback(
    (id: string) => {
      setPhotos((prev) => {
        const updated = prev.filter((photo) => {
          if (photo.id === id) {
            URL.revokeObjectURL(photo.preview)
            return false
          }
          return true
        })
        onFilesChange?.(updated.map((p) => p.file))
        return updated
      })
    },
    [onFilesChange],
  )

  const removeAllPhotos = useCallback(() => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview))
    setPhotos([])
    onFilesChange?.([])
  }, [photos, onFilesChange])

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

    const newPhotos = [...photos]
    const draggedPhoto = newPhotos[draggedIndex]

    // Remove from old position
    newPhotos.splice(draggedIndex, 1)

    // Insert at new position
    newPhotos.splice(dropIndex, 0, draggedPhoto)

    setPhotos(newPhotos)
    onFilesChange?.(newPhotos.map((p) => p.file))
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 cursor-pointer",
          "hover:border-accent hover:bg-accent/5",
          isDragOver ? "border-accent bg-accent/10 scale-[1.02]" : "border-muted-foreground/30",
          photos.length > 0 ? "p-8" : "p-12",
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
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={cn(
              "rounded-full p-4 transition-colors",
              isDragOver ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              {photos.length === 0 ? "Upload your photos" : "Add more photos"}
            </h3>
            <p className="text-sm text-muted-foreground text-balance">
              Drag and drop your photos here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">Supports JPEG, PNG, WebP, GIF up to {maxFileSize}MB each</p>
          </div>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={removeAllPhotos}
              className="text-muted-foreground hover:text-destructive bg-transparent"
            >
              Remove all
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={cn(
                  "group relative cursor-move",
                  draggedIndex === index && "opacity-50",
                  dragOverIndex === index && "scale-105 transition-transform",
                )}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOverPhoto(e, index)}
                onDragLeave={handleDragLeavePhoto}
                onDrop={(e) => handleDropPhoto(e, index)}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                  <img
                    src={photo.preview || "/placeholder.svg"}
                    alt={photo.file.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 text-white p-1 rounded">
                    <GripVertical className="w-3 h-3" />
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    removePhoto(photo.id)
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="truncate" title={photo.file.name}>
                    {photo.file.name}
                  </p>
                  <p className="text-white/80">{(photo.file.size / 1024 / 1024).toFixed(1)}MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Stats */}
      {photos.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
          <span>
            {photos.length} file{photos.length !== 1 ? "s" : ""} {/* removed "of X files" limit display */}
          </span>
          <span>{(photos.reduce((acc, photo) => acc + photo.file.size, 0) / 1024 / 1024).toFixed(1)}MB total</span>
        </div>
      )}
    </div>
  )
}
