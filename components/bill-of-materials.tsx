"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Download,
  FileSpreadsheet,
  Cpu,
  HardDrive,
  MemoryStickIcon as Memory,
  Code,
  Wrench,
  DollarSign,
  Briefcase,
  GraduationCap,
  BarChart,
  Search,
  Filter,
  SortAsc,
  Layers,
  Sparkles,
  PinIcon as Chip,
} from "lucide-react"

interface BOMItem {
  id: string
  category: string
  itemName: string
  vendor: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export function BillOfMaterials() {
  const [items, setItems] = useState<BOMItem[]>([
    {
      id: "1",
      category: "Compute",
      itemName: "Intel® Xeon® Scalable Processors",
      vendor: "Intel",
      quantity: 4,
      unitPrice: 4500,
      totalPrice: 18000,
    },
    {
      id: "2",
      category: "Compute",
      itemName: "Intel® Habana® Gaudi2 Deep Learning Accelerators",
      vendor: "Intel",
      quantity: 2,
      unitPrice: 8500,
      totalPrice: 17000,
    },
    {
      id: "3",
      category: "Storage",
      itemName: "Intel® SSD D7-P5520",
      vendor: "Intel",
      quantity: 8,
      unitPrice: 1200,
      totalPrice: 9600,
    },
    {
      id: "4",
      category: "Memory",
      itemName: "Intel® Optane™ Persistent Memory",
      vendor: "Intel",
      quantity: 16,
      unitPrice: 850,
      totalPrice: 13600,
    },
    {
      id: "5",
      category: "Software",
      itemName: "Intel® oneAPI AI Analytics Toolkit",
      vendor: "Intel",
      quantity: 1,
      unitPrice: 5000,
      totalPrice: 5000,
    },
    {
      id: "6",
      category: "Software",
      itemName: "Intel® Distribution of OpenVINO™ Toolkit",
      vendor: "Intel",
      quantity: 1,
      unitPrice: 3000,
      totalPrice: 3000,
    },
    {
      id: "7",
      category: "Services",
      itemName: "Implementation Services",
      vendor: "Intel",
      quantity: 1,
      unitPrice: 15000,
      totalPrice: 15000,
    },
    {
      id: "8",
      category: "Services",
      itemName: "Training & Knowledge Transfer",
      vendor: "Intel",
      quantity: 1,
      unitPrice: 8000,
      totalPrice: 8000,
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<BOMItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const startEditing = (item: BOMItem) => {
    setEditingId(item.id)
    setEditItem({ ...item })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditItem(null)
  }

  const saveItem = () => {
    if (editItem) {
      // Calculate total price
      const totalPrice = editItem.quantity * editItem.unitPrice

      setItems(items.map((item) => (item.id === editingId ? { ...editItem, totalPrice } : item)))
      setEditingId(null)
      setEditItem(null)
    }
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const addNewItem = () => {
    const newId = (Math.max(...items.map((item) => Number.parseInt(item.id))) + 1).toString()
    const newItem: BOMItem = {
      id: newId,
      category: "",
      itemName: "",
      vendor: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    }

    setItems([...items, newItem])
    startEditing(newItem)
  }

  const handleEditChange = (field: keyof BOMItem, value: string | number) => {
    if (editItem) {
      setEditItem({
        ...editItem,
        [field]: value,
      })
    }
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0)
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "compute":
        return <Cpu className="h-4 w-4 text-blue-400" />
      case "storage":
        return <HardDrive className="h-4 w-4 text-green-400" />
      case "memory":
        return <Memory className="h-4 w-4 text-yellow-400" />
      case "software":
        return <Code className="h-4 w-4 text-purple-400" />
      case "services":
        return <Wrench className="h-4 w-4 text-orange-400" />
      default:
        return <Layers className="h-4 w-4 text-gray-400" />
    }
  }

  const getItemIcon = (itemName: string) => {
    if (itemName.includes("Xeon")) return <Cpu className="h-4 w-4 text-blue-400" />
    if (itemName.includes("Habana") || itemName.includes("Gaudi")) return <Chip className="h-4 w-4 text-green-400" />
    if (itemName.includes("SSD")) return <HardDrive className="h-4 w-4 text-red-400" />
    if (itemName.includes("Optane") || itemName.includes("Memory"))
      return <Memory className="h-4 w-4 text-yellow-400" />
    if (itemName.includes("oneAPI") || itemName.includes("Toolkit")) return <Code className="h-4 w-4 text-purple-400" />
    if (itemName.includes("OpenVINO")) return <Sparkles className="h-4 w-4 text-cyan-400" />
    if (itemName.includes("Implementation")) return <Wrench className="h-4 w-4 text-orange-400" />
    if (itemName.includes("Training")) return <GraduationCap className="h-4 w-4 text-pink-400" />
    return null
  }

  // Filter and sort items
  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortBy) return 0

    let comparison = 0
    if (sortBy === "category") {
      comparison = a.category.localeCompare(b.category)
    } else if (sortBy === "itemName") {
      comparison = a.itemName.localeCompare(b.itemName)
    } else if (sortBy === "vendor") {
      comparison = a.vendor.localeCompare(b.vendor)
    } else if (sortBy === "quantity") {
      comparison = a.quantity - b.quantity
    } else if (sortBy === "unitPrice") {
      comparison = a.unitPrice - b.unitPrice
    } else if (sortBy === "totalPrice") {
      comparison = a.totalPrice - b.totalPrice
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <BarChart className="h-5 w-5 text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold">Bill of Materials</h2>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center text-xs bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
            onClick={addNewItem}
          >
            <Plus className="h-3.5 w-3.5 mr-1 text-green-400" />
            Add Item
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center text-xs bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 mr-1 text-yellow-400" />
            Import CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center text-xs bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
          >
            <Download className="h-3.5 w-3.5 mr-1 text-blue-400" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-blue-950/30 border-blue-800/50 h-8 text-sm"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-xs bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
        >
          <Filter className="h-3.5 w-3.5 mr-1 text-purple-400" />
          Filter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-xs bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50"
        >
          <SortAsc className="h-3.5 w-3.5 mr-1 text-cyan-400" />
          Sort
        </Button>
      </div>

      <div className="rounded-md border border-blue-900/50 overflow-hidden bg-gradient-to-b from-blue-950/30 to-black/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-900/40 hover:bg-blue-900/50">
              <TableHead className="text-blue-200 font-medium cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  <Layers className="h-3.5 w-3.5 mr-1.5" />
                  Category
                  {sortBy === "category" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead className="text-blue-200 font-medium cursor-pointer" onClick={() => handleSort("itemName")}>
                <div className="flex items-center">
                  <Chip className="h-3.5 w-3.5 mr-1.5" />
                  Item Name
                  {sortBy === "itemName" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead className="text-blue-200 font-medium cursor-pointer" onClick={() => handleSort("vendor")}>
                <div className="flex items-center">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                  Vendor
                  {sortBy === "vendor" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead
                className="text-blue-200 font-medium text-right cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                <div className="flex items-center justify-end">
                  <span>Quantity</span>
                  {sortBy === "quantity" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead
                className="text-blue-200 font-medium text-right cursor-pointer"
                onClick={() => handleSort("unitPrice")}
              >
                <div className="flex items-center justify-end">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  <span>Unit Price</span>
                  {sortBy === "unitPrice" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead
                className="text-blue-200 font-medium text-right cursor-pointer"
                onClick={() => handleSort("totalPrice")}
              >
                <div className="flex items-center justify-end">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  <span>Total Price</span>
                  {sortBy === "totalPrice" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow
                key={item.id}
                className={`hover:bg-blue-900/20 ${editingId === item.id ? "bg-blue-900/30" : ""} transition-colors`}
              >
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editItem?.category || ""}
                      onChange={(e) => handleEditChange("category", e.target.value)}
                      className="h-7 text-xs bg-blue-950/30 border-blue-800/50"
                    />
                  ) : (
                    <div className="flex items-center">
                      {getCategoryIcon(item.category)}
                      <span className="ml-2">{item.category}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editItem?.itemName || ""}
                      onChange={(e) => handleEditChange("itemName", e.target.value)}
                      className="h-7 text-xs bg-blue-950/30 border-blue-800/50"
                    />
                  ) : (
                    <div className="flex items-center">
                      {getItemIcon(item.itemName)}
                      <span className="ml-2">{item.itemName}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editItem?.vendor || ""}
                      onChange={(e) => handleEditChange("vendor", e.target.value)}
                      className="h-7 text-xs bg-blue-950/30 border-blue-800/50"
                    />
                  ) : (
                    <div className="flex items-center">
                      {item.vendor === "Intel" && (
                        <div className="w-4 h-4 mr-2 flex items-center justify-center">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Intel%20Logo%20with%20blue%20bg-JIBHLg5ksFaE6djyP984OAZeU8Yt7a.png"
                            alt="Intel Logo"
                            className="h-4 w-4 rounded"
                          />
                        </div>
                      )}
                      <span>{item.vendor}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={editItem?.quantity || 0}
                      onChange={(e) => handleEditChange("quantity", Number.parseInt(e.target.value) || 0)}
                      className="h-7 text-xs bg-blue-950/30 border-blue-800/50 text-right"
                    />
                  ) : (
                    <span className="font-mono">{item.quantity}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={editItem?.unitPrice || 0}
                      onChange={(e) => handleEditChange("unitPrice", Number.parseFloat(e.target.value) || 0)}
                      className="h-7 text-xs bg-blue-950/30 border-blue-800/50 text-right"
                    />
                  ) : (
                    <div className="flex items-center justify-end">
                      <DollarSign className="h-3 w-3 text-green-400 mr-0.5" />
                      <span className="font-mono">{item.unitPrice.toLocaleString()}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {editingId === item.id ? (
                    <div className="flex items-center justify-end">
                      <DollarSign className="h-3 w-3 text-green-400 mr-0.5" />
                      <span className="font-mono">
                        {((editItem?.quantity || 0) * (editItem?.unitPrice || 0)).toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end">
                      <DollarSign className="h-3 w-3 text-green-400 mr-0.5" />
                      <span className="font-mono">{item.totalPrice.toLocaleString()}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-1">
                    {editingId === item.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-green-900/30"
                          onClick={saveItem}
                        >
                          <Save className="h-3.5 w-3.5 text-green-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-red-900/30"
                          onClick={cancelEditing}
                        >
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-blue-900/30"
                          onClick={() => startEditing(item)}
                        >
                          <Edit className="h-3.5 w-3.5 text-blue-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-red-900/30"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* Total row */}
            <TableRow className="bg-blue-900/30 font-medium hover:bg-blue-900/40">
              <TableCell colSpan={5} className="text-right flex items-center justify-end">
                <BarChart className="h-4 w-4 text-blue-300 mr-2" />
                <span className="text-blue-200">Total</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <DollarSign className="h-4 w-4 text-green-400 mr-0.5" />
                  <span className="font-mono text-green-300">${calculateTotal().toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
        <div>
          {sortedItems.length} items • Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <span className="mr-1">Powered by</span>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Intel%20Logo%20with%20blue%20bg-JIBHLg5ksFaE6djyP984OAZeU8Yt7a.png"
            alt="Intel Logo"
            className="h-4 w-4 rounded mr-1"
          />
          <span>Intel® AI Compute Modeller</span>
        </div>
      </div>
    </div>
  )
}
