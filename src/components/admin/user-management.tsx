"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authClient } from "@/lib/auth-client"
import { Users, Plus, Ban, UserX, Eye, RefreshCw, Shield, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: string
  banned: boolean
  banReason?: string
  banExpires?: string
  createdAt: string
  emailVerified: boolean
}

interface UserSession {
  id: string
  token: string
  createdAt: string
  ipAddress?: string
  userAgent?: string
  impersonatedBy?: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userSessions, setUserSessions] = useState<UserSession[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)
  
  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  const pageSize = 10

  async function loadUsers() {
    setLoading(true)
    try {
      const response = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset: currentPage * pageSize,
          searchValue: searchTerm || undefined,
          searchField: "email",
          searchOperator: "contains",
          filterField: roleFilter !== "all" ? "role" : undefined,
          filterValue: roleFilter !== "all" ? roleFilter : undefined,
          filterOperator: "eq"
        }
      })
      
      if (response.data) {
        setUsers(response.data.users)
        setTotalUsers(response.data.total)
      }
    } catch (error) {
      toast.error("Failed to load users")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function createUser() {
    if (!createForm.name || !createForm.email || !createForm.password) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await authClient.admin.createUser({
        name: createForm.name,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
        data: {}
      })
      
      toast.success("User created successfully")
      setCreateForm({ name: "", email: "", password: "", role: "user" })
      setIsCreateUserOpen(false)
      loadUsers()
    } catch (error) {
      toast.error("Failed to create user")
      console.error(error)
    }
  }

  async function setUserRole(userId: string, role: string) {
    try {
      await authClient.admin.setRole({
        userId,
        role
      })
      toast.success("User role updated successfully")
      loadUsers()
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, role })
      }
    } catch (error) {
      toast.error("Failed to update user role")
      console.error(error)
    }
  }

  async function banUser(userId: string, reason: string) {
    try {
      await authClient.admin.banUser({
        userId,
        banReason: reason
      })
      toast.success("User banned successfully")
      loadUsers()
    } catch (error) {
      toast.error("Failed to ban user")
      console.error(error)
    }
  }

  async function unbanUser(userId: string) {
    try {
      await authClient.admin.unbanUser({
        userId
      })
      toast.success("User unbanned successfully")
      loadUsers()
    } catch (error) {
      toast.error("Failed to unban user")
      console.error(error)
    }
  }

  async function impersonateUser(userId: string) {
    try {
      await authClient.admin.impersonateUser({
        userId
      })
      toast.success("Now impersonating user")
      // Refresh the page to update session
      window.location.reload()
    } catch (error) {
      toast.error("Failed to impersonate user")
      console.error(error)
    }
  }

  async function loadUserSessions(userId: string) {
    try {
      const response = await authClient.admin.listUserSessions({
        userId
      })
      
      if (response.data) {
        setUserSessions(response.data)
      }
    } catch (error) {
      toast.error("Failed to load user sessions")
      console.error(error)
    }
  }

  async function revokeUserSession(sessionToken: string) {
    try {
      await authClient.admin.revokeUserSession({
        sessionToken
      })
      toast.success("Session revoked successfully")
      if (selectedUser) {
        loadUserSessions(selectedUser.id)
      }
    } catch (error) {
      toast.error("Failed to revoke session")
      console.error(error)
    }
  }

  async function deleteUser(userId: string) {
    try {
      await authClient.admin.removeUser({
        userId
      })
      toast.success("User deleted successfully")
      loadUsers()
      setIsUserDetailsOpen(false)
      setSelectedUser(null)
    } catch (error) {
      toast.error("Failed to delete user")
      console.error(error)
    }
  }

  function openUserDetails(user: User) {
    setSelectedUser(user)
    setIsUserDetailsOpen(true)
    loadUserSessions(user.id)
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, roleFilter, statusFilter])

  const totalPages = Math.ceil(totalUsers / pageSize)
  const filteredUsers = users.filter(user => {
    if (statusFilter === "banned" && !user.banned) return false
    if (statusFilter === "active" && user.banned) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[--gold] text-[--maroon-red] hover:bg-[--gold]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="Enter user's name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="Enter user's email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={createForm.role} onValueChange={(role) => setCreateForm({ ...createForm, role })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createUser}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <>
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:bg-accent/5 transition-colors cursor-pointer" onClick={() => openUserDetails(user)}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                      {user.role}
                    </Badge>
                    {user.banned && (
                      <Badge variant="destructive">
                        <Ban className="h-3 w-3 mr-1" />
                        Banned
                      </Badge>
                    )}
                    {!user.emailVerified && (
                      <Badge variant="outline">Unverified</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="max-w-4xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {selectedUser.name}
                </DialogTitle>
                <DialogDescription>Manage user account and sessions</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>User ID</Label>
                      <div className="font-mono text-sm text-muted-foreground">{selectedUser.id}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div>{selectedUser.email}</div>
                    </div>
                    <div>
                      <Label>Role</Label>
                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedUser.role}
                          onValueChange={(role) => setUserRole(selectedUser.id, role)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <div>
                        {selectedUser.banned ? (
                          <Badge variant="destructive">
                            <Ban className="h-3 w-3 mr-1" />
                            Banned
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Created</Label>
                      <div className="text-sm text-muted-foreground">
                        {new Date(selectedUser.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <Label>Email Verified</Label>
                      <div>
                        {selectedUser.emailVerified ? (
                          <Badge variant="secondary">Verified</Badge>
                        ) : (
                          <Badge variant="outline">Unverified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedUser.banReason && (
                    <div>
                      <Label>Ban Reason</Label>
                      <div className="text-sm text-muted-foreground">{selectedUser.banReason}</div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedUser.banned ? (
                      <Button
                        onClick={() => unbanUser(selectedUser.id)}
                        variant="outline"
                        className="w-full"
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Unban User
                      </Button>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Ban User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to ban {selectedUser.name}? This will prevent them from signing in.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => banUser(selectedUser.id, "Banned by administrator")}
                            >
                              Ban User
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

                    <Button
                      onClick={() => impersonateUser(selectedUser.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Impersonate
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <UserX className="h-4 w-4 mr-2" />
                          Delete User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete {selectedUser.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteUser(selectedUser.id)}
                          >
                            Delete User
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-4">
                  <div className="space-y-2">
                    {userSessions.map((session) => (
                      <Card key={session.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
                            <div className="font-mono text-sm">{session.token.slice(0, 20)}...</div>
                            <div className="text-sm text-muted-foreground">
                              Created: {new Date(session.createdAt).toLocaleString()}
                            </div>
                            {session.ipAddress && (
                              <div className="text-sm text-muted-foreground">IP: {session.ipAddress}</div>
                            )}
                            {session.impersonatedBy && (
                              <Badge variant="outline" className="mt-1">
                                <Eye className="h-3 w-3 mr-1" />
                                Impersonated
                              </Badge>
                            )}
                          </div>
                          <Button
                            onClick={() => revokeUserSession(session.token)}
                            variant="destructive"
                            size="sm"
                          >
                            Revoke
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    {userSessions.length === 0 && (
                      <div className="text-center text-muted-foreground py-4">
                        No active sessions
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}