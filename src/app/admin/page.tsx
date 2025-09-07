import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Settings } from "lucide-react"
import { getAdminStats, getAdminEvents, getAdminArtists, getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"

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

                    <TabsContent value="events" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Events</h2>
                                <p className="text-muted-foreground">Manage your events, lineups, and schedules</p>
                            </div>
                            <Link href="/admin/events/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    Add Event
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid gap-4">
                            {events.map((event) => {
                                return (
                                    <Link key={event.id} href={`/admin/events/${event.slug}`}>
                                        <Card className="cursor-pointer hover:bg-accent/5 transition-colors overflow-hidden">
                                            <div className="flex">
                                                <div className="w-32 h-32 bg-muted flex-shrink-0">
                                                    {event.image ? (
                                                        <img 
                                                            src={event.image} 
                                                            alt={event.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted">
                                                            <Calendar className="h-6 w-6 mb-1" />
                                                            <span className="text-xs">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <CardHeader className="pb-3">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <CardTitle className="text-lg">
                                                                    {event.title}
                                                                </CardTitle>
                                                                <CardDescription>
                                                                    {event.tagline} • {event.venueName}
                                                                </CardDescription>
                                                            </div>
                                                            <div className="text-right text-sm text-muted-foreground">
                                                                <div>{event.dateDisplay}</div>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span>Artists: {event.artists.join(", ") || "TBA"}</span>
                                                </div>
                                            </CardContent>
                                                </div>
                                            </div>
                                        </Card>
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
                            <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                Add Artist
                            </Button>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {artists.map((artist) => (
                                <Card key={artist.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{artist.name}</CardTitle>
                                        <CardDescription>
                                            {artist.instagram && `@${artist.instagram}`}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm text-muted-foreground">
                                            {artist.instagram && (
                                                <div>Instagram: {artist.instagram}</div>
                                            )}
                                            {artist.soundcloud && (
                                                <div>SoundCloud: {artist.soundcloud}</div>
                                            )}
                                           
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="venues" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Venues</h2>
                                <p className="text-muted-foreground">Manage venue information and locations</p>
                            </div>
                            <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                Add Venue
                            </Button>
                        </div>
                        
                        <div className="grid gap-4">
                            {venues.map((venue) => (
                                <Card key={venue.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{venue.name}</CardTitle>
                                        <CardDescription>{venue.city}, {venue.country}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            {venue.address && <div>{venue.address}</div>}
                                            {venue.description && <div>{venue.description}</div>}
                                    
                                        </div>
                                    </CardContent>
                                </Card>
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
