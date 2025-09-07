import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"
import { createEvent } from "@/lib/admin-actions"
import { EventDatePicker } from "@/components/admin/event-date-picker"
import { ImageUpload } from "@/components/admin/image-upload"

export default async function NewEventPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  const venues = await getAdminVenues()

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
              Create New Event
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new event to your catalog
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Fill in the information for your new event</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createEvent} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                  placeholder="NAZAARA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  required 
                  placeholder="nazaara-01"
                />
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}