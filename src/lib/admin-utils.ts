import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

interface SessionUser {
  id: string
  name: string
  email: string
  role?: string
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/admin/auth")
  }

  if (session.user.role !== "admin") {
    throw new Error("Access denied: Admin role required")
  }

  return session.user as SessionUser
}

export async function getAdminSession(): Promise<{ user: SessionUser; isAdmin: boolean } | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return null
    }

    return {
      user: session.user as SessionUser,
      isAdmin: session.user.role === "admin"
    }
  } catch {
    return null
  }
}

export function checkAdminPermission(userRole?: string): boolean {
  return userRole === "admin"
}