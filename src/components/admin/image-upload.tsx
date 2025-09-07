"use client"

import { useState, useCallback } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  defaultImage?: string | null
  name?: string
}

export function ImageUpload({ defaultImage, name = "image" }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageUrl(reader.result as string)
      setPreviewFile(file)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const removeImage = () => {
    setImageUrl(null)
    setPreviewFile(null)
  }

  return (
    <div className="space-y-2">
      {imageUrl ? (
        // Image preview with remove button
        <div className="relative group">
          <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Event poster"
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
          {previewFile && (
            <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
              <p>Ready to upload: {previewFile.name}</p>
              <p className="text-yellow-600 mt-1">Note: Upload functionality not yet implemented</p>
            </div>
          )}
        </div>
      ) : (
        // Dropzone
        <div
          className={cn(
            "aspect-[3/4] border-2 border-dashed rounded-lg transition-all",
            "flex flex-col items-center justify-center cursor-pointer",
            "hover:border-muted-foreground/50 hover:bg-muted/50",
            isDragging 
              ? "border-[--gold] bg-[--gold]/10" 
              : "border-muted-foreground/20 bg-muted/30"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          
          <div className="text-center p-6">
            {isDragging ? (
              <>
                <Upload className="h-12 w-12 mx-auto mb-3 text-[--gold]" />
                <p className="text-sm font-medium text-foreground">Drop image here</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop image here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden input to maintain the image URL for form submission */}
      <input 
        type="hidden" 
        name={name} 
        value={imageUrl || ""} 
      />
    </div>
  )
}