import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/db/drizzle"
import { user } from "@/db/auth-schema"
import { count } from "drizzle-orm"
import Link from "next/link"
import { Shield } from "lucide-react"

async function signInAction(formData: FormData) {
  "use server"
  
  console.log("[auth-page] === SIGN IN ACTION START ===");
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  console.log("[auth-page] Email:", email);
  console.log("[auth-page] Password length:", password?.length || 0);
  console.log("[auth-page] Environment:", process.env.NODE_ENV);
  console.log("[auth-page] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
  console.log("[auth-page] BETTER_AUTH_SECRET exists:", !!process.env.BETTER_AUTH_SECRET);
  
  try {
    console.log("[auth-page] Attempting auth.api.signInEmail...");
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    })
    console.log("[auth-page] ✅ Sign in success:", {
      ...result,
      session: result?.user ? 'exists' : 'none'
    });
  } catch (error) {
    console.log("[auth-page] ❌ Sign in error:", error);
    console.log("[auth-page] Error details:", {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
      name: (error as Error)?.name
    });
    throw new Error("Invalid credentials")
  }
  
  console.log("[auth-page] Redirecting to /admin");
  redirect("/admin")
}


async function checkIfFirstUser() {
  console.log("[auth-page] === CHECKING FIRST USER ===");
  try {
    const userCount = await db.select({ count: count() }).from(user);
    console.log("[auth-page] User count result:", userCount);
    const totalUsers = userCount[0].count;
    console.log("[auth-page] Total users in database:", totalUsers);
    const isFirst = totalUsers === 0;
    console.log("[auth-page] Is first user:", isFirst);
    return isFirst;
  } catch (error) {
    console.log("[auth-page] ❌ Error checking first user:", error);
    throw error;
  }
}

export default async function AuthPage() {
  console.log("[auth-page] === AUTH PAGE START ===");
  console.log("[auth-page] Environment:", process.env.NODE_ENV);
  console.log("[auth-page] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
  
  // Check if user is already authenticated
  console.log("[auth-page] === CHECKING EXISTING SESSION ===");
  try {
    const headersList = await headers();
    console.log("[auth-page] Headers:", Object.fromEntries(headersList.entries()));
    
    const session = await auth.api.getSession({
      headers: headersList
    });
    
    console.log("[auth-page] Session check result:", {
      exists: !!session,
      userId: session?.user?.id,
      email: session?.user?.email,
      role: session?.user?.role
    });
    
    if (session) {
      console.log("[auth-page] ✅ User already authenticated, redirecting to /admin");
      redirect("/admin")
    }
    console.log("[auth-page] No existing session found");
  } catch (error) {
    console.log("[auth-page] ❌ Error checking session:", error);
  }

  // Check if this is the first user (no users exist)
  const isFirstUser = await checkIfFirstUser()
  console.log("[auth-page] Is first user setup:", isFirstUser);

  return (
    <div className="min-h-[80dvh] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-serif text-foreground">
            Admin Access
          </h1>
          <p className="text-muted-foreground">
            {isFirstUser ? "Set up your admin account" : "Sign in to continue"}
          </p>
        </div>

        {isFirstUser && (
          <div className="p-4 bg-[--gold]/10 border border-[--gold]/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[--gold]" />
              <span className="font-medium text-foreground">First Time Setup</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              No admin users exist. Create the first admin account to get started.
            </p>
            <Link href="/admin/setup">
              <Button className="w-full bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
                Create First Admin Account
              </Button>
            </Link>
          </div>
        )}

        {!isFirstUser && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Sign In</h2>
            <form action={signInAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Button>
            </form>
            
          </div>
        )}
      </div>
    </div>
  )
}