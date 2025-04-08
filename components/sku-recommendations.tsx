"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Info,
  Filter,
  Search,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Check,
  Server,
  Laptop,
  Database,
  Network,
  Monitor,
  SlidersHorizontal,
} from "lucide-react"

interface SKU {
  id: string
  name: string
  description: string
  category: string
  type: string
  specs: {
    cores?: string
    disk?: string
    memory?: string
    other?: string
  }
  price?: number
  selected: boolean
}

export function SkuRecommendations() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    compute: true, // Set compute to expanded by default
    gpu: false,
    storage: false,
    networking: false,
    monitoring: false,
    other: false,
  })

  const [skus, setSkus] = useState<SKU[]>([
    {
      id: "bm-spr-pvc-1100-8",
      name: "Intel® Data Center GPU Max Series 1100",
      description: "bm-spr-pvc-1100-8, Bare Metal, 8 Cores, 2TB Disk, 1TB Memory",
      category: "gpu",
      type: "bare-metal",
      specs: {
        cores: "8",
        disk: "2TB",
        memory: "1TB",
      },
      price: 5000,
      selected: true, // Pre-selected
    },
    {
      id: "vm-spr-pvc-1100-1",
      name: "Intel® Data Center GPU Max Series 1100",
      description: "vm-spr-pvc-1100-1 Virtual Machine, 1 Core, 48Gi Disk, 105Gi Memory",
      category: "gpu",
      type: "virtual-machine",
      specs: {
        cores: "1",
        disk: "48Gi",
        memory: "105Gi",
      },
      price: 2000,
      selected: false,
    },
    {
      id: "bm-spr-pvc-1550-8",
      name: "Intel® Data Center GPU Max Series 1550",
      description: "bm-spr-pvc-1550-8 Bare Metal, 8 Cores, 2TB Disk, 2TB Memory",
      category: "gpu",
      type: "bare-metal",
      specs: {
        cores: "8",
        disk: "2TB",
        memory: "2TB",
      },
      price: 7000,
      selected: false,
    },
    {
      id: "bm-gnr-sp-quanta",
      name: "Intel Xeon Scalable 6th Gen",
      description: "bm-gnr-sp-quanta, Bare Metal, 96 Cores, 1TB Disk, 1TB Memory",
      category: "compute",
      type: "bare-metal",
      specs: {
        cores: "96",
        disk: "1TB",
        memory: "1TB",
      },
      price: 15000,
      selected: true, // Pre-selected
    },
    {
      id: "bm-sfr-sp-quanta",
      name: "Intel Xeon Scalable 6th Gen",
      description: "bm-sfr-sp-quanta, Bare Metal, 96 Cores, 1TB Disk, 1TB Memory",
      category: "compute",
      type: "bare-metal",
      specs: {
        cores: "96",
        disk: "1TB",
        memory: "1TB",
      },
      price: 15000,
      selected: false,
    },
    {
      id: "bm-emr",
      name: "Intel Xeon Scalable 5th Gen",
      description: "bm-emr, Bare Metal, 128 Cores, 1TB Disk, 1TB Memory",
      category: "compute",
      type: "bare-metal",
      specs: {
        cores: "128",
        disk: "1TB",
        memory: "1TB",
      },
      price: 18000,
      selected: false,
    },
    {
      id: "bm-spr",
      name: "Intel Xeon Scalable 4th Gen",
      description: "bm-spr, Bare Metal, 112 Cores, 2TB Disk, 512Gi Memory",
      category: "compute",
      type: "bare-metal",
      specs: {
        cores: "112",
        disk: "2TB",
        memory: "512Gi",
      },
      price: 14000,
      selected: false,
    },
    {
      id: "vm-spr-lrg",
      name: "Intel Xeon Scalable 4th Gen",
      description: "vm-spr-lrg, Virtual Machine, 32 Cores, 64Gi Disk, 64Gi Memory",
      category: "compute",
      type: "virtual-machine",
      specs: {
        cores: "32",
        disk: "64Gi",
        memory: "64Gi",
      },
      price: 8000,
      selected: false,
    },
    {
      id: "vm-spr-med",
      name: "Intel Xeon Scalable 4th Gen",
      description: "vm-spr-med, Virtual Machine, 16 Cores, 32Gi Disk, 32Gi Memory",
      category: "compute",
      type: "virtual-machine",
      specs: {
        cores: "16",
        disk: "32Gi",
        memory: "32Gi",
      },
      price: 6000,
      selected: false,
    },
    {
      id: "vm-spr-sml",
      name: "Intel Xeon Scalable 4th Gen",
      description: "vm-spr-sml, Virtual Machine, 8 Cores, 20Gi Disk, 16Gi Memory",
      category: "compute",
      type: "virtual-machine",
      specs: {
        cores: "8",
        disk: "20Gi",
        memory: "16Gi",
      },
      price: 4000,
      selected: false,
    },
    {
      id: "dell-irss-dlc",
      name: "Dell IRSS DLC",
      description: "High-density rack with Direct Liquid Cooling - 42U - 80-100 kW",
      category: "compute",
      type: "infrastructure",
      specs: {
        other: "42U - 80-100 kW",
      },
      price: 50000,
      selected: false,
    },
    {
      id: "nvidia-h100",
      name: "Nvidia H100 SXM GPU",
      description: "with 141 GB HBM3",
      category: "gpu",
      type: "component",
      specs: {
        memory: "141 GB HBM3",
      },
      price: 30000,
      selected: false,
    },
    {
      id: "xeon-8480c",
      name: "Intel Xeon 8480C",
      description: "56-core CPU",
      category: "compute",
      type: "component",
      specs: {
        cores: "56",
      },
      price: 15000,
      selected: false,
    },
    {
      id: "dgx-h100",
      name: "DGX H100 chassis",
      description: "8 GPUs each",
      category: "gpu",
      type: "infrastructure",
      specs: {
        other: "8 GPUs",
      },
      price: 400000,
      selected: false,
    },
    {
      id: "supermicro-liquid",
      name: "Supermicro Liquid Cooling",
      description: "server with direct liquid cooling",
      category: "compute",
      type: "infrastructure",
      specs: {
        other: "direct liquid cooling",
      },
      price: 60000,
      selected: false,
    },
    {
      id: "mellanox-400",
      name: "Mellanox 400G HDR",
      description: "InfiniBand adapter",
      category: "networking",
      type: "component",
      specs: {
        other: "400G HDR",
      },
      price: 10000,
      selected: false,
    },
    {
      id: "nvidia-connectx-7",
      name: "NVIDIA ConnectX-7",
      description: "200Gb/s InfiniBand adapter",
      category: "networking",
      type: "component",
      specs: {
        other: "200Gb/s InfiniBand",
      },
      price: 8000,
      selected: false,
    },
    {
      id: "ethernet-400g",
      name: "400G Ethernet Switch",
      description: "High-speed networking switch",
      category: "networking",
      type: "infrastructure",
      specs: {
        other: "400G Ethernet",
      },
      price: 12000,
      selected: false,
    },
    {
      id: "datadog-monitoring",
      name: "Datadog Monitoring",
      description: "Full-stack monitoring platform",
      category: "monitoring",
      type: "software",
      specs: {
        other: "Full-stack monitoring",
      },
      price: 3000,
      selected: false,
    },
    {
      id: "dynatrace-monitoring",
      name: "Dynatrace Monitoring",
      description: "AI-powered observability",
      category: "monitoring",
      type: "software",
      specs: {
        other: "AI-powered observability",
      },
      price: 4000,
      selected: false,
    },
    {
      id: "newrelic-monitoring",
      name: "New Relic Monitoring",
      description: "Digital experience monitoring",
      category: "monitoring",
      type: "software",
      specs: {
        other: "Digital experience monitoring",
      },
      price: 2500,
      selected: false,
    },
    {
      id: "power-supply-3kw",
      name: "3kW Power Supply",
      description: "High-efficiency power supply unit",
      category: "other",
      type: "component",
      specs: {
        other: "3kW",
      },
      price: 500,
      selected: false,
    },
    {
      id: "rack-42u",
      name: "42U Server Rack",
      description: "Standard 42U server rack enclosure",
      category: "other",
      type: "infrastructure",
      specs: {
        other: "42U",
      },
      price: 1000,
      selected: false,
    },
    {
      id: "cable-management",
      name: "Cable Management System",
      description: "Organized cable routing solution",
      category: "other",
      type: "infrastructure",
      specs: {
        other: "Organized cable routing",
      },
      price: 300,
      selected: false,
    },
  ])

  const [selectedSkusCount, setSelectedSkusCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const selected = skus.filter((sku) => sku.selected)
    setSelectedSkusCount(selected.length)
    const price = selected.reduce((acc, sku) => acc + (sku.price || 0), 0)
    setTotalPrice(price)
  }, [skus])

  const filteredSkus = skus.filter((sku) => {
    const searchTermLower = searchTerm.toLowerCase()
    const matchesSearchTerm =
      sku.name.toLowerCase().includes(searchTermLower) || sku.description.toLowerCase().includes(searchTermLower)

    const matchesCategory = selectedCategory ? sku.category === selectedCategory : true

    return matchesSearchTerm && matchesCategory
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleCheckboxChange = (id: string) => {
    setSkus((prevSkus) => prevSkus.map((sku) => (sku.id === id ? { ...sku, selected: !sku.selected } : sku)))
  }

  const toggleSkuSelection = (id: string) => {
    setSkus((prevSkus) => prevSkus.map((sku) => (sku.id === id ? { ...sku, selected: !sku.selected } : sku)))
  }

  const selectedSkus = skus.filter((sku) => sku.selected)

  const handleContinue = () => {
    // Navigate to the targeted operational cost page
    router.push("/targeted-operational-cost")
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "compute":
        return <Server className="h-4 w-4 text-blue-300" />
      case "gpu":
        return <Laptop className="h-4 w-4 text-blue-300" />
      case "storage":
        return <Database className="h-4 w-4 text-blue-300" />
      case "networking":
        return <Network className="h-4 w-4 text-blue-300" />
      case "monitoring":
        return <Monitor className="h-4 w-4 text-blue-300" />
      default:
        return <SlidersHorizontal className="h-4 w-4 text-blue-300" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bare-metal":
        return <Server className="h-3 w-3 mr-1 text-blue-300" />
      case "virtual-machine":
        return <Laptop className="h-3 w-3 mr-1 text-blue-300" />
      case "component":
        return <Cpu className="h-3 w-3 mr-1 text-blue-300" />
      case "infrastructure":
        return <Server className="h-3 w-3 mr-1 text-blue-300" />
      case "software":
        return <SlidersHorizontal className="h-3 w-3 mr-1 text-blue-300" />
      default:
        return <SlidersHorizontal className="h-3 w-3 mr-1 text-blue-300" />
    }
  }

  const getSkusByCategory = (category: string) => {
    return skus.filter((sku) => sku.category === category)
  }

  return (
    <div className="flex-1 pt-2 overflow-y-auto">
      {/* Header section - now part of the scrollable content */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center text-white">
          <ShoppingCart className="h-6 w-6 text-white mr-3" />
          SKU Recommendations
        </h2>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-2 mb-4 max-w-3xl">
        <div className="flex items-start">
          <Info className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-white">
            Based on your use case requirements, we've recommended the following SKUs. Select the items you want to
            include in your solution.
          </p>
        </div>
      </div>

      {/* Search bar inside black content */}
      <div className="flex items-center mb-4 gap-2 max-w-3xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search SKUs by name or description..."
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

      <div className="space-y-2">
        {["compute", "gpu", "storage", "networking", "monitoring", "other"].map((category) => {
          const categorySkus = getSkusByCategory(category)
          if (categorySkus.length === 0) return null

          return (
            <div key={category} className="bg-blue-900/20 rounded-lg border border-blue-900/40 overflow-hidden">
              <button
                className="w-full bg-blue-900/40 px-4 py-2 flex items-center justify-between"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="text-sm font-medium text-blue-100 flex items-center">
                  {getCategoryIcon(category)}
                  <span className="ml-2 capitalize">{category}</span>
                </h3>
                <div className="flex items-center">
                  <span className="text-xs bg-blue-800/60 px-2 py-0.5 rounded-full text-blue-200 mr-2">
                    {categorySkus.length} SKUs
                  </span>
                  {expandedCategories[category] ? (
                    <ChevronDown className="h-4 w-4 text-blue-300" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-blue-300" />
                  )}
                </div>
              </button>

              {expandedCategories[category] && (
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {categorySkus.map((sku) => (
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
                              <h4 className="text-sm font-medium ml-2 text-white">{sku.name}</h4>
                              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs capitalize">
                                {sku.type.replace("-", " ")}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 mt-1">{sku.description}</p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {sku.specs.cores && (
                                <div className="flex items-center bg-blue-900/30 rounded px-2 py-1 text-xs">
                                  <Cpu className="h-3 w-3 mr-1 text-blue-300" />
                                  <span>{sku.specs.cores} Cores</span>
                                </div>
                              )}
                              {sku.specs.memory && (
                                <div className="flex items-center bg-blue-900/30 rounded px-2 py-1 text-xs">
                                  <MemoryStick className="h-3 w-3 mr-1 text-green-300" />
                                  <span>{sku.specs.memory}</span>
                                </div>
                              )}
                              {sku.specs.disk && (
                                <div className="flex items-center bg-blue-900/30 rounded px-2 py-1 text-xs">
                                  <HardDrive className="h-3 w-3 mr-1 text-yellow-300" />
                                  <span>{sku.specs.disk}</span>
                                </div>
                              )}
                              {sku.specs.other && (
                                <div className="flex items-center bg-blue-900/30 rounded px-2 py-1 text-xs">
                                  <Info className="h-3 w-3 mr-1 text-purple-300" />
                                  <span>{sku.specs.other}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center ml-3">
                            {sku.price && (
                              <div className="text-sm font-medium mr-3 font-mono text-white">
                                ${sku.price.toLocaleString()}
                              </div>
                            )}
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-900/40">
        <div className="flex items-center">
          <span className="text-sm mr-3 text-white">Selected: {selectedSkusCount} SKUs</span>
          <span className="text-sm font-medium text-white">${totalPrice.toLocaleString()}</span>
        </div>
        <Button onClick={handleContinue} className="bg-[#0068b5] hover:bg-[#0056a2]">
          Targeted Operational Cost
        </Button>
      </div>
    </div>
  )
}
