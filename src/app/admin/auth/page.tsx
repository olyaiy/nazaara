import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function signInAction(formData: FormData) {
  "use server"
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    })
  } catch (error) {
    throw new Error("Invalid credentials")
  }
  
  redirect("/admin")
}

async function signUpAction(formData: FormData) {
  "use server"
  
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  
  console.log("Sign up attempt:", { name, email, passwordLength: password?.length })
  
  if (password !== confirmPassword) {
    console.error("Password mismatch")
    throw new Error("Passwords do not match")
  }
  
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      }
    })
    console.log("Sign up successful:", result)
  } catch (error) {
    console.error("Sign up error:", error)
    // Get more detailed error information
    if (error instanceof Error) {
      throw new Error(`Failed to create account: ${error.message}`)
    }
    throw new Error("Failed to create account - unknown error")
  }
  
  redirect("/admin")
}

export default async function AuthPage() {
  // Check if user is already authenticated
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-serif text-foreground">
            Admin Access
          </h1>
          <p className="text-muted-foreground">
            Choose an option to continue
          </p>
        </div>

        <div className="space-y-6">
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

          <div className="border-t border-border pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
              <form action={signUpAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-accent/10"
                >
                  Create Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}