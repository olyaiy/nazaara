import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Instagram, Cloud } from "lucide-react"
import Link from "next/link"
import { createArtist } from "@/lib/admin-actions"
import { ImageUpload } from "@/components/admin/image-upload"

export default async function NewArtistPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">
              Add New Artist
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new artist to your roster
            </p>
          </div>
        </div>

        <form action={createArtist}>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Form Fields */}
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Artist Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="DJ Name"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Social Media</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="instagram" 
                        name="instagram" 
                        placeholder="username"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Enter username without @ symbol</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soundcloud">SoundCloud Username</Label>
                    <div className="relative">
                      <Cloud className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="soundcloud" 
                        name="soundcloud" 
                        placeholder="username"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Media */}
            <div className="space-y-8">
              {/* Media */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Media</h2>
                <div className="space-y-2">
                  <Label>Artist Photo</Label>
                  <ImageUpload name="image" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Full Width */}
          <div className="flex gap-4 pt-8 mt-8 border-t border-border">
            <Button type="submit" className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
              Create Artist
            </Button>
            <Link href="/admin">
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}