"use client"
import { useRouter } from "next/navigation"
import { DollarSign, FileText, Info, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"

// Add breadcrumb items definition
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Explore Usecase", href: "/" },
  { label: "SKU Recommendations", href: "/sku-recommendations" },
  { label: "Targeted Operational Cost", href: "/cost-questions" },
  { label: "Summary", href: "/summary", active: true },
]

export function SummaryContent() {
  const router = useRouter()

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
      <div className="flex-1 pt-2 overflow-y-auto">
        {/* Header section - no box around it */}
        <div className="p-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center text-white">
            <FileText className="h-6 w-6 text-[#0068b5] mr-3" />
            Solution Summary
          </h2>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-[#002b4d] border border-[#003a66] rounded-md p-4 mb-6 max-w-full">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[#4a9eff] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white">
                Review your solution summary below. This includes selected SKUs and cost analysis. Click "Calculate ROI"
                to proceed to the ROI calculation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#001a33] rounded-lg border border-[#003a66] p-4">
              <h3 className="text-md font-medium mb-4 text-white">Selected SKUs</h3>

              <div className="space-y-3">
                {selectedSkus.map((sku, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm text-white">{sku.name}</span>
                    <span className="text-sm font-medium text-white">${sku.price.toLocaleString()}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium text-white">Total Hardware:</span>
                  <span className="font-bold text-[#4a9eff]">
                    ${selectedSkus.reduce((sum, sku) => sum + sku.price, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#001a33] rounded-lg border border-[#003a66] p-4">
              <h3 className="text-md font-medium mb-4 text-white">Cost Breakdown</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-white">Direct Costs</h4>
                  <div className="space-y-2">
                    {Object.entries(directCosts).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm capitalize text-white">{key}:</span>
                        <span className="text-sm text-white">${value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t pt-2 mt-2">
                      <span className="text-sm font-medium text-white">Total Direct Costs:</span>
                      <span className="text-sm font-bold text-[#4a9eff]">${totalDirectCosts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-white">Indirect Costs</h4>
                  <div className="space-y-2">
                    {Object.entries(indirectCosts).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm capitalize text-white">{key}:</span>
                        <span className="text-sm text-white">${value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t pt-2 mt-2">
                      <span className="text-sm font-medium text-white">Total Indirect Costs:</span>
                      <span className="text-sm font-bold text-[#4a9eff]">${totalIndirectCosts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#001a33] rounded-lg border border-[#003a66] p-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium flex items-center text-white">
                <DollarSign className="h-5 w-5 text-[#4a9eff] mr-2" />
                Total Cost of Ownership
              </h3>
              <div className="text-xl font-bold text-[#4a9eff]">${totalCost.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              className="bg-[#0047AB] hover:bg-[#003d91] text-white"
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
