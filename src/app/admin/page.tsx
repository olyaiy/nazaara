import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

async function signOutAction() {
  "use server"
  
  await auth.api.signOut({
    headers: await headers()
  })
  
  redirect("/admin/auth")
}

export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/admin/auth")
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
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
                
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-card-foreground mb-4">
                            User Information
                        </h2>
                        <div className="space-y-2">
                            <p className="text-card-foreground">
                                <span className="font-medium">Name:</span> {session.user.name}
                            </p>
                            <p className="text-card-foreground">
                                <span className="font-medium">Email:</span> {session.user.email}
                            </p>
                            <p className="text-card-foreground">
                                <span className="font-medium">User ID:</span> {session.user.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
