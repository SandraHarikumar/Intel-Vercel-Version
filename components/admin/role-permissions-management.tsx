"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Edit, Save, X, Shield, Lock, CheckCircle, Check, ChevronRight, ChevronDown } from "lucide-react"

interface RolePermission {
  roleId: string
  roleName: string
  permissions: string[]
  updatedAt: string
}

interface PermissionGroup {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

interface Permission {
  id: string
  name: string
  description: string
}

export function RolePermissionsManagement() {
  // Define permission groups with hierarchical structure
  const permissionGroups: PermissionGroup[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Dashboard related permissions",
      permissions: [{ id: "view_dashboard", name: "View Dashboard", description: "View main dashboard" }],
    },
    {
      id: "proposals",
      name: "Proposals",
      description: "Proposal related permissions",
      permissions: [
        { id: "create_proposal", name: "Create Proposal", description: "Create new proposals" },
        { id: "edit_proposal", name: "Edit Proposal", description: "Edit existing proposals" },
        { id: "delete_proposal", name: "Delete Proposal", description: "Delete proposals" },
      ],
    },
    {
      id: "reports",
      name: "Reports",
      description: "Report related permissions",
      permissions: [{ id: "view_reports", name: "View Reports", description: "View sales reports" }],
    },
    {
      id: "users",
      name: "User Management",
      description: "User management permissions",
      permissions: [
        { id: "manage_users", name: "Manage Users", description: "Manage user accounts" },
        { id: "manage_roles", name: "Manage Roles", description: "Manage roles and permissions" },
      ],
    },
    {
      id: "customers",
      name: "Customer Data",
      description: "Customer data permissions",
      permissions: [
        { id: "view_customer_data", name: "View Customer Data", description: "View customer data" },
        { id: "edit_customer_data", name: "Edit Customer Data", description: "Edit customer data" },
      ],
    },
    {
      id: "simulations",
      name: "Simulations",
      description: "Simulation related permissions",
      permissions: [{ id: "run_simulation", name: "Run Simulation", description: "Run digital twin simulations" }],
    },
  ]

