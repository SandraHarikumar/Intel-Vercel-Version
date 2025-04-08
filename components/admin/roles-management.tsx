"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2, Save, X, Shield, CheckCircle, ChevronDown, ChevronRight } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "System Admin",
      description: "Full access to all system features and data",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Sales VP",
      description: "Access to all sales data and reports across regions",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "3",
      name: "Sales Manager",
      description: "Access to sales data and reports for assigned region",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "4",
      name: "Sales Associate",
      description: "Limited access to sales data for assigned customers",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "5",
      name: "Solution Architect",
      description: "Access to technical resources and customer solutions",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingRole, setIsAddingRole] = useState(false)
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null)
  const [newRole, setNewRole] = useState({ name: "", description: "" })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRole = () => {
    setIsAddingRole(true)
    setNewRole({ name: "", description: "" })
  }

  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id)
    setNewRole({ name: role.name, description: role.description })
  }

  const handleSaveRole = () => {
    if (editingRoleId) {
      // Update existing role
      setRoles(
        roles.map((role) =>
          role.id === editingRoleId
            ? {
                ...role,
                name: newRole.name,
                description: newRole.description,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : role,
        ),
      )
      setSuccessMessage(`Role "${newRole.name}" updated successfully`)
    } else {
      // Add new role
      const newId = (roles.length + 1).toString()
      const today = new Date().toISOString().split("T")[0]

      setRoles([
        ...roles,
        {
          id: newId,
          name: newRole.name,
          description: newRole.description,
          createdAt: today,
          updatedAt: today,
        },
      ])
      setSuccessMessage(`Role "${newRole.name}" created successfully`)
    }

    setIsAddingRole(false)
    setEditingRoleId(null)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleDeleteRole = (id: string) => {
    const roleToDelete = roles.find((role) => role.id === id)
    setRoles(roles.filter((role) => role.id !== id))
    setSuccessMessage(`Role "${roleToDelete?.name}" deleted successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleCancel = () => {
    setIsAddingRole(false)
    setEditingRoleId(null)
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 text-blue-400 mr-2" />
          Role Management
        </h2>
        <Button
          onClick={handleAddRole}
          className="bg-blue-700 hover:bg-blue-600"
          disabled={isAddingRole || editingRoleId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Role
        </Button>
      </div>

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
              This screen allows you to create and manage roles in the system. Each role defines a set of permissions
              that can be assigned to users.
            </p>

            <p className="mb-1 font-medium">How to use this screen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Click "Create New Role" to add a new role to the system</li>
              <li>Use the search box to find existing roles</li>
              <li>Click the edit icon to modify a role's name or description</li>
              <li>Click the delete icon to remove a role (System Admin role cannot be deleted)</li>
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

      {(isAddingRole || editingRoleId !== null) && (
        <div className="mb-4 bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
          <h3 className="text-md font-medium mb-3">{editingRoleId ? "Edit Role" : "Create New Role"}</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Role Name</label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Enter role name"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
              <Input
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Enter role description"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveRole} className="bg-blue-700 hover:bg-blue-600" disabled={!newRole.name.trim()}>
              <Save className="h-4 w-4 mr-2" />
              {editingRoleId ? "Update Role" : "Save Role"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search roles..."
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
              <TableHead className="text-blue-200 font-medium">Role Name</TableHead>
              <TableHead className="text-blue-200 font-medium">Description</TableHead>
              <TableHead className="text-blue-200 font-medium">Created</TableHead>
              <TableHead className="text-blue-200 font-medium">Last Updated</TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id} className="hover:bg-blue-900/20">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-blue-400 mr-2" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.createdAt}</TableCell>
                <TableCell>{role.updatedAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-blue-900/30"
                      onClick={() => handleEditRole(role)}
                      disabled={isAddingRole || editingRoleId !== null}
                    >
                      <Edit className="h-3.5 w-3.5 text-blue-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-red-900/30"
                      onClick={() => handleDeleteRole(role.id)}
                      disabled={isAddingRole || editingRoleId !== null || role.name === "System Admin"}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
        <div>
          {filteredRoles.length} roles • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
