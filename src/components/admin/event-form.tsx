"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { EventDatePicker } from "@/components/admin/event-date-picker"
import { ImageUpload } from "@/components/admin/image-upload"
import { ArtistSelector } from "@/components/admin/artist-selector"
import { createEvent } from "@/lib/admin-actions"
import Link from "next/link"

interface Venue {
  id: number
  name: string
  city: string
}

interface Artist {
  id: number
  name: string
  slug: string
}

interface EventFormProps {
  venues: Venue[]
  artists: Artist[]
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
}

export function EventForm({ venues, artists }: EventFormProps) {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)

  // Auto-generate slug from title only if not manually edited
  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      setSlug(generateSlug(title))
    }
  }, [title, isSlugManuallyEdited])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value
    setSlug(newSlug)
    
    // Mark as manually edited if the user types something different from auto-generated
    if (newSlug !== generateSlug(title)) {
      setIsSlugManuallyEdited(true)
    }
  }

  const handleSlugFocus = () => {
    // When user focuses the slug field, assume they might want to edit it
    if (slug) {
      setIsSlugManuallyEdited(true)
    }
  }

  return (
    <form action={createEvent} className="space-y-4">
      
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input 
          id="title" 
          name="title" 
          value={title}
          onChange={handleTitleChange}
          required 
          placeholder="NAZAARA"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">
          URL Slug * 
          {!isSlugManuallyEdited && title && (
            <span className="ml-2 text-xs text-muted-foreground">
              (auto-generated)
            </span>
          )}
        </Label>
        <Input 
          id="slug" 
          name="slug" 
          value={slug}
          onChange={handleSlugChange}
          onFocus={handleSlugFocus}
          required 
          placeholder="nazaara-01"
          className={!isSlugManuallyEdited && title ? "text-muted-foreground" : ""}
        />
        <p className="text-xs text-muted-foreground">
          This will be used in the URL: /events/{slug || "your-event-slug"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input 
          id="tagline" 
          name="tagline" 
          placeholder="Live In Vancouver"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          rows={3}
          placeholder="Experience the ultimate South Asian music event..."
        />
      </div>

      <EventDatePicker />

      <div className="space-y-2">
        <Label htmlFor="venueId">Venue *</Label>
        <Select name="venueId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a venue" />
          </SelectTrigger>
          <SelectContent>
            {venues.map((venue) => (
              <SelectItem key={venue.id} value={venue.id.toString()}>
                {venue.name} - {venue.city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ArtistSelector artists={artists} />

      <div className="space-y-2">
        <Label>Event Poster</Label>
        <ImageUpload name="image" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ticketUrl">Ticket URL</Label>
        <Input 
          id="ticketUrl" 
          name="ticketUrl" 
          placeholder="https://tickets.example.com/event"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isPublished" 
          name="isPublished"
        />
        <Label htmlFor="isPublished">Published (visible to public)</Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
          Create Event
        </Button>
        <Link href="/admin">
          <Button variant="outline">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}