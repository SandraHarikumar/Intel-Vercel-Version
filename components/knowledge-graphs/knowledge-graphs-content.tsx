"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Network,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  Upload,
  X,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Folder,
  FileText,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface KnowledgeGraph {
  id: string
  name: string
  category: string
  description: string
  nodes: number
  edges: number
  createdAt: string
  updatedAt: string
  status: "active" | "processing" | "error"
  dataSource: string
}

interface Category {
  id: string
  name: string
  description: string
  graphCount: number
}

export function KnowledgeGraphsContent() {
  const router = useRouter()

  // Sample data
  const [knowledgeGraphs, setKnowledgeGraphs] = useState<KnowledgeGraph[]>([
    {
      id: "1",
      name: "Financial Services Domain",
      category: "finance",
      description: "Knowledge graph for financial services domain including banking, insurance, and investments",
      nodes: 1250,
      edges: 3450,
      createdAt: "2023-05-15",
      updatedAt: "2023-06-20",
      status: "active",
      dataSource: "Financial Services Documentation",
    },
    {
      id: "2",
      name: "Healthcare Relationships",
      category: "healthcare",
      description: "Medical entities and their relationships for healthcare applications",
      nodes: 2340,
      edges: 5670,
      createdAt: "2023-04-10",
      updatedAt: "2023-06-15",
      status: "active",
      dataSource: "Medical Ontology Database",
    },
    {
      id: "3",
      name: "Retail Product Taxonomy",
      category: "retail",
      description: "Product categories, attributes, and relationships for retail applications",
      nodes: 980,
      edges: 1450,
      createdAt: "2023-06-05",
      updatedAt: "2023-06-05",
      status: "active",
      dataSource: "Product Catalog",
    },
    {
      id: "4",
      name: "Manufacturing Processes",
      category: "manufacturing",
      description: "Manufacturing processes, equipment, and dependencies",
      nodes: 560,
      edges: 890,
      createdAt: "2023-06-12",
      updatedAt: "2023-06-12",
      status: "processing",
      dataSource: "Manufacturing Documentation",
    },
    {
      id: "5",
      name: "Use Case Analysis",
      category: "usecase",
      description: "Knowledge graph for use case analysis, requirements, and dependencies",
      nodes: 850,
      edges: 1200,
      createdAt: "2023-07-10",
      updatedAt: "2023-07-15",
      status: "active",
      dataSource: "Use Case Documentation",
    },
    {
      id: "6",
      name: "SKU Relationships",
      category: "sku",
      description: "Knowledge graph for SKU relationships, compatibility, and dependencies",
      nodes: 1100,
      edges: 2300,
      createdAt: "2023-07-05",
      updatedAt: "2023-07-20",
      status: "active",
      dataSource: "Product Catalog and Compatibility Matrix",
    },
    {
      id: "7",
      name: "Pricing Models",
      category: "price",
      description: "Knowledge graph for pricing models, discounts, and cost relationships",
      nodes: 750,
      edges: 1800,
      createdAt: "2023-07-08",
      updatedAt: "2023-07-18",
      status: "active",
      dataSource: "Pricing Documentation and Cost Models",
    },
  ])

  const categories: Category[] = [
    {
      id: "usecase",
      name: "Usecase",
      description: "Knowledge graphs related to use cases",
      graphCount: 1,
    },
    {
      id: "sku",
      name: "SKU",
      description: "Knowledge graphs related to SKUs",
      graphCount: 1,
    },
    {
      id: "price",
      name: "Price",
      description: "Knowledge graphs related to pricing",
      graphCount: 1,
    },
    {
      id: "finance",
      name: "Financial Services",
      description: "Knowledge graphs related to banking, insurance, and investments",
      graphCount: 1,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Medical and healthcare related knowledge graphs",
      graphCount: 1,
    },
    {
      id: "retail",
      name: "Retail",
      description: "Retail and e-commerce knowledge graphs",
      graphCount: 1,
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      description: "Manufacturing and supply chain knowledge graphs",
      graphCount: 1,
    },
    {
      id: "technology",
      name: "Technology",
      description: "IT and technology domain knowledge graphs",
      graphCount: 0,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const [newGraph, setNewGraph] = useState({
    name: "",
    category: "",
    description: "",
  })

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  const [uploadData, setUploadData] = useState({
    graphId: "",
    files: [] as File[],
    dataType: "csv",
  })

  // Filter knowledge graphs based on search and category
  const filteredGraphs = knowledgeGraphs.filter((graph) => {
    const matchesSearch =
      graph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graph.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory ? graph.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  // Handle creating a new knowledge graph
  const handleCreateGraph = () => {
    if (!newGraph.name || !newGraph.category) return

    // Generate new ID
    const newId = (Math.max(...knowledgeGraphs.map((g) => Number.parseInt(g.id))) + 1).toString()
    const today = new Date().toISOString().split("T")[0]

    // Create new graph
    const graphToAdd: KnowledgeGraph = {
      id: newId,
      name: newGraph.name,
      category: newGraph.category,
      description: newGraph.description,
      nodes: 0,
      edges: 0,
      createdAt: today,
      updatedAt: today,
      status: "active",
      dataSource: "Manual Creation",
    }

    setKnowledgeGraphs([...knowledgeGraphs, graphToAdd])

    // Update category count
    const categoryToUpdate = categories.find((cat) => cat.id === newGraph.category)
    if (categoryToUpdate) {
      categoryToUpdate.graphCount += 1
    }

    setSuccessMessage(`Knowledge graph "${newGraph.name}" created successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form and close modal
    setShowCreateModal(false)
    setNewGraph({
      name: "",
      category: "",
      description: "",
    })
  }

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.name) return

    // Generate new category ID (kebab-case of name)
    const newId = newCategory.name.toLowerCase().replace(/\s+/g, "-")

    // Check if category already exists
    if (categories.some((cat) => cat.id === newId)) {
      setSuccessMessage(`Category "${newCategory.name}" already exists`)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
      return
    }

    // Add new category
    const categoryToAdd: Category = {
      id: newId,
      name: newCategory.name,
      description: newCategory.description,
      graphCount: 0,
    }

    categories.push(categoryToAdd)

    setSuccessMessage(`Category "${newCategory.name}" added successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form and close modal
    setShowCategoryModal(false)
    setNewCategory({
      name: "",
      description: "",
    })
  }

  // Handle uploading data to a knowledge graph
  const handleUploadData = () => {
    if (!uploadData.graphId || uploadData.files.length === 0) return

    const graphToUpdate = knowledgeGraphs.find((g) => g.id === uploadData.graphId)
    if (!graphToUpdate) return

    // Update graph status to processing
    setKnowledgeGraphs(
      knowledgeGraphs.map((graph) => {
        if (graph.id === uploadData.graphId) {
          return {
            ...graph,
            status: "processing",
            updatedAt: new Date().toISOString().split("T")[0],
          }
        }
        return graph
      }),
    )

    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setKnowledgeGraphs(
        knowledgeGraphs.map((graph) => {
          if (graph.id === uploadData.graphId) {
            return {
              ...graph,
              status: "active",
              nodes: graph.nodes + Math.floor(Math.random() * 500) + 100,
              edges: graph.edges + Math.floor(Math.random() * 1000) + 200,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          }
          return graph
        }),
      )

      setSuccessMessage(`Data successfully processed and added to "${graphToUpdate.name}"`)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }, 3000)

    setSuccessMessage(`Data upload started for "${graphToUpdate.name}". Processing...`)
    setShowSuccessMessage(true)

    // Reset form and close modal
    setShowUploadModal(false)
    setUploadData({
      graphId: "",
      files: [],
      dataType: "csv",
    })
  }

  // Handle deleting a knowledge graph
  const handleDeleteGraph = (id: string) => {
    const graphToDelete = knowledgeGraphs.find((g) => g.id === id)
    if (!graphToDelete) return

    // Update category count
    const categoryToUpdate = categories.find((cat) => cat.id === graphToDelete.category)
    if (categoryToUpdate) {
      categoryToUpdate.graphCount -= 1
    }

    // Remove graph
    setKnowledgeGraphs(knowledgeGraphs.filter((g) => g.id !== id))

    setSuccessMessage(`Knowledge graph "${graphToDelete.name}" deleted successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  // Handle viewing a knowledge graph
  const handleViewGraph = (id: string) => {
    router.push(`/knowledge-graphs/${id}`)
  }

  return (
    <div className="h-[calc(100vh-120px)] flex">
      {/* Left Panel - Categories */}
      <div className="w-1/4 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 mr-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Folder className="h-5 w-5 text-blue-400 mr-2" />
            Categories
          </h2>
          <Button onClick={() => setShowCategoryModal(true)} className="bg-blue-700 hover:bg-blue-600 h-8 text-xs">
            <FolderPlus className="h-3.5 w-3.5 mr-1.5" />
            New Category
          </Button>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center justify-between p-2 rounded-md ${
              selectedCategory === null ? "bg-blue-900/50 text-white" : "hover:bg-blue-900/20 text-gray-300"
            }`}
          >
            <div className="flex items-center">
              <Folder className="h-4 w-4 mr-2" />
              <span>All Knowledge Graphs</span>
            </div>
            <span className="text-xs bg-blue-900/50 px-2 py-0.5 rounded-full">{knowledgeGraphs.length}</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md ${
                selectedCategory === category.id ? "bg-blue-900/50 text-white" : "hover:bg-blue-900/20 text-gray-300"
              }`}
            >
              <div className="flex items-center">
                {category.id === "usecase" ? (
                  <FileText className="h-4 w-4 mr-2" />
                ) : category.id === "sku" ? (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                ) : category.id === "price" ? (
                  <DollarSign className="h-4 w-4 mr-2" />
                ) : (
                  <Folder className="h-4 w-4 mr-2" />
                )}
                <span>{category.name}</span>
              </div>
              <span className="text-xs bg-blue-900/50 px-2 py-0.5 rounded-full">{category.graphCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Knowledge Graphs */}
      <div className="w-3/4 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Network className="h-5 w-5 text-blue-400 mr-2" />
            Knowledge Graphs
          </h2>
          <div className="flex space-x-2">
            <Button onClick={() => setShowUploadModal(true)} className="bg-green-700 hover:bg-green-600">
              <Upload className="h-4 w-4 mr-2" />
              Upload Data
            </Button>
            <Button onClick={() => setShowCreateModal(true)} className="bg-blue-700 hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Graph
            </Button>
          </div>
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
                The Knowledge Graphs management screen allows you to create, view, edit, and delete knowledge graphs.
                Knowledge graphs represent relationships between entities and concepts, enabling more sophisticated AI
                reasoning and context-aware responses.
              </p>

              <p className="mb-1 font-medium">How knowledge graphs are used:</p>
              <ul className="list-disc pl-4 space-y-1 mb-3">
                <li>
                  <span className="font-medium">Enhanced Context Understanding:</span> Knowledge graphs provide
                  structured relationships between entities, enabling the AI to understand complex domain contexts
                </li>
                <li>
                  <span className="font-medium">Relationship Inference:</span> The system can infer indirect
                  relationships that aren't explicitly stated in the source data
                </li>
                <li>
                  <span className="font-medium">Domain-Specific Reasoning:</span> Different knowledge graphs can be used
                  for different domains (finance, healthcare, etc.) to provide specialized knowledge
                </li>
                <li>
                  <span className="font-medium">Data Integration:</span> Knowledge graphs integrate data from multiple
                  sources into a unified representation
                </li>
              </ul>

              <p className="mb-1 font-medium">How to use this screen:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Browse knowledge graphs by category using the left panel</li>
                <li>Use the search box to find specific knowledge graphs by name or description</li>
                <li>Click "Create Graph" to define a new knowledge graph</li>
                <li>Click "Upload Data" to add data to an existing knowledge graph</li>
                <li>Click "New Category" to create a new category for organizing knowledge graphs</li>
                <li>Click the view icon to visualize and explore a knowledge graph</li>
                <li>Click the edit icon to modify a knowledge graph's properties</li>
                <li>Click the delete icon to remove a knowledge graph</li>
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
              placeholder="Search knowledge graphs by name or description..."
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
                <TableHead className="text-blue-200 font-medium">Name</TableHead>
                <TableHead className="text-blue-200 font-medium">Category</TableHead>
                <TableHead className="text-blue-200 font-medium">Nodes</TableHead>
                <TableHead className="text-blue-200 font-medium">Edges</TableHead>
                <TableHead className="text-blue-200 font-medium">Status</TableHead>
                <TableHead className="text-blue-200 font-medium">Last Updated</TableHead>
                <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGraphs.map((graph) => (
                <TableRow key={graph.id} className="hover:bg-blue-900/20">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Network className="h-4 w-4 text-blue-400 mr-2" />
                      <div>
                        <div className="font-medium">{graph.name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[250px]" title={graph.description}>
                          {graph.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{categories.find((cat) => cat.id === graph.category)?.name || graph.category}</TableCell>
                  <TableCell>{graph.nodes.toLocaleString()}</TableCell>
                  <TableCell>{graph.edges.toLocaleString()}</TableCell>
                  <TableCell>
                    {graph.status === "active" && (
                      <span className="px-2 py-0.5 rounded-full bg-green-900/50 text-green-300 text-xs">Active</span>
                    )}
                    {graph.status === "processing" && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 text-xs">
                        Processing
                      </span>
                    )}
                    {graph.status === "error" && (
                      <span className="px-2 py-0.5 rounded-full bg-red-900/50 text-red-300 text-xs">Error</span>
                    )}
                  </TableCell>
                  <TableCell>{graph.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-900/30"
                        onClick={() => handleViewGraph(graph.id)}
                        disabled={graph.status === "processing"}
                      >
                        <Eye className="h-3.5 w-3.5 text-blue-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-yellow-900/30"
                        disabled={graph.status === "processing"}
                      >
                        <Edit className="h-3.5 w-3.5 text-yellow-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-900/30"
                        onClick={() => handleDeleteGraph(graph.id)}
                        disabled={graph.status === "processing"}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredGraphs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    <Network className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                    No knowledge graphs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
          <div>
            {filteredGraphs.length} knowledge graphs • Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
