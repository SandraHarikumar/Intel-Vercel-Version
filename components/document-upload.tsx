"use client"

import { useState } from "react"
import { Upload, FileText, X, FileCode, FileSpreadsheet, FileCheck } from "lucide-react"

interface Document {
  id: number
  name: string
  type: string
  category: string
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Financial_Services_Whitepaper.pdf", type: "pdf", category: "whitepaper" },
    { id: 2, name: "Fraud_Detection_Research.docx", type: "docx", category: "research" },
    { id: 3, name: "Intel_Sizing_Guidelines.pdf", type: "pdf", category: "sizing" },
    { id: 4, name: "Compliance_Requirements.pdf", type: "pdf", category: "compliance" },
  ])

  const getIconForDocument = (doc: Document) => {
    switch (doc.category) {
      case "whitepaper":
        return <FileText className="h-5 w-5 text-blue-300" />
      case "research":
        return <FileCode className="h-5 w-5 text-green-300" />
      case "sizing":
        return <FileSpreadsheet className="h-5 w-5 text-yellow-300" />
      case "compliance":
        return <FileCheck className="h-5 w-5 text-red-300" />
      default:
        return <FileText className="h-5 w-5 text-blue-300" />
    }
  }

  return (
    <div className="fixed left-12 top-[53px] w-48 h-[calc(100vh-53px)] bg-black/60 backdrop-blur-sm border-r border-blue-900 z-10 flex flex-col">
      <div className="p-3 border-b border-blue-900/50">
        <h3 className="text-sm font-medium text-blue-300">Knowledge Base</h3>
        <p className="text-xs text-gray-400 mt-1">Upload documents to help the agent generate accurate analysis</p>
      </div>

      <div className="flex-1 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent p-3">
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-300 mb-2">Upload Documents</h4>
          <div className="border border-dashed border-blue-800 rounded-md p-3 text-center">
            <Upload className="h-5 w-5 mx-auto mb-2 text-blue-400" />
            <p className="text-xs text-gray-300 mb-1">Drag and drop files or click to browse</p>
            <button className="mt-2 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
              Upload Documents
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Requirements & Whitepapers</h4>
            <div className="space-y-2">
              {documents
                .filter((d) => d.category === "whitepaper")
                .map((doc) => (
                  <div key={doc.id} className="bg-blue-900/20 p-2 rounded-md flex items-center justify-between group">
                    <div className="flex items-center">
                      {getIconForDocument(doc)}
                      <span className="text-xs ml-2 truncate max-w-[120px]">{doc.name}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Research Papers</h4>
            <div className="space-y-2">
              {documents
                .filter((d) => d.category === "research")
                .map((doc) => (
                  <div key={doc.id} className="bg-blue-900/20 p-2 rounded-md flex items-center justify-between group">
                    <div className="flex items-center">
                      {getIconForDocument(doc)}
                      <span className="text-xs ml-2 truncate max-w-[120px]">{doc.name}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Sizing & Best Practices</h4>
            <div className="space-y-2">
              {documents
                .filter((d) => d.category === "sizing")
                .map((doc) => (
                  <div key={doc.id} className="bg-blue-900/20 p-2 rounded-md flex items-center justify-between group">
                    <div className="flex items-center">
                      {getIconForDocument(doc)}
                      <span className="text-xs ml-2 truncate max-w-[120px]">{doc.name}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Compliance Requirements</h4>
            <div className="space-y-2">
              {documents
                .filter((d) => d.category === "compliance")
                .map((doc) => (
                  <div key={doc.id} className="bg-blue-900/20 p-2 rounded-md flex items-center justify-between group">
                    <div className="flex items-center">
                      {getIconForDocument(doc)}
                      <span className="text-xs ml-2 truncate max-w-[120px]">{doc.name}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
