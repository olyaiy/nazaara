import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Settings, Plus, ExternalLink, UserCheck, Shield } from "lucide-react"
import { getAdminEvents, getAdminArtists, getAdminVenues } from "@/lib/admin-actions"
import Link from "next/link"
import { SuccessToast } from "@/components/admin/success-toast"
import { ArtistImage } from "@/components/admin/artist-image"
import { VenueImage } from "@/components/admin/venue-image"
import { UserManagement } from "@/components/admin/user-management"

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

    // Check if user has admin role
    const isAdmin = session.user.role === "admin"

    // Fetch all admin data in parallel for optimal performance
    const [events, artists, venues] = await Promise.all([
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
                        
                        <div className="grid gap-2">
                            {artists.map((artist, index) => (
                                <Link key={artist.id} href={`/admin/artists/${artist.slug}`}>
                                    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[--gold]/5 transition-colors cursor-pointer">
                                        {/* Artist Image */}
                                        <div className="w-14 h-14 bg-muted flex-shrink-0 rounded-full overflow-hidden">
                                            <ArtistImage src={artist.image} alt={artist.name} />
                                        </div>
                                        {/* Artist Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-foreground group-hover:text-[--gold] transition-colors">
                                                {artist.name}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                {artist.instagram && (
                                                    <span className="text-xs text-muted-foreground">@{artist.instagram}</span>
                                                )}
                                                {artist.soundcloud && (
                                                    <span className="text-xs text-muted-foreground">SoundCloud</span>
                                                )}
                                            </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    {index < artists.length - 1 && (
                                        <div className="border-b border-border/50 ml-[74px]" />
                                    )}
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
                        
                        <div className="divide-y divide-border/50">
                            {venues.map((venue) => (
                                <Link key={venue.id} href={`/admin/venues/${venue.slug}`}>
                                    <div className="group py-4 px-2 hover:bg-[--gold]/5 rounded-lg transition-colors cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            {/* Venue Image */}
                                            <div className="w-20 h-20 bg-muted flex-shrink-0 rounded-lg overflow-hidden">
                                                <VenueImage 
                                                    src={venue.images?.[0]} 
                                                    alt={venue.name} 
                                                />
                                            </div>
                                            {/* Venue Info */}
                                            <div className="flex-1">
                                                <h3 className="font-medium text-foreground group-hover:text-[--gold] transition-colors">
                                                    {venue.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {venue.city}, {venue.country}
                                                    {venue.address && <span className="ml-2">• {venue.address}</span>}
                                                </p>
                                                {venue.description && (
                                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                                                        {venue.description}
                                                    </p>
                                                )}
                                            </div>
                                            <MapPin className="h-4 w-4 text-muted-foreground ml-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
                            <p className="text-muted-foreground">Account information and system management</p>
                        </div>
                        
                        <div className="grid gap-6 max-w-4xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <UserCheck className="h-5 w-5" />
                                        Current User
                                    </CardTitle>
                                    <CardDescription>Your account information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-muted-foreground">Name</div>
                                            <div className="text-base text-foreground">{session.user.name || "Not set"}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-muted-foreground">Email</div>
                                            <div className="text-base text-foreground">{session.user.email}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-muted-foreground">Role</div>
                                            <div className="text-base text-foreground flex items-center gap-2">
                                                {session.user.role === "admin" && <Shield className="h-4 w-4 text-[--gold]" />}
                                                {session.user.role || "user"}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-muted-foreground">User ID</div>
                                            <div className="text-sm font-mono text-muted-foreground">{session.user.id}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {isAdmin && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Shield className="h-5 w-5" />
                                            User Management
                                        </CardTitle>
                                        <CardDescription>Manage users, roles, and permissions</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <UserManagement />
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
                
            </div>
        </div>
    );
}
