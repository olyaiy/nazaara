import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Settings, Plus, UserCheck, Shield, Image as ImageIcon, Headphones } from "lucide-react"
import { getAdminEvents, getAdminArtists, getAdminVenues, getAdminGalleries, getAdminDJs } from "@/lib/admin-actions"
import Link from "next/link"
import { SuccessToast } from "@/components/admin/success-toast"
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings"
import { revalidatePath } from "next/cache"
import { UserManagement } from "@/components/admin/user-management"
import { ArtistsGrid } from "@/components/admin/artists-grid"
import { DJsGrid } from "@/components/admin/djs-grid"
import { VenuesGrid } from "@/components/admin/venues-grid"
import { GalleriesGrid } from "@/components/admin/galleries-grid"
import { EventsGrid } from "@/components/admin/events-grid"

async function signOutAction() {
  "use server"
  
  await auth.api.signOut({
    headers: await headers()
  })
  
  redirect("/admin/auth")
}

async function updateVisibilityAction(formData: FormData) {
  "use server"
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    redirect("/admin/auth")
  }
  const hideAbout = formData.get("hideAbout") === "on" || formData.get("hideAbout") === "true";
  const hideBookings = formData.get("hideBookings") === "on" || formData.get("hideBookings") === "true";
  await updateSiteSettings({ hideAbout, hideBookings })
  revalidatePath("/", "layout")
  revalidatePath("/about")
  revalidatePath("/bookings")
  revalidatePath("/admin")
  redirect("/admin?tab=settings&success=visibility-updated")
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
    const [events, artists, djs, venues, galleries, siteSettings] = await Promise.all([
        getAdminEvents(),
        getAdminArtists(),
        getAdminDJs(),
        getAdminVenues(),
        getAdminGalleries(),
        getSiteSettings()
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
                    <div className="-mx-2 mb-8 overflow-x-auto px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <TabsList className="min-w-max gap-2">
                            <TabsTrigger value="events" className="flex items-center gap-2 flex-none sm:flex-1">
                            <Calendar className="h-4 w-4" />
                            Events
                            </TabsTrigger>
                            <TabsTrigger value="artists" className="flex items-center gap-2 flex-none sm:flex-1">
                            <Users className="h-4 w-4" />
                            Artists
                            </TabsTrigger>
                            <TabsTrigger value="djs" className="flex items-center gap-2 flex-none sm:flex-1">
                            <Headphones className="h-4 w-4" />
                            DJs
                            </TabsTrigger>
                            <TabsTrigger value="venues" className="flex items-center gap-2 flex-none sm:flex-1">
                            <MapPin className="h-4 w-4" />
                            Venues
                            </TabsTrigger>
                            <TabsTrigger value="galleries" className="flex items-center gap-2 flex-none sm:flex-1">
                            <ImageIcon className="h-4 w-4" />
                            Galleries
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2 flex-none sm:flex-1">
                            <Settings className="h-4 w-4" />
                            Settings
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="events" className="space-y-6">
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
                        
                        <EventsGrid events={events} />
                    </TabsContent>

                    <TabsContent value="artists" className="space-y-6">
                        <div className="flex justify-between items-center pb-6 border-b border-border">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Artists</h2>
                                <p className="text-muted-foreground mt-1">Manage artist profiles and social links</p>
                            </div>
                            <Link href="/admin/artists/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Artist
                                </Button>
                            </Link>
                        </div>
                        
                        <ArtistsGrid artists={artists} />
                    </TabsContent>

                    <TabsContent value="djs" className="space-y-6">
                        <div className="flex justify-between items-center pb-6 border-b border-border">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">DJs</h2>
                                <p className="text-muted-foreground mt-1">Manage internal DJ roster for bookings page</p>
                            </div>
                            <Link href="/admin/djs/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add DJ
                                </Button>
                            </Link>
                        </div>
                        
                        <DJsGrid djs={djs} />
                    </TabsContent>

                    <TabsContent value="venues" className="space-y-6">
                        <div className="flex justify-between items-center pb-6 border-b border-border">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Venues</h2>
                                <p className="text-muted-foreground mt-1">Manage venue information and locations</p>
                            </div>
                            <Link href="/admin/venues/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Venue
                                </Button>
                            </Link>
                        </div>
                        
                        <VenuesGrid venues={venues} />
                    </TabsContent>

                    <TabsContent value="galleries" className="space-y-6">
                        <div className="flex justify-between items-center pb-6 border-b border-border">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Galleries</h2>
                                <p className="text-muted-foreground mt-1">Manage photo galleries and collections</p>
                            </div>
                            <Link href="/admin/galleries/new">
                                <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Gallery
                                </Button>
                            </Link>
                        </div>
                        
                        <GalleriesGrid galleries={galleries} />
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
                            <p className="text-muted-foreground">Account information and system management</p>
                        </div>
                        
                        <div className="grid gap-6 max-w-4xl">
                            {isAdmin && (
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Site Visibility
                                  </CardTitle>
                                  <CardDescription>Toggle visibility of public pages</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <form action={updateVisibilityAction} className="space-y-6">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-sm font-medium text-foreground">Hide About Page</div>
                                        <div className="text-sm text-muted-foreground">Removes About from navigation and redirects /about</div>
                                      </div>
                                      <input name="hideAbout" type="checkbox" defaultChecked={siteSettings.hideAbout} className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-sm font-medium text-foreground">Hide Bookings Page</div>
                                        <div className="text-sm text-muted-foreground">Removes Bookings from navigation and redirects /bookings</div>
                                      </div>
                                      <input name="hideBookings" type="checkbox" defaultChecked={siteSettings.hideBookings} className="h-5 w-5" />
                                    </div>
                                    <div className="pt-2">
                                      <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">Save</Button>
                                    </div>
                                  </form>
                                </CardContent>
                              </Card>
                            )}
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
