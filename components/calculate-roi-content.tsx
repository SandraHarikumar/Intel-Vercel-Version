"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DollarSign, FileText, Calculator, Info, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export function CalculateRoiContent() {
  const router = useRouter()

  // Uncomment the breadcrumb items definition
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore Usecase", href: "/" },
    { label: "SKU Recommendations", href: "/sku-recommendations" },
    { label: "Targeted Operational Cost", href: "/cost-questions" },
    { label: "Summary", href: "/summary" },
    { label: "Calculate ROI", href: "/calculate-roi", active: true },
  ]

  // Fixed values (non-editable)
  const [skuCosts, setSkuCosts] = useState(1071200)
  const [directCosts, setDirectCosts] = useState(75000)
  const [indirectCosts, setIndirectCosts] = useState(203000)
  const [annualCost, setAnnualCost] = useState(145000)
  const [annualBenefit, setAnnualBenefit] = useState(450000)
  const [timeframe, setTimeframe] = useState(5)
  const [discountRate, setDiscountRate] = useState(5)

  const initialInvestment = skuCosts + directCosts + indirectCosts

  // Calculated values
  const calculateROI = () => {
    let totalCost = initialInvestment
    let totalBenefit = 0
    const yearlyResults = []

    for (let year = 1; year <= timeframe; year++) {
      // Apply a multiplier that increases each year to show growing benefits
      const benefitMultiplier = 1 + (year - 1) * 0.15 // 15% increase each year

      const yearCost = annualCost / Math.pow(1 + discountRate / 100, year)
      const yearBenefit = (annualBenefit * benefitMultiplier) / Math.pow(1 + discountRate / 100, year)

      totalCost += yearCost
      totalBenefit += yearBenefit

      // Calculate ROI for this specific year (not cumulative)
      const yearlyROI = ((yearBenefit - yearCost) / initialInvestment) * 100

      // Calculate cumulative ROI
      const cumulativeROI = ((totalBenefit - totalCost) / initialInvestment) * 100

      yearlyResults.push({
        year,
        cost: yearCost,
        benefit: yearBenefit,
        netBenefit: yearBenefit - yearCost,
        cumulativeNetBenefit: totalBenefit - totalCost,
        yearlyROI: yearlyROI, // ROI for this specific year
        roi: cumulativeROI, // Cumulative ROI
      })
    }

    const netPresentValue = totalBenefit - totalCost
    const roi = (netPresentValue / initialInvestment) * 100
    const paybackPeriod = calculatePaybackPeriod(yearlyResults)

    return {
      netPresentValue,
      roi,
      paybackPeriod,
      yearlyResults,
    }
  }

  const calculatePaybackPeriod = (yearlyResults) => {
    let cumulativeCashFlow = -initialInvestment
    const previousYear = 0

    for (let i = 0; i < yearlyResults.length; i++) {
      const result = yearlyResults[i]
      cumulativeCashFlow += result.benefit - result.cost

      if (cumulativeCashFlow >= 0) {
        // Calculate fractional year
        const previousCashFlow =
          i > 0
            ? -initialInvestment + yearlyResults.slice(0, i).reduce((sum, r) => sum + r.benefit - r.cost, 0)
            : -initialInvestment

        const cashFlowThisYear = result.benefit - result.cost
        const fractionOfYear = (0 - previousCashFlow) / cashFlowThisYear

        return i + fractionOfYear
      }
    }

    return timeframe + 1 // Payback period exceeds the timeframe
  }

  const results = calculateROI()

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Uncomment the breadcrumb component */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex-1 pt-2 overflow-y-auto">
        {/* Header section - no box around it */}
        <div className="p-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center text-white">
            <Calculator className="h-6 w-6 text-[#0068b5] mr-3" />
            ROI Calculator
          </h2>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-[#002b4d] border border-[#003a66] rounded-md p-4 mb-6 max-w-full">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[#4a9eff] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white">
                Review the ROI analysis for your solution. This calculation is based on the costs you provided and
                estimated benefits. Adjust the values as needed to see how they impact the ROI.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inputs */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-white">
                <DollarSign className="h-5 w-5 text-white mr-2" />
                Investment & Benefits
              </h3>

              <div className="space-y-4">
                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <h4 className="text-sm font-medium text-white mb-3">Initial Investment</h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">SKU Costs</label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#4a9eff]" />
                        <Input
                          type="number"
                          value={skuCosts}
                          onChange={(e) => setSkuCosts(Number(e.target.value))}
                          className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Direct Costs</label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#4a9eff]" />
                        <Input
                          type="number"
                          value={directCosts}
                          onChange={(e) => setDirectCosts(Number(e.target.value))}
                          className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Indirect Costs</label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#4a9eff]" />
                        <Input
                          type="number"
                          value={indirectCosts}
                          onChange={(e) => setIndirectCosts(Number(e.target.value))}
                          className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#003a66]">
                      <label className="text-sm font-medium text-white">Total Initial Investment</label>
                      <div className="text-sm font-medium text-white">${initialInvestment.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <h4 className="text-sm font-medium text-white mb-3">Annual Costs & Benefits</h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Annual Costs</label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#4a9eff]" />
                        <Input
                          type="number"
                          value={annualCost}
                          onChange={(e) => setAnnualCost(Number(e.target.value))}
                          className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Annual Benefits</label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#4a9eff]" />
                        <Input
                          type="number"
                          value={annualBenefit}
                          onChange={(e) => setAnnualBenefit(Number(e.target.value))}
                          className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Timeframe (Years)</label>
                      <Input
                        type="number"
                        value={timeframe}
                        onChange={(e) => setTimeframe(Number(e.target.value))}
                        className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Discount Rate (%)</label>
                      <Input
                        type="number"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(Number(e.target.value))}
                        className="w-32 h-8 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-white">
                <BarChart className="h-5 w-5 text-white mr-2" />
                ROI Results
              </h3>

              <div className="space-y-4">
                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <h4 className="text-sm font-medium text-white mb-3">Key Metrics</h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Net Present Value (NPV)</span>
                      <span className="text-sm font-medium text-white">
                        ${Math.round(results.netPresentValue).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Return on Investment (ROI)</span>
                      <span className="text-sm font-medium text-green-400">{results.roi.toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Payback Period</span>
                      <span className="text-sm font-medium text-white">{results.paybackPeriod.toFixed(2)} years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <h4 className="text-sm font-medium text-white mb-3">Yearly Breakdown</h4>

                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 pb-1 border-b border-[#003a66]">
                      <div>Year</div>
                      <div className="text-right">Costs</div>
                      <div className="text-right">Benefits</div>
                      <div className="text-right">Net Benefit</div>
                    </div>

                    {results.yearlyResults.map((result) => (
                      <div key={result.year} className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-white">Year {result.year}</div>
                        <div className="text-right text-red-400">${Math.round(result.cost).toLocaleString()}</div>
                        <div className="text-right text-green-400">${Math.round(result.benefit).toLocaleString()}</div>
                        <div className="text-right text-white">${Math.round(result.netBenefit).toLocaleString()}</div>
                      </div>
                    ))}

                    <div className="grid grid-cols-4 gap-2 text-xs font-medium pt-1 border-t border-[#003a66]">
                      <div className="text-white">Total</div>
                      <div className="text-right text-red-400">
                        $
                        {Math.round(
                          results.yearlyResults.reduce((sum, r) => sum + r.cost, 0) + initialInvestment,
                        ).toLocaleString()}
                      </div>
                      <div className="text-right text-green-400">
                        ${Math.round(results.yearlyResults.reduce((sum, r) => sum + r.benefit, 0)).toLocaleString()}
                      </div>
                      <div className="text-right text-white">
                        ${Math.round(results.netPresentValue).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              className="bg-[#0047AB] hover:bg-[#003d91] text-white"
              onClick={() => router.push("/generate-proposal")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Proposal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