  // Flatten permissions for easier lookup
  const allPermissions = permissionGroups.flatMap((group) => group.permissions)

  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([
    {
      roleId: "1",
      roleName: "System Admin",
      permissions: [
        "view_dashboard",
        "create_proposal",
        "edit_proposal",
        "delete_proposal",
        "view_reports",
        "manage_users",
        "manage_roles",
        "view_customer_data",
        "edit_customer_data",
        "run_simulation",
      ],
      updatedAt: "2023-01-15",
    },
    {
      roleId: "2",
      roleName: "Sales VP",
      permissions: [
        "view_dashboard",
        "create_proposal",
        "edit_proposal",
        "delete_proposal",
        "view_reports",
        "view_customer_data",
        "edit_customer_data",
        "run_simulation",
      ],
      updatedAt: "2023-01-15",
    },
    {
      roleId: "3",
      roleName: "Sales Manager",
      permissions: [
        "view_dashboard",
        "create_proposal",
        "edit_proposal",
        "view_reports",
        "view_customer_data",
        "run_simulation",
      ],
      updatedAt: "2023-01-15",
    },
    {
      roleId: "4",
      roleName: "Sales Associate",
      permissions: ["view_dashboard", "create_proposal", "view_reports", "view_customer_data"],
      updatedAt: "2023-01-15",
    },
    {
      roleId: "5",
      roleName: "Solution Architect",
      permissions: [
        "view_dashboard",
        "create_proposal",
        "edit_proposal",
        "view_reports",
        "view_customer_data",
        "run_simulation",
      ],
      updatedAt: "2023-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const filteredRolePermissions = rolePermissions.filter((rolePermission) =>
    rolePermission.roleName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditRolePermissions = (rolePermission: RolePermission) => {
    setEditingRoleId(rolePermission.roleId)
    setSelectedPermissions([...rolePermission.permissions])

    // Expand all permission groups when editing
    const expanded: Record<string, boolean> = {}
    permissionGroups.forEach((group) => {
      expanded[group.id] = true
    })
    setExpandedGroups(expanded)
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleTogglePermission = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permissionId))
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId])
    }
  }

  const handleToggleGroupPermissions = (group: PermissionGroup, isSelected: boolean) => {
    const groupPermissionIds = group.permissions.map((p) => p.id)

    if (isSelected) {
      // Remove all permissions in this group
      setSelectedPermissions(selectedPermissions.filter((p) => !groupPermissionIds.includes(p)))
    } else {
      // Add all permissions in this group
      const newPermissions = [...selectedPermissions]
      groupPermissionIds.forEach((id) => {
        if (!newPermissions.includes(id)) {
          newPermissions.push(id)
        }
      })
      setSelectedPermissions(newPermissions)
    }
  }

  const isGroupFullySelected = (group: PermissionGroup): boolean => {
    return group.permissions.every((p) => selectedPermissions.includes(p.id))
  }

  const isGroupPartiallySelected = (group: PermissionGroup): boolean => {
    return (
      group.permissions.some((p) => selectedPermissions.includes(p.id)) &&
      !group.permissions.every((p) => selectedPermissions.includes(p.id))
    )
  }

  const handleSaveRolePermissions = () => {
    if (editingRoleId) {
      // Update existing role permissions
      const roleToUpdate = rolePermissions.find((role) => role.roleId === editingRoleId)

      setRolePermissions(
        rolePermissions.map((rolePermission) =>
          rolePermission.roleId === editingRoleId
            ? {
                ...rolePermission,
                permissions: selectedPermissions,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : rolePermission,
        ),
      )

      setSuccessMessage(`Permissions for role "${roleToUpdate?.roleName}" updated successfully`)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }

    setEditingRoleId(null)
  }

  const handleCancel = () => {
    setEditingRoleId(null)
  }

  // Helper function to get permission names from IDs
  const getPermissionNames = (permissionIds: string[]): string[] => {
    return permissionIds.map((id) => {
      const permission = allPermissions.find((p) => p.id === id)
      return permission ? permission.name : id
    })
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 text-blue-400 mr-2" />
          Assign Role Permissions
        </h2>
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
              This screen allows you to configure which permissions are assigned to each role using the hierarchical
              permission tree.
            </p>

            <p className="mb-1 font-medium">How to use this screen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Use the search box to find a specific role</li>
              <li>Click the edit icon next to a role to modify its permissions</li>
              <li>In edit mode, expand permission groups by clicking on them</li>
              <li>Check/uncheck individual permissions or entire permission groups</li>
              <li>Click the save icon to apply your changes</li>
              <li>Note: System Admin role has access to all permissions by default and cannot be modified</li>
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
              <TableHead className="text-blue-200 font-medium">Role</TableHead>
              <TableHead className="text-blue-200 font-medium">Permissions</TableHead>
              <TableHead className="text-blue-200 font-medium">Last Updated</TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRolePermissions.map((rolePermission) => (
              <TableRow key={rolePermission.roleId} className="hover:bg-blue-900/20">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-blue-400 mr-2" />
                    {rolePermission.roleName}
                  </div>
                </TableCell>
                <TableCell>
                  {editingRoleId === rolePermission.roleId ? (
                    <div className="max-h-[400px] overflow-y-auto pr-2">
                      {permissionGroups.map((group) => (
                        <div key={group.id} className="mb-2">
                          <div
                            className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-2 rounded"
                            onClick={() => toggleGroup(group.id)}
                          >
                            <div className="flex items-center">
                              {expandedGroups[group.id] ? (
                                <ChevronDown className="h-4 w-4 text-blue-400 mr-1" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-blue-400 mr-1" />
                              )}
                              <span className="font-medium">{group.name}</span>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer ${
                                isGroupFullySelected(group)
                                  ? "bg-blue-600"
                                  : isGroupPartiallySelected(group)
                                    ? "bg-blue-600/50"
                                    : "border border-blue-600/50"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleGroupPermissions(group, isGroupFullySelected(group))
                              }}
                            >
                              {(isGroupFullySelected(group) || isGroupPartiallySelected(group)) && (
                                <Check className="h-2.5 w-2.5 text-white" />
                              )}
                            </div>
                          </div>

                          {expandedGroups[group.id] && (
                            <div className="ml-6 space-y-1 mt-1">
                              {group.permissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1.5 rounded"
                                  onClick={() => handleTogglePermission(permission.id)}
                                >
                                  <div className="flex items-center">
                                    <Lock className="h-3 w-3 text-blue-400 mr-1.5" />
                                    <span className="text-xs">{permission.name}</span>
                                  </div>
                                  <div
                                    className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                                      selectedPermissions.includes(permission.id)
                                        ? "bg-blue-600"
                                        : "border border-blue-600/50"
                                    }`}
                                  >
                                    {selectedPermissions.includes(permission.id) && (
                                      <Check className="h-2.5 w-2.5 text-white" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {getPermissionNames(rolePermission.permissions).map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs flex items-center"
                        >
                          <Lock className="h-3 w-3 mr-1" />
                          {permission}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>{rolePermission.updatedAt}</TableCell>
                <TableCell>
                  {editingRoleId === rolePermission.roleId ? (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-green-900/30"
                        onClick={handleSaveRolePermissions}
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
                      onClick={() => handleEditRolePermissions(rolePermission)}
                      disabled={editingRoleId !== null || rolePermission.roleName === "System Admin"}
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
          {filteredRolePermissions.length} roles • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
