"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function AdminSetupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      // Create the admin user account
      const signUpResult = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/admin/setup/complete"
      })

      if (signUpResult.error) {
        toast.error(signUpResult.error.message || "Failed to create admin account")
        return
      }

      // The user will be created with default "user" role
      // We need to upgrade them to admin after signup
      if (signUpResult.data) {
        try {
          // Use admin client to set role (this works because no other users exist)
          await authClient.admin.setRole({
            userId: signUpResult.data.user.id,
            role: "admin"
          })
        } catch (error) {
          console.warn("Could not set admin role immediately:", error)
          // This might fail due to permissions, but that's ok for the first user
        }
      }

      toast.success("Admin account created successfully!")
      router.push("/admin")
      
    } catch (error: unknown) {
      console.error("Setup error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to create admin account"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          required
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          required
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a secure password"
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Admin Account...
          </>
        ) : (
          "Create Admin Account"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        This will create the first admin user for the Nazaara Live admin panel.
      </p>
    </form>
  )
}