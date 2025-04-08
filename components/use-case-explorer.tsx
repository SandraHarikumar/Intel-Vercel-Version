"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UseCaseExplorer({ onExplore }: { onExplore: () => void }) {
  const [proposalName, setProposalName] = useState("")
  const [industry, setIndustry] = useState("financial-services")
  const [useCase, setUseCase] = useState("fraud-detection")
  const [customerName, setCustomerName] = useState("")
  const [problemStatement, setProblemStatement] = useState("")
  const [useCaseDetails, setUseCaseDetails] = useState("")

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 h-full">
      <h2 className="text-lg font-semibold mb-4">Use Case Explorer</h2>

      {/* Line 1: Proposal Name and Customer Name */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Proposal Name</label>
          <Input
            value={proposalName}
            onChange={(e) => setProposalName(e.target.value)}
            placeholder="Enter proposal name"
            className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500 h-8 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Customer Name</label>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500 h-8 text-sm"
          />
        </div>
      </div>

      {/* Line 2: Industry and Use Case */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-8 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="financial-services">Financial Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="media">Media</option>
            <option value="retail">Retail</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Use Case</label>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-8 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="fraud-detection">Fraud Detection</option>
            <option value="document-processing">Intelligent Document Processing</option>
            <option value="call-analytics">Post Call Analytics</option>
            <option value="recommendation">Recommendation Engine</option>
          </select>
        </div>
      </div>

      {/* Vertical layout for the text areas */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-300 mb-1">Problem Statement</label>
        <textarea
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          placeholder="Describe the problem that needs to be solved..."
          className="w-full h-20 px-3 py-2 bg-blue-950/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-white text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-300 mb-1">Use Case Details</label>
        <textarea
          value={useCaseDetails}
          onChange={(e) => setUseCaseDetails(e.target.value)}
          placeholder="Provide additional details about the use case..."
          className="w-full h-20 px-3 py-2 bg-blue-950/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-white text-sm"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onExplore} className="bg-blue-700 hover:bg-blue-600 h-8 text-sm">
          <Bot className="mr-2 h-4 w-4 text-cyan-400" />
          Explore Use Case
        </Button>
      </div>
    </div>
  )
}
