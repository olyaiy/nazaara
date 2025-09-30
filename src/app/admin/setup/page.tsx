import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db/drizzle"
import { user } from "@/db/auth-schema"
import { count } from "drizzle-orm"
import { AdminSetupForm } from "@/components/admin/admin-setup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

async function checkIfFirstUser() {
  const userCount = await db.select({ count: count() }).from(user)
  return userCount[0].count === 0
}

export default async function AdminSetupPage() {
  // Check if this is the first user setup
  const isFirstUser = await checkIfFirstUser()
  
  if (!isFirstUser) {
    // If users exist, check if current user is authenticated
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session) {
      redirect("/admin/auth")
    }
    
    // If user exists but not admin, redirect to regular admin
    if (session.user.role !== "admin") {
      redirect("/admin")
    }
    
    // If already admin, redirect to main admin page
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-[--maroon-red] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[--gold]/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[--gold] rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-[--maroon-red]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif text-foreground">
            Setup Admin Account
          </CardTitle>
          <CardDescription>
            Create the first admin user for Nazaara Live
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSetupForm />
        </CardContent>
      </Card>
    </div>
  )
}