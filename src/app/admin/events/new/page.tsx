import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { getAdminVenues, getAdminArtists } from "@/lib/admin-actions"
import Link from "next/link"
import { EventForm } from "@/components/admin/event-form"

export default async function NewEventPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  const [venues, artists] = await Promise.all([
    getAdminVenues(),
    getAdminArtists()
  ])

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
            <EventForm venues={venues} artists={artists} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}