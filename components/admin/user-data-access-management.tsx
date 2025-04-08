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
  Database,
  CheckCircle,
  Globe,
  Building,
  Check,
  Tag,
  Plus,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Settings,
  AlertCircle,
  Info,
  Trash2,
} from "lucide-react"

interface UserDataAccess {
  userId: string
  userName: string
  email: string
  role: string
  regions: string[]
  industries: string[]
  customerTiers: string[]
  updatedAt: string
}

interface Region {
  id: string
  name: string
}

interface Industry {
  id: string
  name: string
}

interface CustomerTier {
  id: string
  name: string
}

interface AutoAssignmentRule {
  entityType: "region" | "industry" | "tier"
  applyTo: "all" | "role" | "department"
  roleFilter?: string
  departmentFilter?: string
}

export function UserDataAccessManagement() {
  const regions: Region[] = [
    { id: "na", name: "North America" },
    { id: "eu", name: "Europe" },
    { id: "apac", name: "Asia Pacific" },
    { id: "latam", name: "Latin America" },
    { id: "mea", name: "Middle East & Africa" },
  ]

  const industries: Industry[] = [
    { id: "fin", name: "Financial Services" },
    { id: "health", name: "Healthcare" },
    { id: "retail", name: "Retail" },
    { id: "mfg", name: "Manufacturing" },
    { id: "tech", name: "Technology" },
    { id: "edu", name: "Education" },
    { id: "gov", name: "Government" },
  ]

  const customerTiers: CustomerTier[] = [
    { id: "t1", name: "Tier 1 (Enterprise)" },
    { id: "t2", name: "Tier 2 (Mid-Market)" },
    { id: "t3", name: "Tier 3 (SMB)" },
  ]

  const [userDataAccess, setUserDataAccess] = useState<UserDataAccess[]>([
    {
      userId: "1",
      userName: "John Smith",
      email: "john.smith@company.com",
      role: "System Admin",
      regions: ["na", "eu", "apac", "latam", "mea"],
      industries: ["fin", "health", "retail", "mfg", "tech", "edu", "gov"],
      customerTiers: ["t1", "t2", "t3"],
      updatedAt: "2023-01-15",
    },
    {
      userId: "2",
      userName: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Sales Manager",
      regions: ["na"],
      industries: ["fin", "tech"],
      customerTiers: ["t1", "t2"],
      updatedAt: "2023-01-15",
    },
    {
      userId: "3",
      userName: "Michael Brown",
      email: "michael.brown@company.com",
      role: "Marketing Analyst",
      regions: ["eu"],
      industries: ["retail", "tech"],
      customerTiers: ["t1"],
      updatedAt: "2023-01-15",
    },
    {
      userId: "4",
      userName: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Finance Manager",
      regions: ["na", "eu"],
      industries: ["fin"],
      customerTiers: ["t1", "t2", "t3"],
      updatedAt: "2023-01-15",
    },
    {
      userId: "5",
      userName: "David Wilson",
      email: "david.wilson@company.com",
      role: "System Admin",
      regions: ["na", "eu", "apac", "latam", "mea"],
      industries: ["fin", "health", "retail", "mfg", "tech", "edu", "gov"],
      customerTiers: ["t1", "t2", "t3"],
      updatedAt: "2023-01-15",
    },
    {
      userId: "9",
      userName: "James Thomas",
      email: "james.thomas@company.com",
      role: "Sales VP",
      regions: ["na", "eu", "apac", "latam", "mea"],
      industries: ["fin", "health", "retail", "mfg", "tech", "edu", "gov"],
      customerTiers: ["t1", "t2", "t3"],
      updatedAt: "2023-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedTiers, setSelectedTiers] = useState<string[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [directoryUsers, setDirectoryUsers] = useState<
    { id: string; name: string; email: string; department: string }[]
  >([
    { id: "101", name: "Alex Johnson", email: "alex.johnson@company.com", department: "Sales" },
    { id: "102", name: "Maria Garcia", email: "maria.garcia@company.com", department: "Marketing" },
    { id: "103", name: "Wei Zhang", email: "wei.zhang@company.com", department: "Engineering" },
    { id: "104", name: "Priya Patel", email: "priya.patel@company.com", department: "Finance" },
    { id: "105", name: "Omar Hassan", email: "omar.hassan@company.com", department: "Product" },
  ])
  const [directorySearchTerm, setDirectorySearchTerm] = useState("")
  const [selectedDirectoryUser, setSelectedDirectoryUser] = useState<string | null>(null)
  const [newUserRegions, setNewUserRegions] = useState<string[]>([])
  const [newUserIndustries, setNewUserIndustries] = useState<string[]>([])
  const [newUserTiers, setNewUserTiers] = useState<string[]>([])

  // Add the state for controlling the help section visibility
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const [showAutoAssignModal, setShowAutoAssignModal] = useState(false)
  const [autoAssignmentRules, setAutoAssignmentRules] = useState<AutoAssignmentRule[]>([
    { entityType: "region", applyTo: "role", roleFilter: "System Admin" },
    { entityType: "region", applyTo: "role", roleFilter: "Sales VP" },
    { entityType: "industry", applyTo: "role", roleFilter: "System Admin" },
    { entityType: "industry", applyTo: "role", roleFilter: "Sales VP" },
    { entityType: "tier", applyTo: "role", roleFilter: "System Admin" },
    { entityType: "tier", applyTo: "role", roleFilter: "Sales VP" },
  ])
  const [newRule, setNewRule] = useState<AutoAssignmentRule>({
    entityType: "region",
    applyTo: "all",
  })

  const filteredUserDataAccess = userDataAccess.filter(
    (userData) =>
      userData.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUserDataAccess = (userData: UserDataAccess) => {
    setEditingUserId(userData.userId)
    setSelectedRegions([...userData.regions])
    setSelectedIndustries([...userData.industries])
    setSelectedTiers([...userData.customerTiers])
  }

  const handleToggleRegion = (regionId: string) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== regionId))
    } else {
      setSelectedRegions([...selectedRegions, regionId])
    }
  }

  const handleToggleIndustry = (industryId: string) => {
    if (selectedIndustries.includes(industryId)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industryId))
    } else {
      setSelectedIndustries([...selectedIndustries, industryId])
    }
  }

  const handleToggleTier = (tierId: string) => {
    if (selectedTiers.includes(tierId)) {
      setSelectedTiers(selectedTiers.filter((t) => t !== tierId))
    } else {
      setSelectedTiers([...selectedTiers, tierId])
    }
  }

  const handleSaveUserDataAccess = () => {
    if (editingUserId) {
      // Update existing user data access
      const userToUpdate = userDataAccess.find((user) => user.userId === editingUserId)

      setUserDataAccess(
        userDataAccess.map((userData) =>
          userData.userId === editingUserId
            ? {
                ...userData,
                regions: selectedRegions,
                industries: selectedIndustries,
                customerTiers: selectedTiers,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : userData,
        ),
      )

      setSuccessMessage(`Data access for ${userToUpdate?.userName} updated successfully`)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }

    setEditingUserId(null)
  }

  const handleCancel = () => {
    setEditingUserId(null)
  }

  const getRegionNames = (regionIds: string[]) => {
    return regionIds.map((id) => regions.find((r) => r.id === id)?.name || id)
  }

  const getIndustryNames = (industryIds: string[]) => {
    return industryIds.map((id) => industries.find((i) => i.id === id)?.name || id)
  }

  const getTierNames = (tierIds: string[]) => {
    return tierIds.map((id) => customerTiers.find((t) => t.id === id)?.name || id)
  }

  const handleAddNewUser = () => {
    if (!selectedDirectoryUser) return

    const userToAdd = directoryUsers.find((user) => user.id === selectedDirectoryUser)
    if (!userToAdd) return

    // Generate new user ID
    const newUserId = (Math.max(...userDataAccess.map((user) => Number.parseInt(user.userId))) + 1).toString()

    // Add new user with data access
    const today = new Date().toISOString().split("T")[0]
    const newUserAccess: UserDataAccess = {
      userId: newUserId,
      userName: userToAdd.name,
      email: userToAdd.email,
      role: "New User", // Default role, can be updated later
      regions: newUserRegions,
      industries: newUserIndustries,
      customerTiers: newUserTiers,
      updatedAt: today,
    }

    setUserDataAccess([...userDataAccess, newUserAccess])

    setSuccessMessage(`Data access for ${userToAdd.name} added successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form
    setShowAddUserModal(false)
    setSelectedDirectoryUser(null)
    setNewUserRegions([])
    setNewUserIndustries([])
    setNewUserTiers([])
    setDirectorySearchTerm("")
  }

  const handleAddAutoAssignmentRule = () => {
    setAutoAssignmentRules([...autoAssignmentRules, newRule])
    setNewRule({
      entityType: "region",
      applyTo: "all",
    })
  }

  const handleDeleteRule = (index: number) => {
    const updatedRules = [...autoAssignmentRules]
    updatedRules.splice(index, 1)
    setAutoAssignmentRules(updatedRules)
  }

  const simulateNewEntityAdded = (entityType: "region" | "industry" | "tier", entityId: string, entityName: string) => {
    // Find users who should get this new entity based on rules
    const usersToUpdate: string[] = []

    autoAssignmentRules.forEach((rule) => {
      if (rule.entityType === entityType) {
        if (rule.applyTo === "all") {
          // Add all user IDs
          userDataAccess.forEach((user) => {
            if (!usersToUpdate.includes(user.userId)) {
              usersToUpdate.push(user.userId)
            }
          })
        } else if (rule.applyTo === "role" && rule.roleFilter) {
          // Add users with matching role
          userDataAccess.forEach((user) => {
            if (user.role === rule.roleFilter && !usersToUpdate.includes(user.userId)) {
              usersToUpdate.push(user.userId)
            }
          })
        } else if (rule.applyTo === "department" && rule.departmentFilter) {
          // In a real system, we'd filter by department here
          // For this demo, we'll just use the first user
          if (userDataAccess.length > 0 && !usersToUpdate.includes(userDataAccess[0].userId)) {
            usersToUpdate.push(userDataAccess[0].userId)
          }
        }
      }
    })

    // Update the users with the new entity
    const today = new Date().toISOString().split("T")[0]

    setUserDataAccess(
      userDataAccess.map((user) => {
        if (usersToUpdate.includes(user.userId)) {
          if (entityType === "region") {
            return {
              ...user,
              regions: [...user.regions, entityId],
              updatedAt: today,
            }
          } else if (entityType === "industry") {
            return {
              ...user,
              industries: [...user.industries, entityId],
              updatedAt: today,
            }
          } else if (entityType === "tier") {
            return {
              ...user,
              customerTiers: [...user.customerTiers, entityId],
              updatedAt: today,
            }
          }
        }
        return user
      }),
    )

    setSuccessMessage(
      `New ${entityType} "${entityName}" was automatically assigned to ${usersToUpdate.length} users based on rules`,
    )
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Database className="h-5 w-5 text-blue-400 mr-2" />
          Assign User Data Access
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowAutoAssignModal(true)}
            variant="outline"
            className="bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Auto-Assignment Rules
          </Button>
          <Button
            onClick={() => setShowAddUserModal(true)}
            className="bg-blue-700 hover:bg-blue-600"
            disabled={editingUserId !== null}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>
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
              This screen allows you to configure which data each user can access based on regions, industries, and
              customer tiers.
            </p>

            <p className="mb-1 font-medium">How to use this screen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Click "Add New User" to assign data access to a user from the corporate directory</li>
              <li>Use the search box to find existing users by name, email, or role</li>
              <li>Click the edit icon to modify a user's data access permissions</li>
              <li>Select regions, industries, and customer tiers the user should have access to</li>
              <li>Click the save icon to apply your changes</li>
              <li>Note: System Admin and Sales VP roles have access to all data by default</li>
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
            placeholder="Search users by name, email, or role..."
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
              <TableHead className="text-blue-200 font-medium">Role</TableHead>
              <TableHead className="text-blue-200 font-medium">Regions</TableHead>
              <TableHead className="text-blue-200 font-medium">Industries</TableHead>
              <TableHead className="text-blue-200 font-medium">Customer Tiers</TableHead>
              <TableHead className="text-blue-200 font-medium">Last Updated</TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserDataAccess.map((userData) => (
              <TableRow key={userData.userId} className="hover:bg-blue-900/20">
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 text-blue-300">
                      {userData.userName.charAt(0)}
                    </div>
                    <div>
                      <div>{userData.userName}</div>
                      <div className="text-xs text-gray-400">{userData.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{userData.role}</TableCell>
                <TableCell>
                  {editingUserId === userData.userId ? (
                    <div className="space-y-1">
                      {regions.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1 rounded"
                          onClick={() => handleToggleRegion(region.id)}
                        >
                          <div className="flex items-center">
                            <Globe className="h-3 w-3 text-blue-400 mr-1" />
                            <span className="text-xs">{region.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              selectedRegions.includes(region.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {selectedRegions.includes(region.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {getRegionNames(userData.regions).map((region, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs flex items-center"
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          {region}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === userData.userId ? (
                    <div className="space-y-1">
                      {industries.map((industry) => (
                        <div
                          key={industry.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1 rounded"
                          onClick={() => handleToggleIndustry(industry.id)}
                        >
                          <div className="flex items-center">
                            <Building className="h-3 w-3 text-blue-400 mr-1" />
                            <span className="text-xs">{industry.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              selectedIndustries.includes(industry.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {selectedIndustries.includes(industry.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {getIndustryNames(userData.industries).map((industry, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs flex items-center"
                        >
                          <Building className="h-3 w-3 mr-1" />
                          {industry}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === userData.userId ? (
                    <div className="space-y-1">
                      {customerTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1 rounded"
                          onClick={() => handleToggleTier(tier.id)}
                        >
                          <div className="flex items-center">
                            <Tag className="h-3 w-3 text-blue-400 mr-1" />
                            <span className="text-xs">{tier.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              selectedTiers.includes(tier.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {selectedTiers.includes(tier.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {getTierNames(userData.customerTiers).map((tier, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tier}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>{userData.updatedAt}</TableCell>
                <TableCell>
                  {editingUserId === userData.userId ? (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-green-900/30"
                        onClick={handleSaveUserDataAccess}
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
                      onClick={() => handleEditUserDataAccess(userData)}
                      disabled={
                        editingUserId !== null || userData.role === "System Admin" || userData.role === "Sales VP"
                      }
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
          {filteredUserDataAccess.length} users • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <UserPlus className="h-5 w-5 text-blue-400 mr-2" />
                Add User from Corporate Directory
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddUserModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Search Directory</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or department..."
                  value={directorySearchTerm}
                  onChange={(e) => setDirectorySearchTerm(e.target.value)}
                  className="pl-10 bg-blue-950/30 border-blue-800/50"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select User</label>
              <div className="bg-black/40 rounded-md border border-blue-900/50 max-h-48 overflow-y-auto">
                {directoryUsers
                  .filter(
                    (user) =>
                      user.name.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
                      user.email.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
                      user.department.toLowerCase().includes(directorySearchTerm.toLowerCase()),
                  )
                  .map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-2 cursor-pointer ${
                        selectedDirectoryUser === user.id ? "bg-blue-900/50" : "hover:bg-blue-900/20"
                      }`}
                      onClick={() => setSelectedDirectoryUser(user.id)}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 text-blue-300">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-300">{user.department}</div>
                    </div>
                  ))}
                {directoryUsers.filter(
                  (user) =>
                    user.name.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(directorySearchTerm.toLowerCase()) ||
                    user.department.toLowerCase().includes(directorySearchTerm.toLowerCase()),
                ).length === 0 && (
                  <div className="p-4 text-center text-gray-400">No users found matching your search</div>
                )}
              </div>
            </div>

            {selectedDirectoryUser && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Regions</label>
                    <div className="space-y-1 bg-black/40 rounded-md border border-blue-900/50 p-2 max-h-48 overflow-y-auto">
                      {regions.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1.5 rounded"
                          onClick={() => {
                            if (newUserRegions.includes(region.id)) {
                              setNewUserRegions(newUserRegions.filter((id) => id !== region.id))
                            } else {
                              setNewUserRegions([...newUserRegions, region.id])
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Globe className="h-3 w-3 text-blue-400 mr-1.5" />
                            <span className="text-xs">{region.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              newUserRegions.includes(region.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {newUserRegions.includes(region.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Industries</label>
                    <div className="space-y-1 bg-black/40 rounded-md border border-blue-900/50 p-2 max-h-48 overflow-y-auto">
                      {industries.map((industry) => (
                        <div
                          key={industry.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1.5 rounded"
                          onClick={() => {
                            if (newUserIndustries.includes(industry.id)) {
                              setNewUserIndustries(newUserIndustries.filter((id) => id !== industry.id))
                            } else {
                              setNewUserIndustries([...newUserIndustries, industry.id])
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Building className="h-3 w-3 text-blue-400 mr-1.5" />
                            <span className="text-xs">{industry.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              newUserIndustries.includes(industry.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {newUserIndustries.includes(industry.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Customer Tiers</label>
                    <div className="space-y-1 bg-black/40 rounded-md border border-blue-900/50 p-2 max-h-48 overflow-y-auto">
                      {customerTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-900/20 p-1.5 rounded"
                          onClick={() => {
                            if (newUserTiers.includes(tier.id)) {
                              setNewUserTiers(newUserTiers.filter((id) => id !== tier.id))
                            } else {
                              setNewUserTiers([...newUserTiers, tier.id])
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Tag className="h-3 w-3 text-blue-400 mr-1.5" />
                            <span className="text-xs">{tier.name}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                              newUserTiers.includes(tier.id) ? "bg-blue-600" : "border border-blue-600/50"
                            }`}
                          >
                            {newUserTiers.includes(tier.id) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddUserModal(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddNewUser}
                    className="bg-blue-700 hover:bg-blue-600"
                    disabled={
                      !selectedDirectoryUser ||
                      (newUserRegions.length === 0 && newUserIndustries.length === 0 && newUserTiers.length === 0)
                    }
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auto-Assignment Rules Modal */}
      {showAutoAssignModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Settings className="h-5 w-5 text-blue-400 mr-2" />
                Auto-Assignment Rules
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAutoAssignModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-4 flex items-start">
              <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="mb-1">
                  Auto-assignment rules determine which users automatically receive access to new regions, industries,
                  or customer tiers when they are added to the system.
                </p>
                <p>
                  This prevents administrators from having to manually update each user's access whenever new data
                  categories are added.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Current Rules</h4>
              <div className="bg-black/40 rounded-md border border-blue-900/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-900/40 hover:bg-blue-900/50">
                      <TableHead className="text-blue-200 font-medium">Entity Type</TableHead>
                      <TableHead className="text-blue-200 font-medium">Apply To</TableHead>
                      <TableHead className="text-blue-200 font-medium">Filter</TableHead>
                      <TableHead className="text-blue-200 font-medium w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {autoAssignmentRules.map((rule, index) => (
                      <TableRow key={index} className="hover:bg-blue-900/20">
                        <TableCell>
                          {rule.entityType === "region" && <Globe className="h-4 w-4 text-blue-400 inline mr-2" />}
                          {rule.entityType === "industry" && (
                            <Building className="h-4 w-4 text-green-400 inline mr-2" />
                          )}
                          {rule.entityType === "tier" && <Tag className="h-4 w-4 text-yellow-400 inline mr-2" />}
                          {rule.entityType.charAt(0).toUpperCase() + rule.entityType.slice(1)}
                        </TableCell>
                        <TableCell>
                          {rule.applyTo === "all" && "All Users"}
                          {rule.applyTo === "role" && "By Role"}
                          {rule.applyTo === "department" && "By Department"}
                        </TableCell>
                        <TableCell>
                          {rule.applyTo === "all" && "-"}
                          {rule.applyTo === "role" && rule.roleFilter}
                          {rule.applyTo === "department" && rule.departmentFilter}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-red-900/30"
                            onClick={() => handleDeleteRule(index)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {autoAssignmentRules.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-gray-400">
                          No rules configured. Add a rule to enable auto-assignment.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Add New Rule</h4>
              <div className="bg-black/40 rounded-md border border-blue-900/50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Entity Type</label>
                    <select
                      value={newRule.entityType}
                      onChange={(e) =>
                        setNewRule({ ...newRule, entityType: e.target.value as "region" | "industry" | "tier" })
                      }
                      className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="region">Region</option>
                      <option value="industry">Industry</option>
                      <option value="tier">Customer Tier</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Apply To</label>
                    <select
                      value={newRule.applyTo}
                      onChange={(e) =>
                        setNewRule({ ...newRule, applyTo: e.target.value as "all" | "role" | "department" })
                      }
                      className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      <option value="role">By Role</option>
                      <option value="department">By Department</option>
                    </select>
                  </div>

                  {newRule.applyTo === "role" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Role</label>
                      <select
                        value={newRule.roleFilter || ""}
                        onChange={(e) => setNewRule({ ...newRule, roleFilter: e.target.value })}
                        className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Role</option>
                        {[
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
                        ].map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {newRule.applyTo === "department" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Department</label>
                      <select
                        value={newRule.departmentFilter || ""}
                        onChange={(e) => setNewRule({ ...newRule, departmentFilter: e.target.value })}
                        className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Department</option>
                        {[
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
                        ].map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleAddAutoAssignmentRule}
                    className="bg-blue-700 hover:bg-blue-600"
                    disabled={
                      (newRule.applyTo === "role" && !newRule.roleFilter) ||
                      (newRule.applyTo === "department" && !newRule.departmentFilter)
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Test Auto-Assignment</h4>
              <div className="bg-black/40 rounded-md border border-blue-900/50 p-4">
                <div className="text-sm mb-3">
                  <AlertCircle className="h-4 w-4 text-yellow-400 inline mr-2" />
                  This is a simulation to test how your rules would work when new entities are added.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Button
                      onClick={() => simulateNewEntityAdded("region", "africa", "Africa")}
                      className="w-full bg-blue-700 hover:bg-blue-600 h-9"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Add New Region
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => simulateNewEntityAdded("industry", "energy", "Energy")}
                      className="w-full bg-green-700 hover:bg-green-600 h-9"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Add New Industry
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => simulateNewEntityAdded("tier", "t4", "Tier 4 (Startup)")}
                      className="w-full bg-yellow-700 hover:bg-yellow-600 h-9"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Add New Customer Tier
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowAutoAssignModal(false)} className="bg-blue-700 hover:bg-blue-600">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
