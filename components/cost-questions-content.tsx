"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DollarSign,
  FileText,
  Clock,
  Users,
  Building,
  Briefcase,
  Power,
  Thermometer,
  Wrench,
  Server,
  Network,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/breadcrumb"

export function CostQuestionsContent() {
  const router = useRouter()

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore Usecase", href: "/" },
    { label: "SKU Recommendations", href: "/sku-recommendations" },
    { label: "Targeted Operational Cost", href: "/cost-questions", active: true },
  ]

  // Direct costs
  const [hardwareCost, setHardwareCost] = useState(125000)
  const [softwareCost, setSoftwareCost] = useState(35000)
  const [installationCost, setInstallationCost] = useState(15000)
  const [maintenanceCost, setMaintenanceCost] = useState(12000)
  const [powerCost, setPowerCost] = useState(8000)
  const [coolingCost, setCoolingCost] = useState(5000)

  // Indirect costs
  const [staffCount, setStaffCount] = useState(3)
  const [staffCost, setStaffCost] = useState(120000)
  const [trainingCost, setTrainingCost] = useState(8000)
  const [downtime, setDowntime] = useState(2)
  const [downtimeCost, setDowntimeCost] = useState(50000)
  const [migrationCost, setMigrationCost] = useState(25000)

  const handleBack = () => {
    router.push("/sku-recommendations")
  }

  const handleNext = () => {
    router.push("/summary")
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex-1 pt-2 overflow-y-auto">
        {/* Header section - no box around it */}
        <div className="p-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center text-white">
            <DollarSign className="h-6 w-6 text-[#0068b5] mr-3" />
            Targeted Operational Cost
          </h2>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-[#002b4d] border border-[#003a66] rounded-md p-4 mb-6 max-w-full">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[#4a9eff] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white">
                Please provide cost information to help calculate the total cost of ownership (TCO) and return on
                investment (ROI). You can adjust the values based on your specific requirements and constraints.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Costs */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-white">
                <Server className="h-5 w-5 text-white mr-2" />
                Direct Costs
              </h3>

              <div className="space-y-4">
                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Server className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Hardware Cost
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={hardwareCost}
                        onChange={(e) => setHardwareCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Total cost of all hardware components including servers, storage, and networking equipment.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Briefcase className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Software Cost
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={softwareCost}
                        onChange={(e) => setSoftwareCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Cost of all software licenses, subscriptions, and support agreements.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Wrench className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Installation & Setup
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={installationCost}
                        onChange={(e) => setInstallationCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    One-time costs for installation, configuration, and initial setup.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Wrench className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Maintenance (Annual)
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={maintenanceCost}
                        onChange={(e) => setMaintenanceCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Annual cost for hardware and software maintenance and support.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Power className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Power Consumption (Annual)
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={powerCost}
                        onChange={(e) => setPowerCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Annual cost of electricity to power the hardware.</p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Thermometer className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Cooling (Annual)
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={coolingCost}
                        onChange={(e) => setCoolingCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Annual cost for cooling the hardware.</p>
                </div>
              </div>
            </div>

            {/* Indirect Costs */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-white">
                <Building className="h-5 w-5 text-white mr-2" />
                Indirect Costs
              </h3>

              <div className="space-y-4">
                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Users className="h-4 w-4 text-[#4a9eff] mr-2" />
                      IT Staff Required
                    </h4>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={staffCount}
                        onChange={(e) => {
                          const count = Number(e.target.value)
                          setStaffCount(count)
                          setStaffCost(count * 40000) // Assuming $40k per staff member
                        }}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                      <span className="ml-2 text-sm text-white">FTEs</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Number of full-time equivalent staff required to manage the solution.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Briefcase className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Staff Cost (Annual)
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={staffCost}
                        onChange={(e) => setStaffCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Annual cost of IT staff required to manage the solution.</p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Briefcase className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Training Cost
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={trainingCost}
                        onChange={(e) => setTrainingCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Cost of training staff on the new solution.</p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Clock className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Expected Downtime
                    </h4>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={downtime}
                        onChange={(e) => {
                          const hours = Number(e.target.value)
                          setDowntime(hours)
                          setDowntimeCost(hours * 25000) // Assuming $25k per hour of downtime
                        }}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                      <span className="ml-2 text-sm text-white">hours</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Expected hours of downtime during implementation.</p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Clock className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Downtime Cost
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={downtimeCost}
                        onChange={(e) => setDowntimeCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Cost of business impact due to downtime during implementation.
                  </p>
                </div>

                <div className="bg-[#001a33] rounded-lg p-4 border border-[#003a66]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <Network className="h-4 w-4 text-[#4a9eff] mr-2" />
                      Migration Cost
                    </h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#4a9eff]" />
                      <Input
                        type="number"
                        value={migrationCost}
                        onChange={(e) => setMigrationCost(Number(e.target.value))}
                        className="w-32 h-9 text-sm bg-[#001a33] border-[#003a66] text-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Cost of migrating data and applications to the new solution.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-[#0068b5] hover:bg-[#0056a2] text-white" onClick={handleNext}>
              <FileText className="h-4 w-4 mr-2" />
              View Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
