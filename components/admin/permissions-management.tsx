"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2, Save, X, Lock, CheckCircle, ChevronDown, ChevronRight } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export function PermissionsManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "view_dashboard",
      description: "View main dashboard",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "2",
      name: "create_proposal",
      description: "Create new proposals",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "3",
      name: "edit_proposal",
      description: "Edit existing proposals",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "4",
      name: "delete_proposal",
      description: "Delete proposals",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "5",
      name: "view_reports",
      description: "View sales reports",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "6",
      name: "manage_users",
      description: "Manage user accounts",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "7",
      name: "manage_roles",
      description: "Manage roles and permissions",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "8",
      name: "view_customer_data",
      description: "View customer data",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "9",
      name: "edit_customer_data",
      description: "Edit customer data",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
    {
      id: "10",
      name: "run_simulation",
      description: "Run digital twin simulations",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingPermission, setIsAddingPermission] = useState(false)
  const [editingPermissionId, setEditingPermissionId] = useState<string | null>(null)
  const [newPermission, setNewPermission] = useState({ name: "", description: "" })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPermission = () => {
    setIsAddingPermission(true)
    setNewPermission({ name: "", description: "" })
  }

  const handleEditPermission = (permission: Permission) => {
    setEditingPermissionId(permission.id)
    setNewPermission({ name: permission.name, description: permission.description })
  }

  const handleSavePermission = () => {
    if (editingPermissionId) {
      // Update existing permission
      setPermissions(
        permissions.map((permission) =>
          permission.id === editingPermissionId
            ? {
                ...permission,
                name: newPermission.name,
                description: newPermission.description,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : permission,
        ),
      )
      setSuccessMessage(`Permission "${newPermission.name}" updated successfully`)
    } else {
      // Add new permission
      const newId = (permissions.length + 1).toString()
      const today = new Date().toISOString().split("T")[0]

      setPermissions([
        ...permissions,
        {
          id: newId,
          name: newPermission.name,
          description: newPermission.description,
          createdAt: today,
          updatedAt: today,
        },
      ])
      setSuccessMessage(`Permission "${newPermission.name}" created successfully`)
    }

    setIsAddingPermission(false)
    setEditingPermissionId(null)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleDeletePermission = (id: string) => {
    const permissionToDelete = permissions.find((permission) => permission.id === id)
    setPermissions(permissions.filter((permission) => permission.id !== id))
    setSuccessMessage(`Permission "${permissionToDelete?.name}" deleted successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleCancel = () => {
    setIsAddingPermission(false)
    setEditingPermissionId(null)
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Lock className="h-5 w-5 text-blue-400 mr-2" />
          Permission Management
        </h2>
        <Button
          onClick={handleAddPermission}
          className="bg-blue-700 hover:bg-blue-600"
          disabled={isAddingPermission || editingPermissionId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Permission
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
              This screen allows you to create and manage permissions in the system. Permissions define specific actions
              that can be performed within the application.
            </p>

            <p className="mb-1 font-medium">How to use this screen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Click "Create New Permission" to add a new permission to the system</li>
              <li>Use the search box to find existing permissions</li>
              <li>Click the edit icon to modify a permission's name or description</li>
              <li>Click the delete icon to remove a permission</li>
              <li>After creating permissions, assign them to roles in the "Assign Role Permissions" screen</li>
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

      {(isAddingPermission || editingPermissionId !== null) && (
        <div className="mb-4 bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
          <h3 className="text-md font-medium mb-3">
            {editingPermissionId ? "Edit Permission" : "Create New Permission"}
          </h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Permission Name</label>
              <Input
                value={newPermission.name}
                onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                placeholder="Enter permission name"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
              <Input
                value={newPermission.description}
                onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                placeholder="Enter permission description"
                className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSavePermission}
              className="bg-blue-700 hover:bg-blue-600"
              disabled={!newPermission.name.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              {editingPermissionId ? "Update Permission" : "Save Permission"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search permissions..."
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
              <TableHead className="text-blue-200 font-medium">Permission Name</TableHead>
              <TableHead className="text-blue-200 font-medium">Description</TableHead>
              <TableHead className="text-blue-200 font-medium">Created</TableHead>
              <TableHead className="text-blue-200 font-medium">Last Updated</TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission) => (
              <TableRow key={permission.id} className="hover:bg-blue-900/20">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-blue-400 mr-2" />
                    {permission.name}
                  </div>
                </TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell>{permission.createdAt}</TableCell>
                <TableCell>{permission.updatedAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-blue-900/30"
                      onClick={() => handleEditPermission(permission)}
                      disabled={isAddingPermission || editingPermissionId !== null}
                    >
                      <Edit className="h-3.5 w-3.5 text-blue-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-red-900/30"
                      onClick={() => handleDeletePermission(permission.id)}
                      disabled={isAddingPermission || editingPermissionId !== null}
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
          {filteredPermissions.length} permissions • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
