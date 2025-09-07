import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, MapPin, Calendar } from "lucide-react"
import { getVenueById, updateVenue, deleteVenue } from "@/lib/admin-actions"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

function DeleteVenueForm({ venueId, eventCount }: { venueId: number; eventCount: number }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
      {eventCount > 0 ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            This venue cannot be deleted because it has {eventCount} associated event{eventCount !== 1 ? 's' : ''}.
            Please reassign or delete these events first.
          </p>
        </div>
      ) : (
        <form action={deleteVenue}>
          <input type="hidden" name="venueId" value={venueId} />
          <Button
            type="submit"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Venue
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            This action cannot be undone. The venue will be permanently deleted.
          </p>
        </form>
      )}
    </div>
  )
}

export default async function VenueEditPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  const { id } = await params
  
  if (!id || isNaN(parseInt(id))) {
    redirect("/admin")
  }

  const venue = await getVenueById(parseInt(id))

  if (!venue) {
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
                  Edit Venue
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {venue.name} • {venue.city}, {venue.country}
                </p>
              </div>
            </div>
            
            {/* Event Count Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {venue.eventCount} Event{venue.eventCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form action={updateVenue} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <input type="hidden" name="venueId" value={venue.id} />
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Venue Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={venue.name} 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      defaultValue={venue.description || ""} 
                      rows={3}
                      placeholder="A brief description of the venue"
                      className="bg-background resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Location</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        defaultValue={venue.city} 
                        required 
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input 
                        id="country" 
                        name="country" 
                        defaultValue={venue.country} 
                        required 
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      defaultValue={venue.address || ""} 
                      placeholder="123 Main Street"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressUrl">Directions URL</Label>
                    <Input 
                      id="addressUrl" 
                      name="addressUrl" 
                      defaultValue={venue.addressUrl || ""} 
                      placeholder="https://maps.google.com/..."
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-border">
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
            </form>
            
            {/* Delete Section - Outside the form */}
            <div className="mt-8 pt-8 border-t border-border">
              <DeleteVenueForm venueId={venue.id} eventCount={venue.eventCount} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Venue Info */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Venue Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {venue.city}, {venue.country}
                    </p>
                    {venue.address && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {venue.address}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">Events</p>
                    <p className="text-sm text-muted-foreground">
                      {venue.eventCount} event{venue.eventCount !== 1 ? 's' : ''} scheduled
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Timestamps</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Created</p>
                  <p className="text-foreground">
                    {new Date(venue.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Last Updated</p>
                  <p className="text-foreground">
                    {new Date(venue.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}