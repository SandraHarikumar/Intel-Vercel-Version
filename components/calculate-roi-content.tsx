"use client"
import { useRouter } from "next/navigation"
import { Calculator, LineChart, DollarSign, FileText, Info, Clock, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"

export function CalculateRoiContent() {
  const router = useRouter()

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "SKU Recommendations", href: "/sku-recommendations" },
    { label: "Targeted Operational Cost", href: "/cost-questions" },
    { label: "Summary", href: "/summary" },
    { label: "Calculate ROI", href: "/calculate-roi", active: true },
  ]

  // Fixed values (non-editable)
  const skuCosts = 1071200
  const directCosts = 75000
  const indirectCosts = 203000
  const initialInvestment = skuCosts + directCosts + indirectCosts
  const annualCost = 145000
  const annualBenefit = 450000 // Increased from 175000 to 450000
  const timeframe = 5
  const discountRate = 5

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
            ? -initialInvestment + yearlyResults.slice(0, i).reduce((sum, r) => sum + (r.benefit - r.cost), 0)
            : -initialInvestment

        const fractionalYear = i + Math.abs(previousCashFlow) / (result.benefit - result.cost)
        return fractionalYear
      }
    }

    return timeframe + 1 // Payback period exceeds timeframe
  }

  const results = calculateROI()

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Calculator className="h-5 w-5 text-blue-400 mr-2" />
            ROI Calculator
          </h2>
        </div>

        <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-6 flex items-start">
          <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p>
              This calculator shows the estimated Return on Investment (ROI) for your solution over a 5-year period.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
            <h3 className="text-md font-medium flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
              Financial Parameters
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">SKU Costs</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm">{skuCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Direct Costs</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm">{directCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Indirect Costs</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm">{indirectCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-900/30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Total Initial Investment</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm font-bold">{initialInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-900/30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Annual Operating Cost</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm">{annualCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Annual Benefit</label>
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-green-400 mr-1" />
                    <span className="text-sm">{annualBenefit.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Timeframe</label>
                  <span className="text-sm">{timeframe} years</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Discount Rate</label>
                  <span className="text-sm">{discountRate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
            <h3 className="text-md font-medium flex items-center mb-4">
              <LineChart className="h-5 w-5 text-blue-400 mr-2" />
              ROI Results
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/50">
                  <h4 className="text-xs text-gray-300 mb-1">Net Present Value</h4>
                  <div className="text-xl font-bold text-blue-300">
                    ${Math.round(results.netPresentValue).toLocaleString()}
                  </div>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/50">
                  <h4 className="text-xs text-gray-300 mb-1">ROI (5 Year)</h4>
                  <div className="text-xl font-bold text-blue-300">{Math.round(results.roi)}%</div>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/50">
                  <h4 className="text-xs text-gray-300 mb-1">Payback Period</h4>
                  <div className="text-xl font-bold text-blue-300">{results.paybackPeriod.toFixed(1)} years</div>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/50">
                  <h4 className="text-xs text-gray-300 mb-1">Annual Return</h4>
                  <div className="text-xl font-bold text-blue-300">
                    ${Math.round(annualBenefit - annualCost).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50">
                <h4 className="text-sm font-medium mb-3">Return on Investment (5 Years)</h4>
                <div className="h-[200px] flex items-end justify-between space-x-2 mt-6 mb-2 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-6">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>

                  {/* Horizontal grid lines */}
                  <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-blue-900/30 w-full h-0"></div>
                    <div className="border-t border-blue-900/30 w-full h-0"></div>
                    <div className="border-t border-blue-900/30 w-full h-0"></div>
                    <div className="border-t border-blue-900/30 w-full h-0"></div>
                    <div className="border-t border-blue-900/30 w-full h-0"></div>
                  </div>

                  {results.yearlyResults.map((result) => (
                    <div key={result.year} className="flex flex-col items-center flex-1 z-10">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 relative group shadow-lg"
                        style={{
                          height: `${Math.max(0, Math.min(100, (result.yearlyROI / 100) * 100))}%`,
                          minHeight: "10px",
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          ROI: {Math.round(result.yearlyROI)}%
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-medium">Year {result.year}</div>
                      <div className="text-xs text-blue-300">{Math.round(result.yearlyROI)}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-blue-800/30 pt-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Initial investment: ${initialInvestment.toLocaleString()}</span>
                    <span>Total 5-year ROI: {Math.round(results.roi)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <Button variant="outline" className="text-xs">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download Report
                </Button>
                <Button variant="outline" className="text-xs">
                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                  Share Results
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40 mb-6">
          <h3 className="text-md font-medium flex items-center mb-4">
            <Clock className="h-5 w-5 text-blue-400 mr-2" />
            Year-by-Year Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900/40">
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-right">Cost</th>
                  <th className="px-4 py-2 text-right">Benefit</th>
                  <th className="px-4 py-2 text-right">Net Benefit</th>
                  <th className="px-4 py-2 text-right">Cumulative</th>
                  <th className="px-4 py-2 text-right">ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-900/30">
                  <td className="px-4 py-2">0</td>
                  <td className="px-4 py-2 text-right">${initialInvestment.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">$0</td>
                  <td className="px-4 py-2 text-right text-red-400">-${initialInvestment.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-red-400">-${initialInvestment.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-red-400">-100%</td>
                </tr>
                {results.yearlyResults.map((result) => (
                  <tr key={result.year} className="border-b border-blue-900/30">
                    <td className="px-4 py-2">{result.year}</td>
                    <td className="px-4 py-2 text-right">${Math.round(result.cost).toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${Math.round(result.benefit).toLocaleString()}</td>
                    <td
                      className={`px-4 py-2 text-right ${result.netBenefit >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {result.netBenefit >= 0 ? "$" : "-$"}
                      {Math.abs(Math.round(result.netBenefit)).toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-2 text-right ${result.cumulativeNetBenefit >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {result.cumulativeNetBenefit >= 0 ? "$" : "-$"}
                      {Math.abs(Math.round(result.cumulativeNetBenefit)).toLocaleString()}
                    </td>
                    <td className={`px-4 py-2 text-right ${result.yearlyROI >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {Math.round(result.yearlyROI)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="bg-blue-700 hover:bg-blue-600" onClick={() => router.push("/generate-proposal")}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Proposal
          </Button>
        </div>
      </div>
    </div>
  )
}
