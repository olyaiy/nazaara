import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
              Add New Artist
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new artist to your roster
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Artist Details</CardTitle>
            <CardDescription>Fill in the information for your new artist</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createArtist} className="space-y-6">
              
              {/* Basic Information */}
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

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Social Media</h3>
                
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

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Media</h3>
                
                <div className="space-y-2">
                  <Label>Artist Photo</Label>
                  <ImageUpload name="image" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}