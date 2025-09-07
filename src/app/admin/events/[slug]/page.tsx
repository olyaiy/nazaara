import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from "lucide-react"
import { getEventBySlug, updateEvent, getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"
import { DeleteEventForm } from "@/components/admin/delete-event-form"

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

  const formatDateForInput = (date: Date | string) => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">
              Edit Event
            </h1>
            <p className="text-muted-foreground mt-1">
              {event.title}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Update the core event information</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateEvent} className="space-y-4">
                  <input type="hidden" name="eventId" value={event.id} />
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      defaultValue={event.title} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input 
                      id="slug" 
                      name="slug" 
                      defaultValue={event.slug} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input 
                      id="tagline" 
                      name="tagline" 
                      defaultValue={event.tagline || ""} 
                      placeholder="Live In Vancouver"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      defaultValue={event.description || ""} 
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input 
                        id="eventDate" 
                        name="eventDate" 
                        type="date"
                        defaultValue={formatDateForInput(event.eventDate)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input 
                        id="year" 
                        name="year" 
                        defaultValue={event.year} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateDisplay">Date Display</Label>
                      <Input 
                        id="dateDisplay" 
                        name="dateDisplay" 
                        defaultValue={event.dateDisplay || ""} 
                        placeholder="04 Sep"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="datesDescription">Date Description</Label>
                      <Input 
                        id="datesDescription" 
                        name="datesDescription" 
                        defaultValue={event.datesDescription || ""} 
                        placeholder="Sunday, August 31 · 10:00 pm - 2:00 am"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venueId">Venue *</Label>
                    <Select name="venueId" defaultValue={event.venueId.toString()}>
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image URL *</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      defaultValue={event.image} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketUrl">Ticket URL</Label>
                    <Input 
                      id="ticketUrl" 
                      name="ticketUrl" 
                      defaultValue={event.ticketUrl || ""} 
                      placeholder="https://tickets.example.com/event"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                      Save Changes
                    </Button>
                    <Link href="/admin">
                      <Button variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Image</CardTitle>
                <CardDescription>Preview of the event poster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/50 border-2 border-dashed border-muted-foreground/20">
                      <Calendar className="h-10 w-10 mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Image</span>
                      <span className="text-xs mt-1 opacity-70">Upload an event poster</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Artists</CardTitle>
                <CardDescription>Artists performing at this event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {event.artists.length > 0 ? (
                    event.artists.map((artist, index) => (
                      <div key={artist.id} className="text-sm">
                        <span className="font-medium">{index + 1}. </span>
                        {artist.name}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No artists assigned</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteEventForm eventId={event.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}