"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, Trash2, Eye, EyeOff } from "lucide-react"
import { GalleryUploadThingUpload } from "@/components/admin/gallery-uploadthing-upload"
import { createGallery, updateGallery, deleteGallery } from "@/lib/admin-actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ImageData {
  id?: number
  url: string
  key: string
  caption?: string | null
  orderIndex: number | null
}

interface GalleryFormProps {
  gallery?: {
    id: number
    title: string
    slug: string
    description: string | null
    date: Date
    coverImage: string | null
    images: ImageData[]
  } | null
  mode: "create" | "edit"
}

export function GalleryForm({ gallery, mode }: GalleryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [images, setImages] = useState<ImageData[]>(gallery?.images || [])

  const handleImagesChange = (newImages: ImageData[]) => {
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Clear existing image inputs and add updated ones
    let index = 0
    while (formData.has(`images[${index}][url]`)) {
      formData.delete(`images[${index}][url]`)
      formData.delete(`images[${index}][key]`)
      index++
    }
    
    // Add current images to formData
    images.forEach((image, idx) => {
      formData.append(`images[${idx}][url]`, image.url)
      formData.append(`images[${idx}][key]`, image.key)
    })
    
    try {
      if (mode === "create") {
        await createGallery(formData)
      } else if (gallery) {
        formData.append("galleryId", gallery.id.toString())
        await updateGallery(formData)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to save gallery. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!gallery) return
    
    setIsDeleting(true)
    const formData = new FormData()
    formData.append("galleryId", gallery.id.toString())
    
    try {
      await deleteGallery(formData)
    } catch (error) {
      console.error("Error deleting gallery:", error)
      alert("Failed to delete gallery. Please try again.")
      setIsDeleting(false)
    }
  }

  // Format date for input
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return ""
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 max-w-5xl">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Information</CardTitle>
            <CardDescription>
              Basic details about the gallery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Gallery Title *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={gallery?.title}
                  placeholder="e.g., Summer Festival 2024"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Gallery Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={formatDateForInput(gallery?.date)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={gallery?.description || ""}
                placeholder="Brief description of the gallery (optional)"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>
              Upload and manage gallery images. Drag to reorder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GalleryUploadThingUpload 
              defaultImages={gallery?.images || []}
              onImagesChange={handleImagesChange}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {mode === "edit" && gallery && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting || isSubmitting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Gallery
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Gallery</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{gallery.title}"? This will permanently delete the gallery and all its images. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Gallery
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <Button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {mode === "create" ? "Create Gallery" : "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}