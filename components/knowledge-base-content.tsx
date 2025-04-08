"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Trash2,
  X,
  FileText,
  Download,
  Upload,
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  FileSpreadsheet,
  FileCode,
  File,
  FileIcon as FilePdf,
  FileImage,
  FolderPlus,
  Folder,
  Eye,
  Edit,
  Info,
  Save,
} from "lucide-react"

interface Document {
  id: string
  name: string
  category: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  description: string
  tags: string[]
  version: string
  previousVersions?: { version: string; uploadedAt: string; uploadedBy: string }[]
}

interface Category {
  id: string
  name: string
  description: string
  documentCount: number
}

export function KnowledgeBaseContent() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Intel_Xeon_Sizing_Guidelines_2023.pdf",
      category: "sizing-guidelines",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "John Smith",
      uploadedAt: "2023-01-15",
      description: "Official sizing guidelines for Intel Xeon processors in AI workloads",
      tags: ["sizing", "xeon", "guidelines"],
      version: "1.0",
    },
    {
      id: "2",
      name: "Financial_Services_Fraud_Detection_Reference_Architecture.pptx",
      category: "reference-architectures",
      type: "pptx",
      size: "5.7 MB",
      uploadedBy: "Sarah Johnson",
      uploadedAt: "2023-02-20",
      description: "Reference architecture for fraud detection in financial services using Intel technologies",
      tags: ["reference", "financial-services", "fraud-detection"],
      version: "1.0",
    },
    {
      id: "3",
      name: "Habana_Gaudi2_Performance_Benchmarks.xlsx",
      category: "benchmarks",
      type: "xlsx",
      size: "1.2 MB",
      uploadedBy: "Michael Brown",
      uploadedAt: "2023-03-10",
      description: "Performance benchmarks for Habana Gaudi2 accelerators across various AI workloads",
      tags: ["benchmarks", "habana", "gaudi2", "performance"],
      version: "1.0",
    },
    {
      id: "4",
      name: "Healthcare_AI_Solution_Brief.pdf",
      category: "solution-briefs",
      type: "pdf",
      size: "3.1 MB",
      uploadedBy: "Emily Davis",
      uploadedAt: "2023-04-05",
      description: "Solution brief for healthcare AI applications using Intel technologies",
      tags: ["healthcare", "solution", "brief"],
      version: "1.0",
    },
    {
      id: "5",
      name: "Intel_oneAPI_Optimization_Guide.pdf",
      category: "technical-guides",
      type: "pdf",
      size: "4.8 MB",
      uploadedBy: "David Wilson",
      uploadedAt: "2023-05-12",
      description: "Comprehensive guide for optimizing AI workloads with Intel oneAPI",
      tags: ["oneapi", "optimization", "guide"],
      version: "2.1",
      previousVersions: [
        { version: "1.0", uploadedAt: "2022-11-05", uploadedBy: "David Wilson" },
        { version: "2.0", uploadedAt: "2023-02-18", uploadedBy: "David Wilson" },
      ],
    },
    {
      id: "6",
      name: "Retail_Recommendation_Engine_Case_Study.docx",
      category: "case-studies",
      type: "docx",
      size: "1.9 MB",
      uploadedBy: "James Thomas",
      uploadedAt: "2023-06-18",
      description: "Case study of a retail recommendation engine implementation using Intel technologies",
      tags: ["retail", "recommendation", "case-study"],
      version: "1.0",
    },
    {
      id: "7",
      name: "Intel_OpenVINO_Deployment_Guide.pdf",
      category: "technical-guides",
      type: "pdf",
      size: "3.5 MB",
      uploadedBy: "Lisa Anderson",
      uploadedAt: "2023-07-22",
      description: "Guide for deploying AI models with Intel OpenVINO toolkit",
      tags: ["openvino", "deployment", "guide"],
      version: "1.2",
      previousVersions: [
        { version: "1.0", uploadedAt: "2023-05-10", uploadedBy: "Lisa Anderson" },
        { version: "1.1", uploadedAt: "2023-06-15", uploadedBy: "Lisa Anderson" },
      ],
    },
    {
      id: "8",
      name: "Manufacturing_Defect_Detection_Solution.pptx",
      category: "solution-briefs",
      type: "pptx",
      size: "6.2 MB",
      uploadedBy: "Robert Martinez",
      uploadedAt: "2023-08-30",
      description: "Solution for manufacturing defect detection using computer vision and Intel technologies",
      tags: ["manufacturing", "defect-detection", "computer-vision"],
      version: "1.0",
    },
  ])

  const categories: Category[] = [
    {
      id: "sizing-guidelines",
      name: "Sizing Guidelines",
      description: "Hardware and software sizing guidelines for Intel technologies",
      documentCount: 1,
    },
    {
      id: "reference-architectures",
      name: "Reference Architectures",
      description: "Validated architectures for various use cases and industries",
      documentCount: 1,
    },
    {
      id: "benchmarks",
      name: "Benchmarks",
      description: "Performance benchmarks for Intel hardware and software",
      documentCount: 1,
    },
    {
      id: "solution-briefs",
      name: "Solution Briefs",
      description: "Brief overviews of Intel solutions for specific use cases",
      documentCount: 2,
    },
    {
      id: "technical-guides",
      name: "Technical Guides",
      description: "Detailed technical guides for Intel technologies",
      documentCount: 2,
    },
    {
      id: "case-studies",
      name: "Case Studies",
      description: "Real-world implementations and results",
      documentCount: 1,
    },
    {
      id: "white-papers",
      name: "White Papers",
      description: "In-depth analysis and research papers",
      documentCount: 0,
    },
    {
      id: "product-documentation",
      name: "Product Documentation",
      description: "Official product documentation and manuals",
      documentCount: 0,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
    version: "1.0",
  })

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [documentToUpdate, setDocumentToUpdate] = useState<Document | null>(null)
  const [updateData, setUpdateData] = useState({
    description: "",
    tags: "",
    version: "",
  })

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const handleUpdateDocument = () => {
    if (!documentToUpdate) return

    // Generate new version if not provided
    const newVersion = updateData.version || (Number.parseFloat(documentToUpdate.version) + 0.1).toFixed(1)

    // Create previous versions array if it doesn't exist
    const previousVersions = documentToUpdate.previousVersions || []

    // Add current version to previous versions
    previousVersions.push({
      version: documentToUpdate.version,
      uploadedAt: documentToUpdate.uploadedAt,
      uploadedBy: documentToUpdate.uploadedBy,
    })

    // Update the document
    const today = new Date().toISOString().split("T")[0]

    setDocuments(
      documents.map((doc) => {
        if (doc.id === documentToUpdate.id) {
          return {
            ...doc,
            description: updateData.description || doc.description,
            tags: updateData.tags ? updateData.tags.split(",").map((tag) => tag.trim()) : doc.tags,
            version: newVersion,
            uploadedAt: today,
            previousVersions,
          }
        }
        return doc
      }),
    )

    setSuccessMessage(`Document "${documentToUpdate.name}" updated to version ${newVersion}`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form and close modal
    setShowUpdateModal(false)
    setDocumentToUpdate(null)
    setUpdateData({
      description: "",
      tags: "",
      version: "",
    })
  }

  const handleOpenUpdateModal = (document: Document) => {
    setDocumentToUpdate(document)
    setUpdateData({
      description: document.description,
      tags: document.tags.join(", "),
      version: (Number.parseFloat(document.version) + 0.1).toFixed(1),
    })
    setShowUpdateModal(true)
  }

  const handleUploadDocument = () => {
    if (!newDocument.name || !newDocument.category) return

    // Generate new document ID
    const newId = (Math.max(...documents.map((doc) => Number.parseInt(doc.id))) + 1).toString()

    // Determine file type from name
    const fileExtension = newDocument.name.split(".").pop()?.toLowerCase() || ""
    const fileType = fileExtension

    // Add new document
    const today = new Date().toISOString().split("T")[0]
    const documentToAdd: Document = {
      id: newId,
      name: newDocument.name,
      category: newDocument.category,
      type: fileType,
      size: "0 KB", // This would be determined by the actual file in a real implementation
      uploadedBy: "Current User", // This would be the actual user in a real implementation
      uploadedAt: today,
      description: newDocument.description,
      tags: newDocument.tags.split(",").map((tag) => tag.trim()),
      version: "1.0",
    }

    setDocuments([...documents, documentToAdd])

    // Update category document count
    const categoryToUpdate = categories.find((cat) => cat.id === newDocument.category)
    if (categoryToUpdate) {
      categoryToUpdate.documentCount += 1
    }

    setSuccessMessage(`Document "${newDocument.name}" uploaded successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form and close modal
    setShowUploadModal(false)
    setNewDocument({
      name: "",
      category: "",
      description: "",
      tags: "",
      version: "1.0",
    })
  }

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
      documentCount: 0,
    }

    categories.push(categoryToAdd)

    setSuccessMessage(`Category "${newCategory.name}" added successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)

    // Reset form and close modal
    setShowCategoryModal(false)
    setNewCategory({ name: "", description: "" })
  }

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setShowDocumentModal(true)
  }

  const handleDeleteDocument = (id: string) => {
    const documentToDelete = documents.find((doc) => doc.id === id)
    if (!documentToDelete) return

    // Update category document count
    const categoryToUpdate = categories.find((cat) => cat.id === documentToDelete.category)
    if (categoryToUpdate) {
      categoryToUpdate.documentCount -= 1
    }

    // Remove document
    setDocuments(documents.filter((doc) => doc.id !== id))

    setSuccessMessage(`Document "${documentToDelete.name}" deleted successfully`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FilePdf className="h-4 w-4 text-red-400" />
      case "docx":
      case "doc":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="h-4 w-4 text-green-400" />
      case "pptx":
      case "ppt":
        return <FileImage className="h-4 w-4 text-orange-400" />
      case "txt":
        return <FileText className="h-4 w-4 text-gray-400" />
      case "json":
      case "xml":
      case "yaml":
        return <FileCode className="h-4 w-4 text-purple-400" />
      default:
        return <File className="h-4 w-4 text-gray-400" />
    }
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
              <span>All Documents</span>
            </div>
            <span className="text-xs bg-blue-900/50 px-2 py-0.5 rounded-full">{documents.length}</span>
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
                <Folder className="h-4 w-4 mr-2" />
                <span>{category.name}</span>
              </div>
              <span className="text-xs bg-blue-900/50 px-2 py-0.5 rounded-full">{category.documentCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Documents */}
      <div className="w-3/4 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            Knowledge Base Documents
          </h2>
          <Button onClick={() => setShowUploadModal(true)} className="bg-blue-700 hover:bg-blue-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
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
                The Knowledge Base is a centralized repository for all documents that can be used across proposals. This
                includes sizing guidelines, reference architectures, solution briefs, and other technical documentation.
                Documents uploaded here are converted into vector embeddings to power AI-assisted features throughout
                the application.
              </p>

              <p className="mb-1 font-medium">How documents are used:</p>
              <ul className="list-disc pl-4 space-y-1 mb-3">
                <li>
                  <span className="font-medium">Use Case Exploration:</span> Documents provide domain knowledge to
                  generate more accurate and relevant use case analyses
                </li>
                <li>
                  <span className="font-medium">AI Pipeline Building:</span> Technical specifications from documents
                  help optimize component selection and architecture design
                </li>
                <li>
                  <span className="font-medium">Sizing Calculations:</span> Sizing guidelines are used to recommend
                  appropriate hardware configurations based on workload requirements
                </li>
                <li>
                  <span className="font-medium">Bill of Materials:</span> Product documentation informs accurate
                  component selection and pricing for proposals
                </li>
                <li>
                  <span className="font-medium">Proposal Generation:</span> Case studies and reference architectures are
                  used to enhance proposal content with proven solutions
                </li>
              </ul>

              <p className="mb-1 font-medium text-blue-300">Vector Embedding Technology:</p>
              <p className="mb-3 text-blue-100">
                Documents are processed using advanced NLP techniques to create vector embeddings, allowing the AI to
                understand and retrieve relevant information contextually. This enables the system to provide
                intelligent recommendations and insights based on your specific requirements.
              </p>

              <p className="mb-1 font-medium">How to use this screen:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Browse documents by category using the left panel or the category sections</li>
                <li>Expand/collapse categories to focus on relevant document groups</li>
                <li>Use the search box to find specific documents by name, description, or tags</li>
                <li>Click "Upload Document" to add new documents to the knowledge base</li>
                <li>Click "New Category" to create a new document category</li>
                <li>Hover over truncated descriptions to see the full text</li>
                <li>Click the view icon to preview a document</li>
                <li>Click the download icon to download a document</li>
                <li>Click the edit icon to update a document with a new version</li>
                <li>Click the delete icon to remove outdated documents</li>
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
              placeholder="Search documents by name, description, or tags..."
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
        </div>

        {/* Category-based document layout */}
        {searchTerm ? (
          // When searching, show flat list of results
          <div className="space-y-4">
            <div className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden">
              <div className="bg-blue-900/40 px-4 py-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-blue-100">Search Results</h3>
                <span className="text-xs bg-blue-800/60 px-2 py-0.5 rounded-full text-blue-200">
                  {filteredDocuments.length} documents
                </span>
              </div>
              <div className="p-2">
                {filteredDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {filteredDocuments.map((document) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        categories={categories}
                        onView={handleViewDocument}
                        onUpdate={handleOpenUpdateModal}
                        onDelete={handleDeleteDocument}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Search className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                    No documents found matching your search criteria
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // When not searching, group by category
          <div className="space-y-4">
            {categories
              .filter((category) => {
                // Only show categories that have documents or match the selected category
                const hasDocuments = documents.some((doc) => doc.category === category.id)
                return hasDocuments || selectedCategory === category.id
              })
              .map((category) => {
                // Get documents for this category
                const categoryDocuments = documents.filter((doc) => doc.category === category.id)
                // Determine if this category should be expanded
                const isCategoryExpanded = selectedCategory === category.id || selectedCategory === null

                return (
                  <div
                    key={category.id}
                    className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden"
                  >
                    <button
                      className="w-full bg-blue-900/40 px-4 py-2 flex items-center justify-between"
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    >
                      <h3 className="text-sm font-medium text-blue-100 flex items-center">
                        <Folder className="h-4 w-4 mr-2 text-blue-300" />
                        {category.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-xs bg-blue-800/60 px-2 py-0.5 rounded-full text-blue-200 mr-2">
                          {categoryDocuments.length} documents
                        </span>
                        {isCategoryExpanded ? (
                          <ChevronDown className="h-4 w-4 text-blue-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-blue-300" />
                        )}
                      </div>
                    </button>

                    {isCategoryExpanded && (
                      <div className="p-2">
                        {categoryDocuments.length > 0 ? (
                          <div className="grid grid-cols-1 gap-2">
                            {categoryDocuments.map((document) => (
                              <DocumentCard
                                key={document.id}
                                document={document}
                                categories={categories}
                                onView={handleViewDocument}
                                onUpdate={handleOpenUpdateModal}
                                onDelete={handleDeleteDocument}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-400">
                            <Folder className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                            No documents in this category
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

            {categories.filter((category) => documents.some((doc) => doc.category === category.id)).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <FileText className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                No documents in the knowledge base
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
          <div>
            {documents.length} documents • Last updated: {new Date().toLocaleDateString()}
          </div>
          <div>
            Total size:{" "}
            {documents.reduce((total, doc) => total + Number.parseFloat(doc.size.split(" ")[0]), 0).toFixed(1)} MB
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Upload className="h-5 w-5 text-blue-400 mr-2" />
                Upload Document
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Document Name</label>
                <Input
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  placeholder="Enter document name with extension (e.g., sizing_guide.pdf)"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value })}
                  className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <Input
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                  placeholder="Enter document description"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                <Input
                  value={newDocument.tags}
                  onChange={(e) => setNewDocument({ ...newDocument, tags: e.target.value })}
                  placeholder="Enter tags separated by commas (e.g., sizing, xeon, guidelines)"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div className="border border-dashed border-blue-800 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300 mb-1">Drag and drop file here or click to browse</p>
                <p className="text-xs text-gray-400 mb-3">Supported formats: PDF, DOCX, XLSX, PPTX, etc.</p>
                <Button className="bg-blue-700 hover:bg-blue-600">Browse Files</Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUploadDocument}
                className="bg-blue-700 hover:bg-blue-600"
                disabled={!newDocument.name || !newDocument.category}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <FolderPlus className="h-5 w-5 text-blue-400 mr-2" />
                Add Category
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCategoryModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category Name</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <Input
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowCategoryModal(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                className="bg-blue-700 hover:bg-blue-600"
                disabled={!newCategory.name}
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                {getDocumentIcon(selectedDocument.type)}
                <span className="ml-2">{selectedDocument.name}</span>
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDocumentModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-black/40 rounded-lg border border-blue-900/50 p-4 mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Category</p>
                  <p className="text-sm">
                    {categories.find((cat) => cat.id === selectedDocument.category)?.name || selectedDocument.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">File Type</p>
                  <p className="text-sm uppercase">{selectedDocument.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Size</p>
                  <p className="text-sm">{selectedDocument.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Uploaded</p>
                  <p className="text-sm">
                    {selectedDocument.uploadedAt} by {selectedDocument.uploadedBy}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Version</p>
                  <p className="text-sm">{selectedDocument.version}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Previous Versions</p>
                  <p className="text-sm">{selectedDocument.previousVersions?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <p className="text-sm">{selectedDocument.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {selectedDocument.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {selectedDocument.previousVersions && selectedDocument.previousVersions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2">Version History</p>
                <div className="bg-black/40 rounded-lg border border-blue-900/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-900/40 hover:bg-blue-900/50">
                        <TableHead className="text-blue-200 font-medium">Version</TableHead>
                        <TableHead className="text-blue-200 font-medium">Date</TableHead>
                        <TableHead className="text-blue-200 font-medium">Uploaded By</TableHead>
                        <TableHead className="text-blue-200 font-medium w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedDocument.previousVersions.map((version, index) => (
                        <TableRow key={index} className="hover:bg-blue-900/20">
                          <TableCell>{version.version}</TableCell>
                          <TableCell>{version.uploadedAt}</TableCell>
                          <TableCell>{version.uploadedBy}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-green-900/30">
                              <Download className="h-3.5 w-3.5 text-green-400" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            <div className="border border-blue-900/50 rounded-lg p-8 bg-black/40 flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-16 w-16 text-blue-400 mb-4" />
              <p className="text-center text-gray-300 mb-2">Document preview not available</p>
              <p className="text-center text-gray-400 text-sm mb-4">Download the document to view its contents</p>
              <Button className="bg-blue-700 hover:bg-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Download Document
              </Button>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Document Modal */}
      {showUpdateModal && documentToUpdate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg border border-blue-900/50 p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Edit className="h-5 w-5 text-blue-400 mr-2" />
                Update Document: {documentToUpdate.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUpdateModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-4 flex items-start">
              <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>
                  You are updating document "{documentToUpdate.name}" from version {documentToUpdate.version}. The
                  current version will be preserved in the version history.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <Input
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  placeholder="Enter updated description"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                <Input
                  value={updateData.tags}
                  onChange={(e) => setUpdateData({ ...updateData, tags: e.target.value })}
                  placeholder="Enter updated tags separated by commas"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">New Version</label>
                <Input
                  value={updateData.version}
                  onChange={(e) => setUpdateData({ ...updateData, version: e.target.value })}
                  placeholder="Enter new version number (e.g., 1.1)"
                  className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Leave blank to automatically increment version number</p>
              </div>

              <div className="border border-dashed border-blue-800 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300 mb-1">Drag and drop updated file here or click to browse</p>
                <p className="text-xs text-gray-400 mb-3">File should be the same type as the original</p>
                <Button className="bg-blue-700 hover:bg-blue-600">Browse Files</Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleUpdateDocument} className="bg-blue-700 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" />
                Update Document
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Document Card Component
const DocumentCard = ({
  document,
  categories,
  onView,
  onUpdate,
  onDelete,
}: {
  document: Document
  categories: Category[]
  onView: (document: Document) => void
  onUpdate: (document: Document) => void
  onDelete: (id: string) => void
}) => {
  // Add the getDocumentIcon function inside the component
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FilePdf className="h-4 w-4 text-red-400" />
      case "docx":
      case "doc":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="h-4 w-4 text-green-400" />
      case "pptx":
      case "ppt":
        return <FileImage className="h-4 w-4 text-orange-400" />
      case "txt":
        return <FileText className="h-4 w-4 text-gray-400" />
      case "json":
      case "xml":
      case "yaml":
        return <FileCode className="h-4 w-4 text-purple-400" />
      default:
        return <File className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="bg-blue-950/40 rounded-md border border-blue-900/30 p-3 hover:bg-blue-900/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{getDocumentIcon(document.type)}</div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate" title={document.name}>
              {document.name}
            </h4>
            <div className="flex items-center mt-1 space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs">v{document.version}</span>
              {document.previousVersions && document.previousVersions.length > 0 && (
                <span className="text-xs text-gray-400">({document.previousVersions.length} previous)</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1 truncate" title={document.description}>
              {document.description}
            </p>
          </div>
        </div>
        <div className="flex space-x-1 ml-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-blue-900/30" onClick={() => onView(document)}>
            <Eye className="h-3.5 w-3.5 text-blue-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-green-900/30">
            <Download className="h-3.5 w-3.5 text-green-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-yellow-900/30"
            onClick={() => onUpdate(document)}
          >
            <Edit className="h-3.5 w-3.5 text-yellow-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-red-900/30"
            onClick={() => onDelete(document.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-red-400" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {document.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-1.5 py-0.5 rounded-full bg-blue-900/40 text-blue-300 text-[10px]">
            {tag}
          </span>
        ))}
        {document.tags.length > 3 && (
          <span className="px-1.5 py-0.5 rounded-full bg-blue-900/40 text-blue-300 text-[10px]">
            +{document.tags.length - 3} more
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
        <div>{document.size}</div>
        <div>
          {document.uploadedAt} by {document.uploadedBy}
        </div>
      </div>
    </div>
  )
}
