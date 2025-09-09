import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield } from "lucide-react"
import Link from "next/link"

export default async function AdminSetupCompletePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // If not authenticated, redirect to setup
  if (!session) {
    redirect("/admin/setup")
  }

  return (
    <div className="min-h-screen bg-[--maroon-red] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[--gold]/20 text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif text-foreground">
            Setup Complete!
          </CardTitle>
          <CardDescription>
            Your admin account has been created successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[--gold]" />
              <span className="font-medium">Admin Account Details</span>
            </div>
            <div className="text-sm space-y-1 text-left">
              <div><strong>Name:</strong> {session.user.name}</div>
              <div><strong>Email:</strong> {session.user.email}</div>
              <div><strong>Role:</strong> {session.user.role}</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            You now have full admin access to the Nazaara Live admin panel.
          </div>

          <Link href="/admin">
            <Button className="w-full bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
              Go to Admin Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}