"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, ZoomIn, ZoomOut, RotateCw, Filter, Edit, Trash2, Eye, EyeOff, Layers, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GraphNode {
  id: string
  label: string
  type: string
  properties?: Record<string, any>
}

interface GraphEdge {
  id: string
  source: string
  target: string
  label: string
  properties?: Record<string, any>
}

interface KnowledgeGraphData {
  id: string
  name: string
  category: string
  description: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  createdAt: string
  updatedAt: string
  status: "active" | "processing" | "error"
  dataSource: string
}

export function KnowledgeGraphViewer({ id }: { id: string }) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Sample data for the knowledge graph
  const [graphData, setGraphData] = useState<KnowledgeGraphData>({
    id,
    name: "Financial Services Domain",
    category: "finance",
    description: "Knowledge graph for financial services domain including banking, insurance, and investments",
    nodes: [
      { id: "bank", label: "Bank", type: "Organization" },
      { id: "customer", label: "Customer", type: "Person" },
      { id: "account", label: "Account", type: "Product" },
      { id: "transaction", label: "Transaction", type: "Event" },
      { id: "loan", label: "Loan", type: "Product" },
      { id: "credit_card", label: "Credit Card", type: "Product" },
      { id: "investment", label: "Investment", type: "Product" },
      { id: "stock", label: "Stock", type: "Asset" },
      { id: "bond", label: "Bond", type: "Asset" },
      { id: "mutual_fund", label: "Mutual Fund", type: "Asset" },
      { id: "branch", label: "Branch", type: "Location" },
      { id: "employee", label: "Employee", type: "Person" },
      { id: "regulation", label: "Regulation", type: "Concept" },
      { id: "risk", label: "Risk", type: "Concept" },
      { id: "interest_rate", label: "Interest Rate", type: "Concept" },
    ],
    edges: [
      { id: "e1", source: "bank", target: "customer", label: "serves" },
      { id: "e2", source: "customer", target: "account", label: "owns" },
      { id: "e3", source: "customer", target: "loan", label: "borrows" },
      { id: "e4", source: "customer", target: "credit_card", label: "holds" },
      { id: "e5", source: "customer", target: "investment", label: "makes" },
      { id: "e6", source: "bank", target: "loan", label: "provides" },
      { id: "e7", source: "bank", target: "account", label: "manages" },
      { id: "e8", source: "bank", target: "credit_card", label: "issues" },
      { id: "e9", source: "bank", target: "investment", label: "offers" },
      { id: "e10", source: "investment", target: "stock", label: "includes" },
      { id: "e11", source: "investment", target: "bond", label: "includes" },
      { id: "e12", source: "investment", target: "mutual_fund", label: "includes" },
      { id: "e13", source: "bank", target: "branch", label: "has" },
      { id: "e14", source: "branch", target: "employee", label: "employs" },
      { id: "e15", source: "bank", target: "regulation", label: "complies_with" },
      { id: "e16", source: "loan", target: "risk", label: "has" },
      { id: "e17", source: "loan", target: "interest_rate", label: "has" },
      { id: "e18", source: "account", target: "transaction", label: "contains" },
      { id: "e19", source: "customer", target: "transaction", label: "initiates" },
      { id: "e20", source: "employee", target: "customer", label: "assists" },
    ],
    createdAt: "2023-05-15",
    updatedAt: "2023-06-20",
    status: "active",
    dataSource: "Financial Services Documentation",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showNodeLabels, setShowNodeLabels] = useState(true)
  const [showEdgeLabels, setShowEdgeLabels] = useState(true)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isEditingNode, setIsEditingNode] = useState(false)
  const [editedNode, setEditedNode] = useState<GraphNode | null>(null)

  // Add state for use case, SKU, and pricing information
  const [useCaseInfo, setUseCaseInfo] = useState({
    name: "Fraud Detection",
    industry: "Financial Services",
    description: "Detect fraudulent transactions in real-time",
  })

  const [skuInfo, setSkuInfo] = useState([
    {
      name: "Intel® Xeon® Scalable Processors",
      price: 18000,
      description: "High-performance server processors optimized for data center workloads",
    },
    { name: "Intel® Habana® Gaudi2 Accelerators", price: 17000, description: "Deep Learning Accelerators" },
    { name: "Intel® SSD D7-P5520", price: 9600, description: "High-performance data center SSDs" },
    {
      name: "Intel® Optane™ Persistent Memory",
      price: 13600,
      description: "Persistent memory technology for high-performance storage",
    },
    { name: "Intel® oneAPI AI Analytics Toolkit", price: 5000, description: "AI Analytics Toolkit" },
    { name: "Intel® Distribution of OpenVINO™", price: 3000, description: "Distribution of OpenVINO Toolkit" },
  ])

  const [pricingInfo, setPricingInfo] = useState({
    basePrice: 25000,
    dataVolumePrice: 2000,
    userCountPrice: 100,
    supportPrice: 5000,
  })

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = pricingInfo.basePrice + pricingInfo.supportPrice
    skuInfo.forEach((sku) => {
      totalPrice += sku.price
    })
    return totalPrice
  }

  // Filter nodes based on search term
  const filteredNodes = graphData.nodes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get node types for filtering
  const nodeTypes = Array.from(new Set(graphData.nodes.map((node) => node.type)))

  // Get edge types for filtering
  const edgeTypes = Array.from(new Set(graphData.edges.map((edge) => edge.label)))

  // Handle going back to the knowledge graphs list
  const handleBack = () => {
    router.push("/knowledge-graphs")
  }

  // Handle zooming in and out
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Handle node selection
  const handleSelectNode = (node: GraphNode) => {
    setSelectedNode(node)
    setSelectedEdge(null)
  }

  // Handle edge selection
  const handleSelectEdge = (edge: GraphEdge) => {
    setSelectedEdge(edge)
    setSelectedNode(null)
  }

  // Handle editing a node
  const handleEditNode = () => {
    if (!selectedNode) return
    setEditedNode({ ...selectedNode })
    setIsEditingNode(true)
  }

  // Handle saving edited node
  const handleSaveNode = () => {
    if (!editedNode) return

    // Update node in graph data
    setGraphData({
      ...graphData,
      nodes: graphData.nodes.map((node) => (node.id === editedNode.id ? editedNode : node)),
    })

    setSuccessMessage(`Node "${editedNode.label}" updated successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    setIsEditingNode(false)
    setEditedNode(null)
    setSelectedNode(editedNode)
  }

  // Handle deleting a node
  const handleDeleteNode = () => {
    if (!selectedNode) return

    // Remove node and connected edges
    setGraphData({
      ...graphData,
      nodes: graphData.nodes.filter((node) => node.id !== selectedNode.id),
      edges: graphData.edges.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id),
    })

    setSuccessMessage(`Node "${selectedNode.label}" and its connections deleted`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    setSelectedNode(null)
  }

  // Handle deleting an edge
  const handleDeleteEdge = () => {
    if (!selectedEdge) return

    // Remove edge
    setGraphData({
      ...graphData,
      edges: graphData.edges.filter((edge) => edge.id !== selectedEdge.id),
    })

    setSuccessMessage(`Relationship "${selectedEdge.label}" deleted`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    setSelectedEdge(null)
  }

  // Simple force-directed graph layout simulation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize node positions randomly
    const nodePositions: Record<string, { x: number; y: number; vx: number; vy: number }> = {}

    graphData.nodes.forEach((node) => {
      nodePositions[node.id] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
      }
    })

    // Force-directed layout simulation
    const simulation = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Apply forces
      for (let i = 0; i < 10; i++) {
        // Run multiple iterations per frame for faster convergence
        // Repulsive force between nodes
        for (let i = 0; i < graphData.nodes.length; i++) {
          const nodeA = graphData.nodes[i]
          const posA = nodePositions[nodeA.id]

          for (let j = i + 1; j < graphData.nodes.length; j++) {
            const nodeB = graphData.nodes[j]
            const posB = nodePositions[nodeB.id]

            const dx = posB.x - posA.x
            const dy = posB.y - posA.y
            const distance = Math.sqrt(dx * dx + dy * dy) || 1

            // Repulsive force (inverse square law)
            const force = 1000 / (distance * distance)
            const fx = (dx / distance) * force
            const fy = (dy / distance) * force

            posA.vx -= fx
            posA.vy -= fy
            posB.vx += fx
            posB.vy += fy
          }
        }

        // Attractive force along edges
        graphData.edges.forEach((edge) => {
          const sourcePos = nodePositions[edge.source]
          const targetPos = nodePositions[edge.target]

          if (sourcePos && targetPos) {
            const dx = targetPos.x - sourcePos.x
            const dy = targetPos.y - sourcePos.y
            const distance = Math.sqrt(dx * dx + dy * dy) || 1

            // Attractive force (spring-like)
            const force = 0.05 * (distance - 100)
            const fx = (dx / distance) * force
            const fy = (dy / distance) * force

            sourcePos.vx += fx
            sourcePos.vy += fy
            targetPos.vx -= fx
            targetPos.vy -= fy
          }
        })

        // Update positions with velocity and damping
        Object.values(nodePositions).forEach((pos) => {
          pos.vx *= 0.9 // Damping
          pos.vy *= 0.9 // Damping
          pos.x += pos.vx
          pos.y += pos.vy

          // Boundary constraints
          if (pos.x < 50) pos.x = 50
          if (pos.x > canvas.width - 50) pos.x = canvas.width - 50
          if (pos.y < 50) pos.y = 50
          if (pos.y > canvas.height - 50) pos.y = canvas.height - 50
        })
      }

      // Draw edges
      graphData.edges.forEach((edge) => {
        const sourcePos = nodePositions[edge.source]
        const targetPos = nodePositions[edge.target]

        if (sourcePos && targetPos) {
          // Draw edge
          ctx.beginPath()
          ctx.moveTo(sourcePos.x, sourcePos.y)
          ctx.lineTo(targetPos.x, targetPos.y)

          // Highlight selected edge
          if (selectedEdge && selectedEdge.id === edge.id) {
            ctx.strokeStyle = "#3b82f6" // Blue
            ctx.lineWidth = 3
          } else {
            ctx.strokeStyle = "rgba(148, 163, 184, 0.5)" // Light gray
            ctx.lineWidth = 1
          }

          ctx.stroke()

          // Draw edge label
          if (showEdgeLabels) {
            const midX = (sourcePos.x + targetPos.x) / 2
            const midY = (sourcePos.y + targetPos.y) / 2

            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.font = "10px sans-serif"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(edge.label, midX, midY)
          }
        }
      })

      // Draw nodes
      graphData.nodes.forEach((node) => {
        const pos = nodePositions[node.id]

        if (pos) {
          // Draw node circle
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2)

          // Color based on node type
          let fillColor = "#3b82f6" // Default blue

          switch (node.type) {
            case "Organization":
              fillColor = "#3b82f6" // Blue
              break
            case "Person":
              fillColor = "#10b981" // Green
              break
            case "Product":
              fillColor = "#f59e0b" // Amber
              break
            case "Event":
              fillColor = "#ef4444" // Red
              break
            case "Asset":
              fillColor = "#8b5cf6" // Purple
              break
            case "Location":
              fillColor = "#ec4899" // Pink
              break
            case "Concept":
              fillColor = "#6366f1" // Indigo
              break
          }

          // Highlight selected node
          if (selectedNode && selectedNode.id === node.id) {
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 3
          } else {
            ctx.strokeStyle = "rgba(30, 41, 59, 0.8)"
            ctx.lineWidth = 1
          }

          ctx.fillStyle = fillColor
          ctx.fill()
          ctx.stroke()

          // Draw node label
          if (showNodeLabels) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
            ctx.font = "12px sans-serif"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(node.label, pos.x, pos.y + 25)
          }
        }
      })

      requestAnimationFrame(simulation)
    }

    const animationId = requestAnimationFrame(simulation)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [graphData, selectedNode, selectedEdge, showNodeLabels, showEdgeLabels, zoomLevel])

  return (
    <div className="h-[calc(100vh-120px)] flex">
      {/* Left Panel - Controls and Filters */}
      <div className="w-1/4 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Search Entities</h3>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search nodes by label or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-blue-950/30 border-blue-800/50 h-8 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Visualization Controls</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Zoom Level</span>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleZoomOut}>
                  <ZoomOut className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs mx-1">{Math.round(zoomLevel * 100)}%</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleZoomIn}>
                  <ZoomIn className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs">Show Node Labels</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowNodeLabels(!showNodeLabels)}
              >
                {showNodeLabels ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs">Show Edge Labels</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowEdgeLabels(!showEdgeLabels)}
              >
                {showEdgeLabels ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </Button>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <RotateCw className="h-3.5 w-3.5 mr-1.5" />
              Reset View
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Filter</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-xs mb-1">Node Types</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {nodeTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input type="checkbox" id={`type-${type}`} className="mr-2" defaultChecked />
                    <label htmlFor={`type-${type}`} className="text-xs">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1">Relationship Types</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {edgeTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input type="checkbox" id={`rel-${type}`} className="mr-2" defaultChecked />
                    <label htmlFor={`rel-${type}`} className="text-xs">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-4 flex-1 overflow-y-auto">
            <h3 className="text-sm font-medium mb-2">Search Results</h3>
            <div className="space-y-1">
              {filteredNodes.length > 0 ? (
                filteredNodes.map((node) => (
                  <button
                    key={node.id}
                    className="w-full text-left p-2 rounded-md hover:bg-blue-900/30 flex items-center"
                    onClick={() => handleSelectNode(node)}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <div>
                      <div className="text-xs font-medium">{node.label}</div>
                      <div className="text-[10px] text-gray-400">{node.type}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-400 text-center py-2">No nodes found</div>
              )}
            </div>
          </div>
        )}

        {/* Selected Entity Details */}
        {(selectedNode || selectedEdge) && (
          <div className="mt-auto pt-4 border-t border-blue-900/50">
            <h3 className="text-sm font-medium mb-2">{selectedNode ? "Selected Node" : "Selected Relationship"}</h3>

            {selectedNode && !isEditingNode && (
              <div className="bg-blue-900/20 rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{selectedNode.label}</div>
                    <div className="text-xs text-blue-300">{selectedNode.type}</div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleEditNode}>
                      <Edit className="h-3.5 w-3.5 text-yellow-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDeleteNode}>
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </Button>
                  </div>
                </div>

                <div className="text-xs">
                  <div className="font-medium mb-1">Connected To:</div>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {graphData.edges
                      .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
                      .map((edge) => {
                        const isSource = edge.source === selectedNode.id
                        const connectedNodeId = isSource ? edge.target : edge.source
                        const connectedNode = graphData.nodes.find((n) => n.id === connectedNodeId)

                        return (
                          <div key={edge.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-gray-400">{isSource ? "→" : "←"}</span>
                              <span className="ml-1">{connectedNode?.label}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                              onClick={() => handleSelectEdge(edge)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}

            {selectedNode && isEditingNode && editedNode && (
              <div className="bg-blue-900/20 rounded-md p-3">
                <div className="mb-2">
                  <label className="block text-xs mb-1">Label</label>
                  <Input
                    value={editedNode.label}
                    onChange={(e) => setEditedNode({ ...editedNode, label: e.target.value })}
                    className="h-7 text-xs bg-blue-950/30 border-blue-800/50"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-xs mb-1">Type</label>
                  <select
                    value={editedNode.type}
                    onChange={(e) => setEditedNode({ ...editedNode, type: e.target.value })}
                    className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-7 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    {nodeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      setIsEditingNode(false)
                      setEditedNode(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" className="h-7 text-xs bg-blue-700" onClick={handleSaveNode}>
                    Save
                  </Button>
                </div>
              </div>
            )}

            {selectedEdge && (
              <div className="bg-blue-900/20 rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{selectedEdge.label}</div>
                    <div className="text-xs text-blue-300">Relationship</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDeleteEdge}>
                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                  </Button>
                </div>

                <div className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400">From:</span>
                    <span>{graphData.nodes.find((n) => n.id === selectedEdge.source)?.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">To:</span>
                    <span>{graphData.nodes.find((n) => n.id === selectedEdge.target)?.label}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel - Graph Visualization */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 relative">
        <canvas ref={canvasRef} className="w-full h-full" style={{ transform: `scale(${zoomLevel})` }} />

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-md p-2 border border-blue-900/50">
          <div className="text-xs font-medium mb-1">Node Types</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
              <span className="text-xs">Organization</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-xs">Person</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></div>
              <span className="text-xs">Product</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
              <span className="text-xs">Event</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-1.5"></div>
              <span className="text-xs">Asset</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-md p-2 border border-blue-900/50">
          <div className="text-xs">
            <div className="flex items-center mb-1">
              <Database className="h-3 w-3 mr-1.5 text-blue-400" />
              <span>{graphData.nodes.length} nodes</span>
            </div>
            <div className="flex items-center">
              <Layers className="h-3 w-3 mr-1.5 text-blue-400" />
              <span>{graphData.edges.length} relationships</span>
            </div>
          </div>
        </div>

        {/* Use Case, SKU, and Pricing Information */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-md p-2 border border-blue-900/50 w-72">
          <h3 className="text-sm font-medium mb-2">Use Case</h3>
          <div className="text-xs space-y-1">
            <div>
              <span className="text-gray-400">Name:</span> {useCaseInfo.name}
            </div>
            <div>
              <span className="text-gray-400">Industry:</span> {useCaseInfo.industry}
            </div>
            <div>
              <span className="text-gray-400">Description:</span> {useCaseInfo.description}
            </div>
          </div>

          <h3 className="text-sm font-medium mt-3 mb-2">Selected SKUs</h3>
          <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {skuInfo.map((sku, index) => (
              <div key={index} className="flex justify-between py-1 border-b border-blue-900/30">
                <span className="truncate pr-2">{sku.name}</span>
                <span className="text-blue-300">${sku.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 font-medium">
              <span>Total SKUs:</span>
              <span>${skuInfo.reduce((sum, sku) => sum + sku.price, 0).toLocaleString()}</span>
            </div>
          </div>

          <h3 className="text-sm font-medium mt-3 mb-2">Pricing</h3>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Base Price:</span>
              <span>${pricingInfo.basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Data Volume:</span>
              <span>${pricingInfo.dataVolumePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">User Licensing:</span>
              <span>${pricingInfo.userCountPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Support:</span>
              <span>${pricingInfo.supportPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 font-medium text-blue-300 border-t border-blue-900/30">
              <span>Total:</span>
              <span>${calculateTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
