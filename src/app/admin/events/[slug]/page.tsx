import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Calendar, Clock } from "lucide-react"
import { getEventBySlug, updateEvent, getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"
import { DeleteEventForm } from "@/components/admin/delete-event-form"
import { EventDatePicker } from "@/components/admin/event-date-picker"
import { ImageUpload } from "@/components/admin/image-upload"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventEditPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  const { slug } = await params
  
  if (!slug) {
    redirect("/admin")
  }

  const [event, venues] = await Promise.all([
    getEventBySlug(slug),
    getAdminVenues()
  ])

  if (!event) {
    redirect("/admin")
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Edit Event
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {event.title} • {event.venueName}
                </p>
              </div>
            </div>
            
            {/* Preview Badge */}
            <div className="flex items-center gap-2">
              {event.isPublished ? (
                <span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm font-medium rounded-full">
                  Published
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-sm font-medium rounded-full">
                  Draft
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <form action={updateEvent}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Form Fields (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              <input type="hidden" name="eventId" value={event.id} />
              
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        defaultValue={event.title} 
                        required 
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input 
                        id="slug" 
                        name="slug" 
                        defaultValue={event.slug} 
                        required 
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input 
                      id="tagline" 
                      name="tagline" 
                      defaultValue={event.tagline || ""} 
                      placeholder="Live In Vancouver"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      defaultValue={event.description || ""} 
                      rows={4}
                      className="bg-background resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Date & Time</h2>
                <EventDatePicker 
                  startTime={new Date(event.startTime)} 
                  endTime={new Date(event.endTime)} 
                />
              </div>

              {/* Location */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Location</h2>
                <div className="space-y-2">
                  <Label htmlFor="venueId">Venue *</Label>
                  <Select name="venueId" defaultValue={event.venueId?.toString() || ""}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
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
              </div>

              {/* Artists */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Artists</h3>
                <div className="space-y-2">
                  {event.artists.length > 0 ? (
                    event.artists.map((artist, index) => (
                      <div key={artist.id} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span className="text-foreground">{artist.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No artists assigned</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Media and Publishing (1/3 width) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Media */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Media</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Event Poster</Label>
                    <ImageUpload 
                      defaultImage={event.image} 
                      defaultImageKey={event.imageKey}
                      name="image" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketUrl">Ticket URL</Label>
                    <Input 
                      id="ticketUrl" 
                      name="ticketUrl" 
                      defaultValue={event.ticketUrl || ""} 
                      placeholder="https://tickets.example.com/event"
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Publishing</h2>
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Checkbox 
                    id="isPublished" 
                    name="isPublished" 
                    defaultChecked={event.isPublished}
                    className="data-[state=checked]:bg-[--gold] data-[state=checked]:border-[--gold]"
                  />
                  <div>
                    <Label htmlFor="isPublished" className="text-base cursor-pointer">Publish Event</Label>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Make this event visible to the public
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Schedule Info */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Event Schedule</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-xs">Start Time</p>
                      <p className="text-foreground">
                        {new Date(event.startTime).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-xs">End Time</p>
                      <p className="text-foreground">
                        {new Date(event.endTime).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Full Width */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-border">
            <DeleteEventForm eventId={event.id} />
            <div className="flex gap-3">
              <Link href="/admin">
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}