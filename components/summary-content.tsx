"use client"
import { useRouter } from "next/navigation"
import { DollarSign, FileText, Info, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"

export function SummaryContent() {
  const router = useRouter()

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "SKU Recommendations", href: "/sku-recommendations" },
    { label: "Targeted Operational Cost", href: "/cost-questions" },
    { label: "Summary", href: "/summary", active: true },
  ]

  // Mock data for the summary
  const selectedSkus = [
    { name: "Intel® Data Center GPU Max Series 1100", price: 5000 },
    { name: "Intel Xeon Scalable 6th Gen", price: 15000 },
    { name: "Pure FlashArray / X R3", price: 1000000 },
    { name: "Juniper QFX5700", price: 50000 },
    { name: "LogicMonitor Envision", price: 1200 },
  ]

  const directCosts = {
    hardware: 1071200,
    software: 35000,
    installation: 15000,
    maintenance: 12000,
    power: 8000,
    cooling: 5000,
  }

  const indirectCosts = {
    staff: 120000,
    training: 8000,
    downtime: 50000,
    migration: 25000,
  }

  const totalDirectCosts = Object.values(directCosts).reduce((sum, cost) => sum + cost, 0)
  const totalIndirectCosts = Object.values(indirectCosts).reduce((sum, cost) => sum + cost, 0)
  const totalCost = totalDirectCosts + totalIndirectCosts

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            Solution Summary
          </h2>
        </div>

        <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-6 flex items-start">
          <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p>
              Review your solution summary below. This includes selected SKUs and cost analysis. Click "Calculate ROI"
              to proceed to the ROI calculation, or "Generate Proposal" to create a proposal document.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
            <h3 className="text-md font-medium mb-4">Selected SKUs</h3>

            <div className="space-y-3">
              {selectedSkus.map((sku, index) => (
                <div key={index} className="flex justify-between items-center border-b border-blue-900/30 pb-2">
                  <span className="text-sm">{sku.name}</span>
                  <span className="text-sm font-medium">${sku.price.toLocaleString()}</span>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <span className="font-medium">Total Hardware:</span>
                <span className="font-bold text-blue-300">
                  ${selectedSkus.reduce((sum, sku) => sum + sku.price, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
            <h3 className="text-md font-medium mb-4">Cost Breakdown</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Direct Costs</h4>
                <div className="space-y-2">
                  {Object.entries(directCosts).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{key}:</span>
                      <span className="text-sm">${value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center border-t border-blue-900/30 pt-2 mt-2">
                    <span className="text-sm font-medium">Total Direct Costs:</span>
                    <span className="text-sm font-bold text-blue-300">${totalDirectCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Indirect Costs</h4>
                <div className="space-y-2">
                  {Object.entries(indirectCosts).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{key}:</span>
                      <span className="text-sm">${value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center border-t border-blue-900/30 pt-2 mt-2">
                    <span className="text-sm font-medium">Total Indirect Costs:</span>
                    <span className="text-sm font-bold text-blue-300">${totalIndirectCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/50 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium flex items-center">
              <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
              Total Cost of Ownership
            </h3>
            <div className="text-xl font-bold text-blue-200">${totalCost.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <div className="space-x-3">
            <Button
              className="bg-blue-700 hover:bg-blue-600"
              onClick={() => router.push("/calculate-roi")}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate ROI
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
