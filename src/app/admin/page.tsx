import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Settings, Plus, ExternalLink } from "lucide-react"
import { getAdminStats, getAdminEvents, getAdminArtists, getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"
import { SuccessToast } from "@/components/admin/success-toast"

async function signOutAction() {
  "use server"
  
  await auth.api.signOut({
    headers: await headers()
  })
  
  redirect("/admin/auth")
}

export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/admin/auth")
    }

    // Fetch all admin data in parallel for optimal performance
    const [stats, events, artists, venues] = await Promise.all([
        getAdminStats(),
        getAdminEvents(),
        getAdminArtists(),
        getAdminVenues()
    ])

    return (
        <div className="min-h-screen bg-background p-8">
            <SuccessToast />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground font-serif">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back, {session.user.name}
                        </p>
                    </div>
                    <form action={signOutAction}>
                        <Button 
                            type="submit"
                            variant="outline"
                            className="border-border text-foreground hover:bg-accent/10"
                        >
                            Sign Out
                        </Button>
                    </form>
                </div>
                
                <Tabs defaultValue="events" className="w-full">
                    <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
                        <TabsTrigger value="events" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Events
                        </TabsTrigger>
                        <TabsTrigger value="artists" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Artists
                        </TabsTrigger>
                        <TabsTrigger value="venues" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Venues
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="events" className="space-y-8">
                        <div className="flex justify-between items-center pb-6 border-b border-border">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Events</h2>
                                <p className="text-muted-foreground mt-1">Manage your events, lineups, and schedules</p>
                            </div>
                            <Link href="/admin/events/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Event
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Grid Layout - Similar to upcoming-events */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => {
                                const startDate = new Date(event.startTime);
                                const day = startDate.getDate();
                                const month = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                                
                                return (
                                    <Link key={event.id} href={`/admin/events/${event.slug}`}>
                                        <div className="group cursor-pointer relative">
                                            <div className="relative">
                                                {/* Event Poster */}
                                                <div className="relative aspect-[3/4] bg-muted overflow-hidden rounded-lg">
                                                    {event.image && event.image.startsWith('http') ? (
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted">
                                                            <Calendar className="h-12 w-12 mb-2" />
                                                            <span className="text-sm">No Image</span>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                    
                                                    {/* Date Badge */}
                                                    <div className="absolute -top-2 -right-2 w-14 h-14 bg-[--gold] flex flex-col items-center justify-center rounded">
                                                        <p className="text-lg font-bold text-[--maroon-red]">
                                                            {day}
                                                        </p>
                                                        <p className="text-[8px] uppercase tracking-wider text-[--maroon-red]">
                                                            {month}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Status Badge */}
                                                    {!event.isPublished && (
                                                        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500/90 text-black text-xs font-medium rounded">
                                                            DRAFT
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Event Info */}
                                                <div className="pt-4">
                                                    <h3 className="font-semibold text-lg text-foreground group-hover:text-[--gold] transition-colors duration-300">
                                                        {event.title}
                                                    </h3>
                                                    {event.tagline && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {event.tagline}
                                                        </p>
                                                    )}
                                                    
                                                    <div className="mt-3 space-y-1">
                                                        <p className="text-sm text-foreground">
                                                            {event.venueName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {event.artists.join(", ") || "No artists assigned"}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="mt-4 flex items-center justify-between">
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(event.startTime).toLocaleDateString('en-US', { 
                                                                weekday: 'short',
                                                                month: 'short', 
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-[--gold]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="artists" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Artists</h2>
                                <p className="text-muted-foreground">Manage artist profiles and social links</p>
                            </div>
                            <Link href="/admin/artists/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Artist
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {artists.map((artist) => (
                                <Link key={artist.id} href={`/admin/artists/${artist.slug}`}>
                                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden">
                                        <div className="flex">
                                            {/* Artist Image */}
                                            <div className="w-24 h-24 bg-muted flex-shrink-0">
                                                {artist.image ? (
                                                    <img 
                                                        src={artist.image} 
                                                        alt={artist.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                        <Users className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>
                                            {/* Artist Info */}
                                            <div className="flex-1 p-4">
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold text-foreground">{artist.name}</h3>
                                                    {artist.instagram && (
                                                        <p className="text-xs text-muted-foreground">@{artist.instagram}</p>
                                                    )}
                                                    {artist.soundcloud && (
                                                        <p className="text-xs text-muted-foreground">SoundCloud: {artist.soundcloud}</p>
                                                    )}
                                                    <div className="pt-2 flex items-center justify-between">
                                                        <span className="text-xs text-muted-foreground">{artist.eventCount} events</span>
                                                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="venues" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Venues</h2>
                                <p className="text-muted-foreground">Manage venue information and locations</p>
                            </div>
                            <Link href="/admin/venues/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Venue
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid gap-4">
                            {venues.map((venue) => (
                                <Link key={venue.id} href={`/admin/venues/${venue.slug}`}>
                                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                                        <CardHeader>
                                            <CardTitle className="text-lg">{venue.name}</CardTitle>
                                            <CardDescription>{venue.city}, {venue.country}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                {venue.address && <div>{venue.address}</div>}
                                                {venue.description && <div className="line-clamp-2">{venue.description}</div>}
                                                <div className="pt-2 flex items-center justify-between">
                                                    <span className="text-xs">{venue.eventCount} events</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
                            <p className="text-muted-foreground">Manage site configuration and preferences</p>
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Site Configuration</CardTitle>
                                    <CardDescription>General site settings and metadata</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm">
                                        <div className="font-medium">Site Title</div>
                                        <div className="text-muted-foreground">Nazaara Live - Premium South Asian Events</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Default Currency</div>
                                        <div className="text-muted-foreground">CAD</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Featured Events Limit</div>
                                        <div className="text-muted-foreground">6 events</div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Media & Assets</CardTitle>
                                    <CardDescription>Image hosting and media management</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm">
                                        <div className="font-medium">Image Storage</div>
                                        <div className="text-muted-foreground">Cloudinary (connected)</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Gallery Link</div>
                                        <div className="text-muted-foreground">Adobe Lightroom</div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Authentication</CardTitle>
                                    <CardDescription>User and session management</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm">
                                        <div className="font-medium">Current User</div>
                                        <div className="text-muted-foreground">{session.user.name}</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Session Timeout</div>
                                        <div className="text-muted-foreground">7 days</div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Database</CardTitle>
                                    <CardDescription>Database status and statistics</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm">
                                        <div className="font-medium">Total Events</div>
                                        <div className="text-muted-foreground">{stats.totalEvents} events</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Total Artists</div>
                                        <div className="text-muted-foreground">{stats.totalArtists} artists</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Total Venues</div>
                                        <div className="text-muted-foreground">{stats.totalVenues} venues</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
                
            </div>
        </div>
    );
}
