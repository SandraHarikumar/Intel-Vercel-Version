"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// Add the import for ChevronDown and ChevronRight
import {
  Search,
  Edit,
  Save,
  X,
  Users,
  Shield,
  CheckCircle,
  User,
  Plus,
  Building,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface UserRole {
  userId: string
  userName: string
  email: string
  department: string
  role: string
  assignedAt: string
}

export function UserRolesManagement() {
  const [userRoles, setUserRoles] = useState<UserRole[]>([
    {
      userId: "1",
      userName: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      role: "System Admin",
      assignedAt: "2023-01-15",
    },
    {
      userId: "2",
      userName: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Sales",
      role: "Sales Manager",
      assignedAt: "2023-01-15",
    },
    {
      userId: "3",
      userName: "Michael Brown",
      email: "michael.brown@company.com",
      department: "Marketing",
      role: "Marketing Analyst",
      assignedAt: "2023-01-15",
    },
    {
      userId: "4",
      userName: "Emily Davis",
      email: "emily.davis@company.com",
      department: "Finance",
      role: "Finance Manager",
      assignedAt: "2023-01-15",
    },
    {
      userId: "5",
      userName: "David Wilson",
      email: "david.wilson@company.com",
      department: "IT",
      role: "System Admin",
      assignedAt: "2023-01-15",
    },
    {
      userId: "6",
      userName: "Jennifer Taylor",
      email: "jennifer.taylor@company.com",
      department: "HR",
      role: "HR Manager",
      assignedAt: "2023-01-15",
    },
    {
      userId: "7",
      userName: "Robert Martinez",
      email: "robert.martinez@company.com",
      department: "Engineering",
      role: "Data Engineer",
      assignedAt: "2023-01-15",
    },
    {
      userId: "8",
      userName: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      department: "Product",
      role: "Product Manager",
      assignedAt: "2023-01-15",
    },
    {
      userId: "9",
      userName: "James Thomas",
      email: "james.thomas@company.com",
      department: "Sales",
      role: "Sales VP",
      assignedAt: "2023-01-15",
    },
  ])

  const availableRoles = [
    "System Admin",
    "Sales VP",
    "Sales Manager",
    "Sales Associate",
    "Solution Architect",
    "Marketing Analyst",
    "Finance Manager",
    "HR Manager",
    "Data Engineer",
    "Product Manager",
  ]

  const departments = [
    "Engineering",
    "Sales",
    "Marketing",
    "Finance",
    "IT",
    "HR",
    "Product",
    "Operations",
    "Legal",
    "Customer Support",
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    department: "",
    role: "",
  })

  // Add the state for controlling the help section visibility
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const filteredUserRoles = userRoles.filter(
    (userRole) =>
      userRole.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userRole.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userRole.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userRole.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUserRole = (userRole: UserRole) => {
    setEditingUserId(userRole.userId)
    setSelectedRole(userRole.role)
  }

  const handleSaveUserRole = () => {
    if (editingUserId) {
      // Update existing user role
      const userToUpdate = userRoles.find((user) => user.userId === editingUserId)

      setUserRoles(
        userRoles.map((userRole) =>
          userRole.userId === editingUserId
            ? {
                ...userRole,
                role: selectedRole,
                assignedAt: new Date().toISOString().split("T")[0],
              }
            : userRole,
        ),
      )

      setSuccessMessage(`Role for ${userToUpdate?.userName} updated to "${selectedRole}" successfully`)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }

    setEditingUserId(null)
  }

  const handleAddUser = () => {
    setIsAddingUser(true)
    setNewUser({
      userName: "",
      email: "",
      department: "",
      role: "",
    })
  }

  const handleSaveNewUser = () => {
    // Validate form
    if (!newUser.userName || !newUser.email || !newUser.department || !newUser.role) {
      return
    }

    // Generate new user ID
    const newUserId = (Math.max(...userRoles.map((user) => Number.parseInt(user.userId))) + 1).toString()

    // Add new user
    const today = new Date().toISOString().split("T")[0]
    const userToAdd = {
      userId: newUserId,
      userName: newUser.userName,
      email: newUser.email,
      department: newUser.department,
      role: newUser.role,
      assignedAt: today,
    }

    setUserRoles([...userRoles, userToAdd])

    setSuccessMessage(`User "${newUser.userName}" added with role "${newUser.role}" successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    setIsAddingUser(false)
  }

  const handleCancel = () => {
    setEditingUserId(null)
    setIsAddingUser(false)
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Users className="h-5 w-5 text-blue-400 mr-2" />
          Assign User Roles
        </h2>
        <Button
          onClick={handleAddUser}
          className="bg-blue-700 hover:bg-blue-600"
          disabled={isAddingUser || editingUserId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Replace the instructional text div with this collapsible version: */}
      <div className="text-xs bg-blue-900/30 rounded-md mb-4 overflow-hidden">
        <button
          onClick={() => setIsHelpExpanded(!isHelpExpanded)}
          className="w-full p-2 text-left flex justify-between items-center font-medium text-blue-200"
        >
          <span>Screen Instructions</span>
          {isHelpExpanded ? (
            <ChevronDown className="h-4 w-4 text-blue-300" />
          ) : (
            <ChevronRight className="h-4 w-4 text-blue-300" />
          )}
        </button>

        {isHelpExpanded && (
          <div className="p-2 pt-0 border-t border-blue-800/30">
            <p className="mb-1 font-medium">What is this screen for?</p>
            <p className="mb-2">
              This screen allows you to assign roles to users in the system. Each user can have only one role which
              determines their permissions.
            </p>

            <p className="mb-1 font-medium">How to use this screen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Click "Add New User" to add a user and assign them a role</li>
              <li>Use the search box to find existing users by name, email, role, or department</li>
              <li>Click the edit icon to change a user's assigned role</li>
              <li>The role determines what permissions the user has in the system</li>
            </ul>
          </div>
        )}
      </div>

      {showSuccessMessage && (
        <div className="mb-4 bg-green-900/20 border border-green-700/30 rounded-md p-3 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>{successMessage}</span>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShowSuccessMessage(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isAddingUser && (
        <div className="mb-4 bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
          <h3 className="text-md font-medium mb-3 flex items-center">
            <User className="h-4 w-4 text-blue-400 mr-2" />
            Add New User
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">User Name</label>
              <Input
                value={newUser.userName}
                onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                placeholder="Enter user name"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
              <Input
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Department</label>
              <select
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSaveNewUser}
              className="bg-blue-700 hover:bg-blue-600"
              disabled={!newUser.userName || !newUser.email || !newUser.department || !newUser.role}
            >
              <Save className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name, email, role, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-blue-950/30 border-blue-800/50 h-8 text-sm"
          />
        </div>
      </div>

      <div className="rounded-md border border-blue-900/50 overflow-hidden bg-gradient-to-b from-blue-950/30 to-black/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-900/40 hover:bg-blue-900/50">
              <TableHead className="text-blue-200 font-medium">User</TableHead>
              <TableHead className="text-blue-200 font-medium">Email</TableHead>
              <TableHead className="text-blue-200 font-medium">Department</TableHead>
              <TableHead className="text-blue-200 font-medium">Role</TableHead>
              <TableHead className="text-blue-200 font-medium">Assigned Date</TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserRoles.map((userRole) => (
              <TableRow key={userRole.userId} className="hover:bg-blue-900/20">
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 text-blue-300">
                      {userRole.userName.charAt(0)}
                    </div>
                    {userRole.userName}
                  </div>
                </TableCell>
                <TableCell>{userRole.email}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-blue-400 mr-2" />
                    {userRole.department}
                  </div>
                </TableCell>
                <TableCell>
                  {editingUserId === userRole.userId ? (
                    <select
                      className="w-full bg-blue-900/30 border border-blue-800/50 rounded-md h-8 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-blue-400 mr-2" />
                      {userRole.role}
                    </div>
                  )}
                </TableCell>
                <TableCell>{userRole.assignedAt}</TableCell>
                <TableCell>
                  {editingUserId === userRole.userId ? (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-green-900/30"
                        onClick={handleSaveUserRole}
                      >
                        <Save className="h-3.5 w-3.5 text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-900/30"
                        onClick={handleCancel}
                      >
                        <X className="h-3.5 w-3.5 text-red-400" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-blue-900/30"
                      onClick={() => handleEditUserRole(userRole)}
                      disabled={editingUserId !== null || isAddingUser}
                    >
                      <Edit className="h-3.5 w-3.5 text-blue-400" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
        <div>
          {filteredUserRoles.length} users • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
