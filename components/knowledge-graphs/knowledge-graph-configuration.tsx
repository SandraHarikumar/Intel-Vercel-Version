"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Network,
  ArrowLeft,
  ArrowRight,
  FileText,
  Settings,
  ShoppingCart,
  DollarSign,
  Check,
  Info,
  Server,
  Database,
  Layers,
  Cpu,
  HardDrive,
  Gauge,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ConfigurationStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface UseCaseConfig {
  name: string
  description: string
  industry: string
  dataSource: string
  entityTypes: string[]
  relationshipTypes: string[]
}

interface SkuConfig {
  id: string
  name: string
  category: string
  type: string
  selected: boolean
}

interface PriceConfig {
  basePrice: number
  dataVolume: number
  dataVolumePrice: number
  userCount: number
  userCountPrice: number
  supportLevel: string
  supportPrice: number
}

export function KnowledgeGraphConfiguration() {
  const router = useRouter()

  // Get the step from the URL query parameter
  const [initialStep, setInitialStep] = useState<string>("usecase")

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const step = params.get("step")
      if (step && ["usecase", "skus", "price"].includes(step)) {
        setCurrentStep(step)
      }
    }
  }, [])

  // Define the configuration steps
  const steps: ConfigurationStep[] = [
    {
      id: "usecase",
      title: "Configure Use Case",
      description: "Define the knowledge graph use case, industry, and data sources",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: "skus",
      title: "Configure SKUs",
      description: "Select the hardware and software components for your knowledge graph",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: "price",
      title: "Configure Price",
      description: "Set pricing parameters and review the total cost",
      icon: <DollarSign className="h-5 w-5" />,
    },
  ]

  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState<string>("usecase")

  // State for each configuration section
  const [useCaseConfig, setUseCaseConfig] = useState<UseCaseConfig>({
    name: "Financial Services Knowledge Graph",
    description: "Knowledge graph for financial services domain including banking, insurance, and investments",
    industry: "finance",
    dataSource: "Financial Services Documentation",
    entityTypes: ["Organization", "Person", "Product", "Event", "Asset", "Location", "Concept"],
    relationshipTypes: [
      "serves",
      "owns",
      "borrows",
      "holds",
      "makes",
      "provides",
      "manages",
      "issues",
      "offers",
      "includes",
      "has",
      "complies_with",
      "contains",
      "initiates",
      "assists",
    ],
  })

  // Sample SKUs for knowledge graph deployment
  const [skus, setSkus] = useState<SkuConfig[]>([
    {
      id: "kg-server-1",
      name: "Knowledge Graph Server (Small)",
      category: "compute",
      type: "bare-metal",
      selected: false,
    },
    {
      id: "kg-server-2",
      name: "Knowledge Graph Server (Medium)",
      category: "compute",
      type: "bare-metal",
      selected: true,
    },
    {
      id: "kg-server-3",
      name: "Knowledge Graph Server (Large)",
      category: "compute",
      type: "bare-metal",
      selected: false,
    },
    {
      id: "kg-storage-1",
      name: "Graph Database Storage (1TB)",
      category: "storage",
      type: "infrastructure",
      selected: false,
    },
    {
      id: "kg-storage-2",
      name: "Graph Database Storage (5TB)",
      category: "storage",
      type: "infrastructure",
      selected: true,
    },
    {
      id: "kg-storage-3",
      name: "Graph Database Storage (10TB)",
      category: "storage",
      type: "infrastructure",
      selected: false,
    },
    {
      id: "kg-software-1",
      name: "Knowledge Graph Platform (Basic)",
      category: "software",
      type: "software",
      selected: false,
    },
    {
      id: "kg-software-2",
      name: "Knowledge Graph Platform (Standard)",
      category: "software",
      type: "software",
      selected: true,
    },
    {
      id: "kg-software-3",
      name: "Knowledge Graph Platform (Enterprise)",
      category: "software",
      type: "software",
      selected: false,
    },
  ])

  // Pricing configuration
  const [priceConfig, setPriceConfig] = useState<PriceConfig>({
    basePrice: 25000,
    dataVolume: 5,
    dataVolumePrice: 2000,
    userCount: 50,
    userCountPrice: 100,
    supportLevel: "standard",
    supportPrice: 5000,
  })

  // Calculate total price
  const calculateTotalPrice = () => {
    const selectedSkusPrice = skus
      .filter((sku) => sku.selected)
      .reduce((total, sku) => {
        // Simple price calculation based on SKU type
        let skuPrice = 0
        if (sku.id === "kg-server-1") skuPrice = 10000
        if (sku.id === "kg-server-2") skuPrice = 20000
        if (sku.id === "kg-server-3") skuPrice = 40000
        if (sku.id === "kg-storage-1") skuPrice = 5000
        if (sku.id === "kg-storage-2") skuPrice = 15000
        if (sku.id === "kg-storage-3") skuPrice = 25000
        if (sku.id === "kg-software-1") skuPrice = 10000
        if (sku.id === "kg-software-2") skuPrice = 25000
        if (sku.id === "kg-software-3") skuPrice = 50000
        return total + skuPrice
      }, 0)

    const dataVolumeTotal = priceConfig.dataVolume * priceConfig.dataVolumePrice
    const userCountTotal = priceConfig.userCount * priceConfig.userCountPrice

    return priceConfig.basePrice + selectedSkusPrice + dataVolumeTotal + userCountTotal + priceConfig.supportPrice
  }

  // Toggle SKU selection
  const toggleSkuSelection = (id: string) => {
    setSkus(
      skus.map((sku) => {
        if (sku.id === id) {
          return { ...sku, selected: !sku.selected }
        }
        return sku
      }),
    )
  }

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep === "usecase") setCurrentStep("skus")
    else if (currentStep === "skus") setCurrentStep("price")
    else if (currentStep === "price") handleFinish()
  }

  const goToPreviousStep = () => {
    if (currentStep === "skus") setCurrentStep("usecase")
    else if (currentStep === "price") setCurrentStep("skus")
  }

  const handleFinish = () => {
    // In a real implementation, this would save the configuration and create the knowledge graph
    router.push("/knowledge-graphs")
  }

  // Helper function to get icon for SKU type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bare-metal":
        return <Server className="h-4 w-4 text-blue-300" />
      case "virtual-machine":
        return <Cpu className="h-4 w-4 text-green-300" />
      case "infrastructure":
        return <Layers className="h-4 w-4 text-purple-300" />
      case "software":
        return <Gauge className="h-4 w-4 text-red-300" />
      default:
        return <Server className="h-4 w-4 text-gray-300" />
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button onClick={() => router.push("/knowledge-graphs")} variant="outline" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Graphs
          </Button>
          <h2 className="text-lg font-semibold flex items-center">
            <Network className="h-5 w-5 text-blue-400 mr-2" />
            Configure Knowledge Graph
          </h2>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex mb-6 bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-blue-900/50">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === step.id ? "bg-blue-600 text-white" : "bg-blue-900/50 text-blue-300"
              }`}
            >
              {step.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs text-gray-400 hidden md:block">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 flex justify-center">
                <ArrowRight className="h-4 w-4 text-blue-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        {/* Use Case Configuration */}
        {currentStep === "usecase" && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Settings className="h-5 w-5 text-blue-400 mr-2" />
              Configure Use Case
            </h3>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-6 flex items-start">
              <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>
                  Define your knowledge graph use case, industry, and data sources. This information will help optimize
                  the graph structure and performance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Knowledge Graph Name</label>
                  <Input
                    value={useCaseConfig.name}
                    onChange={(e) => setUseCaseConfig({ ...useCaseConfig, name: e.target.value })}
                    className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
                  <select
                    value={useCaseConfig.industry}
                    onChange={(e) => setUseCaseConfig({ ...useCaseConfig, industry: e.target.value })}
                    className="w-full bg-blue-950/30 border border-blue-800/50 rounded-md h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="finance">Financial Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Data Source</label>
                  <Input
                    value={useCaseConfig.dataSource}
                    onChange={(e) => setUseCaseConfig({ ...useCaseConfig, dataSource: e.target.value })}
                    className="bg-blue-950/30 border-blue-800/50 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <Textarea
                    value={useCaseConfig.description}
                    onChange={(e) => setUseCaseConfig({ ...useCaseConfig, description: e.target.value })}
                    className="min-h-[100px] bg-blue-950/30 border-blue-800/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Entity Types</label>
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-md p-2 flex flex-wrap gap-2">
                    {useCaseConfig.entityTypes.map((type, index) => (
                      <div
                        key={index}
                        className="bg-blue-900/50 text-blue-200 px-2 py-1 rounded text-xs flex items-center"
                      >
                        <Database className="h-3 w-3 mr-1" />
                        {type}
                      </div>
                    ))}
                    <button className="bg-blue-700/50 text-blue-200 px-2 py-1 rounded text-xs flex items-center">
                      + Add Type
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Relationship Types</label>
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-md p-2 flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                    {useCaseConfig.relationshipTypes.map((type, index) => (
                      <div
                        key={index}
                        className="bg-blue-900/50 text-blue-200 px-2 py-1 rounded text-xs flex items-center"
                      >
                        <Network className="h-3 w-3 mr-1" />
                        {type}
                      </div>
                    ))}
                    <button className="bg-blue-700/50 text-blue-200 px-2 py-1 rounded text-xs flex items-center">
                      + Add Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKU Configuration */}
        {currentStep === "skus" && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 text-blue-400 mr-2" />
              Configure SKUs
            </h3>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-6 flex items-start">
              <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>
                  Select the hardware and software components for your knowledge graph deployment. The recommended
                  configuration is pre-selected based on your use case.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden">
                <div className="bg-blue-900/40 px-4 py-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-blue-100 flex items-center">
                    <Server className="h-4 w-4 mr-2 text-blue-300" />
                    <span>Compute Resources</span>
                  </h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {skus
                      .filter((sku) => sku.category === "compute")
                      .map((sku) => (
                        <div
                          key={sku.id}
                          className={`bg-blue-950/40 rounded-md border p-3 transition-colors ${
                            sku.selected ? "border-blue-500 bg-blue-900/30" : "border-blue-900/30 hover:bg-blue-900/20"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="flex items-center">
                                {getTypeIcon(sku.type)}
                                <h4 className="text-sm font-medium ml-2">{sku.name}</h4>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs capitalize">
                                  {sku.type.replace("-", " ")}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                                sku.selected ? "bg-blue-600" : "border border-blue-600/50"
                              }`}
                              onClick={() => toggleSkuSelection(sku.id)}
                            >
                              {sku.selected && <Check className="h-3.5 w-3.5 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden">
                <div className="bg-blue-900/40 px-4 py-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-blue-100 flex items-center">
                    <HardDrive className="h-4 w-4 mr-2 text-blue-300" />
                    <span>Storage Resources</span>
                  </h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {skus
                      .filter((sku) => sku.category === "storage")
                      .map((sku) => (
                        <div
                          key={sku.id}
                          className={`bg-blue-950/40 rounded-md border p-3 transition-colors ${
                            sku.selected ? "border-blue-500 bg-blue-900/30" : "border-blue-900/30 hover:bg-blue-900/20"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="flex items-center">
                                {getTypeIcon(sku.type)}
                                <h4 className="text-sm font-medium ml-2">{sku.name}</h4>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs capitalize">
                                  {sku.type.replace("-", " ")}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                                sku.selected ? "bg-blue-600" : "border border-blue-600/50"
                              }`}
                              onClick={() => toggleSkuSelection(sku.id)}
                            >
                              {sku.selected && <Check className="h-3.5 w-3.5 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden">
                <div className="bg-blue-900/40 px-4 py-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-blue-100 flex items-center">
                    <Gauge className="h-4 w-4 mr-2 text-blue-300" />
                    <span>Software Resources</span>
                  </h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {skus
                      .filter((sku) => sku.category === "software")
                      .map((sku) => (
                        <div
                          key={sku.id}
                          className={`bg-blue-950/40 rounded-md border p-3 transition-colors ${
                            sku.selected ? "border-blue-500 bg-blue-900/30" : "border-blue-900/30 hover:bg-blue-900/20"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="flex items-center">
                                {getTypeIcon(sku.type)}
                                <h4 className="text-sm font-medium ml-2">{sku.name}</h4>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs capitalize">
                                  {sku.type.replace("-", " ")}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                                sku.selected ? "bg-blue-600" : "border border-blue-600/50"
                              }`}
                              onClick={() => toggleSkuSelection(sku.id)}
                            >
                              {sku.selected && <Check className="h-3.5 w-3.5 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Price Configuration */}
        {currentStep === "price" && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
              Configure Price
            </h3>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-3 mb-6 flex items-start">
              <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>
                  Configure pricing parameters based on your expected data volume, user count, and support requirements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
                  <h4 className="text-sm font-medium mb-3">Base Configuration</h4>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Base Price</label>
                    <div className="flex items-center">
                      <DollarSign className="h-3.5 w-3.5 text-green-400" />
                      <Input
                        type="number"
                        value={priceConfig.basePrice}
                        onChange={(e) => setPriceConfig({ ...priceConfig, basePrice: Number(e.target.value) })}
                        className="w-28 h-7 text-sm bg-blue-950/30 border-blue-800/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Data Volume (TB)</label>
                    <Input
                      type="number"
                      value={priceConfig.dataVolume}
                      onChange={(e) => setPriceConfig({ ...priceConfig, dataVolume: Number(e.target.value) })}
                      className="w-28 h-7 text-sm bg-blue-950/30 border-blue-800/50"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Price per TB</label>
                    <div className="flex items-center">
                      <DollarSign className="h-3.5 w-3.5 text-green-400" />
                      <Input
                        type="number"
                        value={priceConfig.dataVolumePrice}
                        onChange={(e) => setPriceConfig({ ...priceConfig, dataVolumePrice: Number(e.target.value) })}
                        className="w-28 h-7 text-sm bg-blue-950/30 border-blue-800/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
                  <h4 className="text-sm font-medium mb-3">User Licensing</h4>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">User Count</label>
                    <Input
                      type="number"
                      value={priceConfig.userCount}
                      onChange={(e) => setPriceConfig({ ...priceConfig, userCount: Number(e.target.value) })}
                      className="w-28 h-7 text-sm bg-blue-950/30 border-blue-800/50"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Price per User</label>
                    <div className="flex items-center">
                      <DollarSign className="h-3.5 w-3.5 text-green-400" />
                      <Input
                        type="number"
                        value={priceConfig.userCountPrice}
                        onChange={(e) => setPriceConfig({ ...priceConfig, userCountPrice: Number(e.target.value) })}
                        className="w-28 h-7 text-sm bg-blue-950/30 border-blue-800/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40">
                  <h4 className="text-sm font-medium mb-3">Support Level</h4>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="basic"
                        name="supportLevel"
                        checked={priceConfig.supportLevel === "basic"}
                        onChange={() => setPriceConfig({ ...priceConfig, supportLevel: "basic", supportPrice: 2500 })}
                        className="mr-2"
                      />
                      <label htmlFor="basic" className="text-sm">
                        Basic Support ($2,500/year)
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="supportLevel"
                        checked={priceConfig.supportLevel === "standard"}
                        onChange={() =>
                          setPriceConfig({ ...priceConfig, supportLevel: "standard", supportPrice: 5000 })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="standard" className="text-sm">
                        Standard Support ($5,000/year)
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="premium"
                        name="supportLevel"
                        checked={priceConfig.supportLevel === "premium"}
                        onChange={() =>
                          setPriceConfig({ ...priceConfig, supportLevel: "premium", supportPrice: 10000 })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="premium" className="text-sm">
                        Premium Support ($10,000/year)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/40 sticky top-4">
                  <h4 className="text-md font-medium mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
                    Price Summary
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-blue-900/30">
                      <span className="text-sm">Base Price:</span>
                      <span className="text-sm font-medium">${priceConfig.basePrice.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-blue-900/30">
                      <span className="text-sm">Selected SKUs:</span>
                      <span className="text-sm font-medium">
                        ${skus.filter((sku) => sku.selected).length > 0 ? 60000 : 0}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-blue-900/30">
                      <span className="text-sm">Data Volume Cost:</span>
                      <span className="text-sm font-medium">
                        ${(priceConfig.dataVolume * priceConfig.dataVolumePrice).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-blue-900/30">
                      <span className="text-sm">User Licensing:</span>
                      <span className="text-sm font-medium">
                        ${(priceConfig.userCount * priceConfig.userCountPrice).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-blue-900/30">
                      <span className="text-sm">Support:</span>
                      <span className="text-sm font-medium">${priceConfig.supportPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-300">${calculateTotalPrice().toLocaleString()}</span>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-blue-700 hover:bg-blue-600">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === "usecase"}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Step
        </Button>
        <Button className="bg-blue-700 hover:bg-blue-600" onClick={goToNextStep}>
          {currentStep === "price" ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Finish Configuration
            </>
          ) : (
            <>
              Next Step
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
