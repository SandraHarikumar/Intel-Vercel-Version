"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Edit, Check, Clock, BarChart, AlertTriangle, Database, Cloud, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EditableFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

// Make EditableField more compact
function EditableField({ label, value, onChange }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    onChange(tempValue)
    setIsEditing(false)
  }

  return (
    <div className="mb-2">
      <label className="block text-xs text-gray-300 mb-1">{label}</label>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500 h-7 py-0 text-xs"
          />
          <Button onClick={handleSave} size="sm" className="h-7 w-7 p-0 bg-blue-700">
            <Check className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{value}</p>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  defaultExpanded?: boolean
  children: React.ReactNode
}

// Modify the Section component to be more compact
function Section({ title, icon, defaultExpanded = false, children }: SectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-2 text-left">
        <div className="flex items-center">
          <div className="mr-2 text-blue-400">{icon}</div>
          <span className="font-medium text-sm">{title}</span>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-blue-400" /> : <ChevronDown className="h-4 w-4 text-blue-400" />}
      </button>

      {expanded && (
        <div className="p-2 border-t border-blue-900/50 bg-blue-950/20" ref={contentRef}>
          {children}
        </div>
      )}
    </div>
  )
}

interface UseCaseAnalysisProps {
  data: {
    performance: {
      tps: string
      latency: string
      volume: string
    }
    metrics: {
      fraudRate: string
      falsePositive: string
      accuracy: string
    }
    deployment: {
      type: string
      inference: string
      edge: string
    }
  }
  initialExpanded?: boolean
}

export function UseCaseAnalysis({ data, initialExpanded = false }: UseCaseAnalysisProps) {
  const router = useRouter()
  const [performance, setPerformance] = useState(data.performance)
  const [metrics, setMetrics] = useState(data.metrics)
  const [deployment, setDeployment] = useState(data.deployment)

  const [transactionDetails, setTransactionDetails] = useState({
    rate: "15,000/sec",
    maxLatency: "45ms",
    volume: "5.5M transactions/day",
    avgSize: "2.4KB",
    payload: "JSON/XML",
    keyFeatures: "Encryption, Validation",
    processingType: "Batch & Real-time",
  })

  const handleBuildPipeline = () => {
    router.push("/build-pipeline")
  }

  return (
    // Modify the main container to use flex-col and avoid overflow
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-blue-900/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Use Case Analysis</h3>
        <div className="flex items-center bg-blue-900/50 px-3 py-1.5 rounded-md">
          <Bot className="h-5 w-5 mr-2 text-cyan-400" />
          <span className="text-sm font-bold text-cyan-300">Agent Generated</span>
        </div>
      </div>

      <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-2 mb-3">
        All values can be edited to customize the use case requirements
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {/* Performance Requirements - First section expanded by default */}
        <Section title="Performance Requirements" icon={<Clock className="h-5 w-5" />} defaultExpanded={true}>
          <div className="grid grid-cols-2 gap-3">
            <EditableField
              label="Transactions per second"
              value={performance.tps}
              onChange={(value) => setPerformance({ ...performance, tps: value })}
            />
            <EditableField
              label="Maximum Latency"
              value={performance.latency}
              onChange={(value) => setPerformance({ ...performance, latency: value })}
            />
          </div>
          <EditableField
            label="Business Volume"
            value={performance.volume}
            onChange={(value) => setPerformance({ ...performance, volume: value })}
          />
        </Section>

        {/* Transaction Details - Collapsed by default */}
        <Section title="Transaction Details" icon={<Database className="h-5 w-5" />} defaultExpanded={false}>
          <div className="grid grid-cols-2 gap-3">
            <EditableField
              label="Transaction rate/sec"
              value={transactionDetails.rate}
              onChange={(value) => setTransactionDetails({ ...transactionDetails, rate: value })}
            />
            <EditableField
              label="Maximum Latency"
              value={transactionDetails.maxLatency}
              onChange={(value) => setTransactionDetails({ ...transactionDetails, maxLatency: value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <EditableField
              label="Volume"
              value={transactionDetails.volume}
              onChange={(value) => setTransactionDetails({ ...transactionDetails, volume: value })}
            />
            <EditableField
              label="Average size"
              value={transactionDetails.avgSize}
              onChange={(value) => setTransactionDetails({ ...transactionDetails, avgSize: value })}
            />
          </div>
        </Section>

        {/* Metrics Information - Collapsed by default */}
        <Section title="Metrics Information" icon={<BarChart className="h-5 w-5" />} defaultExpanded={false}>
          <div className="grid grid-cols-2 gap-3">
            <EditableField
              label="Fraud Prevention Rate"
              value={metrics.fraudRate}
              onChange={(value) => setMetrics({ ...metrics, fraudRate: value })}
            />
            <EditableField
              label="False Positive Rate"
              value={metrics.falsePositive}
              onChange={(value) => setMetrics({ ...metrics, falsePositive: value })}
            />
          </div>
        </Section>

        {/* Compliance Requirements - Collapsed by default */}
        <Section title="Compliance Requirements" icon={<AlertTriangle className="h-5 w-5" />} defaultExpanded={false}>
          <div className="space-y-2">
            <div className="bg-blue-900/20 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">PCI DSS Compliance</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Payment Card Industry Data Security Standard requirements must be met.
              </p>
            </div>
            <div className="bg-blue-900/20 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">GDPR Compliance</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Personal data must be processed according to GDPR regulations.
              </p>
            </div>
          </div>
        </Section>

        {/* Data Types and Constraints - Collapsed by default */}
        <Section title="Data Types and Constraints" icon={<Database className="h-5 w-5" />} defaultExpanded={false}>
          <div className="space-y-2">
            <div className="bg-blue-900/20 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">Transaction Data</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Historical transaction records, merchant information, timestamps, amounts.
              </p>
            </div>
          </div>
        </Section>

        {/* Deployment Requirements - Collapsed by default */}
        <Section title="Deployment Requirements" icon={<Cloud className="h-5 w-5" />} defaultExpanded={false}>
          <div className="grid grid-cols-2 gap-3">
            <EditableField
              label="Deployment Type"
              value={deployment.type}
              onChange={(value) => setDeployment({ ...deployment, type: value })}
            />
            <EditableField
              label="Inference Type"
              value={deployment.inference}
              onChange={(value) => setDeployment({ ...deployment, inference: value })}
            />
          </div>
        </Section>
      </div>

      <div className="flex justify-end mt-3">
        <Button
          onClick={() => router.push("/sku-recommendations")}
          className="bg-blue-700 hover:bg-blue-600 h-9 text-sm px-4"
        >
          SKU Recommendations
        </Button>
      </div>
    </div>
  )
}
