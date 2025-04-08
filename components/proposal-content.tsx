"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsContext } from "@/components/ui/tabs"
import { FileText, Download, Edit, Save, X, CheckCircle, BarChart, DollarSign, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb } from "@/components/breadcrumb"

interface ProposalSection {
  id: string
  title: string
  content: string
  isEditing: boolean
  isExpanded: boolean
}

interface BOMItem {
  id: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export function ProposalContent() {
  const [activeTab, setActiveTab] = useState("bom")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Bill of Materials items based on selected SKUs from previous screens

   const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "SKU Recommendations", href: "/sku-recommendations" },
    { label: "Targeted Operational Cost", href: "/cost-questions" },
    { label: "Summary", href: "/summary", },
    { label: "Calculate ROI", href: "/calculate-roi", },
    { label: "Generate Proposal", href: "/generate-proposal", active: true },
  ]
  const [bomItems, setBomItems] = useState<BOMItem[]>([
    {
      id: "1",
      name: "Intel® Data Center GPU Max Series 1100",
      category: "Compute",
      quantity: 1,
      unitPrice: 5000,
      totalPrice: 5000,
    },
    {
      id: "2",
      name: "Intel Xeon Scalable 6th Gen",
      category: "Compute",
      quantity: 1,
      unitPrice: 15000,
      totalPrice: 15000,
    },
    {
      id: "3",
      name: "Pure FlashArray / X R3",
      category: "Storage",
      quantity: 1,
      unitPrice: 1000000,
      totalPrice: 1000000,
    },
    {
      id: "4",
      name: "Juniper QFX5700",
      category: "Networking",
      quantity: 1,
      unitPrice: 50000,
      totalPrice: 50000,
    },
    {
      id: "5",
      name: "LogicMonitor Envision",
      category: "Software",
      quantity: 1,
      unitPrice: 1200,
      totalPrice: 1200,
    },
    {
      id: "6",
      name: "Intel® oneAPI AI Analytics Toolkit",
      category: "Software",
      quantity: 1,
      unitPrice: 5000,
      totalPrice: 5000,
    },
    {
      id: "7",
      name: "Intel® Distribution of OpenVINO™ Toolkit",
      category: "Software",
      quantity: 1,
      unitPrice: 3000,
      totalPrice: 3000,
    },
    {
      id: "8",
      name: "Implementation Services",
      category: "Services",
      quantity: 1,
      unitPrice: 15000,
      totalPrice: 15000,
    },
    {
      id: "9",
      name: "Training & Knowledge Transfer",
      category: "Services",
      quantity: 1,
      unitPrice: 8000,
      totalPrice: 8000,
    },
  ])

  const [sections, setSections] = useState<ProposalSection[]>([
    {
      id: "solution-approach",
      title: "Solution Approach & Methodology",
      content: `Our solution leverages Intel's latest AI hardware and software stack to deliver a comprehensive fraud detection system tailored to your financial services requirements.

The approach combines Intel® Xeon® Scalable processors with Intel® Habana® Gaudi2 accelerators to provide optimal performance for both training and inference workloads. This hybrid architecture ensures cost-effective scaling while maintaining the low-latency response times required for real-time fraud detection.

Key technical specifications include:
- Intel® Xeon® 4th Generation processors for general compute and preprocessing
- Intel® Habana® Gaudi2 accelerators for deep learning model training
- Intel® Optane™ Persistent Memory for high-speed data access
- Intel® oneAPI toolkit for optimized software development
- OpenVINO™ for efficient model deployment and inference`,
      isEditing: false,
      isExpanded: true,
    },
    {
      id: "project-plan",
      title: "Project Plan & Timeline",
      content: `The implementation will follow a phased approach over a 16-week period:

Phase 1: Infrastructure Setup (Weeks 1-3)
- Hardware installation and configuration
- Base software stack deployment
- Network and security configuration

Phase 2: Data Integration (Weeks 4-6)
- Data pipeline development
- ETL process implementation
- Initial data validation

Phase 3: Model Development (Weeks 7-10)
- Feature engineering
- Model training and optimization
- Performance benchmarking

Phase 4: System Integration (Weeks 11-13)
- API development
- Integration with existing systems
- End-to-end testing

Phase 5: Deployment & Validation (Weeks 14-16)
- Production deployment
- Performance validation
- Knowledge transfer and documentation`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "pricing",
      title: "Pricing & Cost Estimates",
      content: `The total solution cost is $1,102,200, broken down as follows:

Hardware Components: $1,071,200
- Intel® Xeon® Scalable Processors: $15,000
- Intel® Habana® Gaudi2 Accelerators: $5,000
- Pure FlashArray / X R3: $1,000,000
- Juniper QFX5700: $50,000
- Other Hardware: $1,200

Software Components: $8,000
- Intel® oneAPI AI Analytics Toolkit: $5,000
- Intel® Distribution of OpenVINO™ Toolkit: $3,000

Professional Services: $23,000
- Implementation Services: $15,000
- Training & Knowledge Transfer: $8,000

Annual maintenance and support costs (starting year 2): $12,500`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "key-personnel",
      title: "Key Personnel & Experience",
      content: `The project will be delivered by a team of experienced professionals:

Project Lead: Dr. Sarah Chen
- 15+ years experience in AI/ML implementation
- Ph.D. in Computer Science, Stanford University
- Led 20+ enterprise AI deployments in financial services

Technical Architect: Michael Rodriguez
- Intel® Certified Solutions Architect
- 12 years experience with Intel hardware optimization
- Specialist in high-performance computing environments

ML Engineer: Priya Sharma
- Expert in fraud detection algorithms
- 8 years experience in financial services ML
- Published researcher in anomaly detection

Implementation Specialist: James Wilson
- 10+ years in enterprise system integration
- Certified in Intel® oneAPI and OpenVINO™
- Specialized in secure deployment architectures`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "references",
      title: "References & Case Studies",
      content: `Global Financial Services Company
- Implemented similar fraud detection system
- Achieved 99.2% detection rate with <0.1% false positives
- Reduced fraud losses by 78% in first year
- 60% improvement in processing time

Major European Bank
- Deployed Intel® Xeon® and Habana® Gaudi solution
- Handles 15,000 transactions per second
- Reduced infrastructure costs by 40%
- Improved model training time by 3.5x

North American Payment Processor
- Real-time fraud detection system
- 99.99% system availability
- 45ms average response time
- Scales to handle holiday shopping peaks`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "implementation",
      title: "Implementation & Delivery Strategy",
      content: `Our implementation strategy follows a collaborative approach:

1. Initial Assessment & Planning
  - Requirements validation
  - Environment assessment
  - Detailed implementation plan development

2. Agile Implementation
  - Two-week sprint cycles
  - Regular demos and feedback sessions
  - Continuous integration and testing

3. Knowledge Transfer
  - Hands-on training sessions
  - Comprehensive documentation
  - Shadowing opportunities with our experts

4. Post-Implementation Support
  - 30-day hypercare period
  - 24/7 critical issue support
  - Quarterly system health checks

5. Continuous Improvement
  - Performance optimization recommendations
  - Quarterly technology reviews
  - Model retraining guidance`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "risk-management",
      title: "Risk Management & Mitigation",
      content: `We've identified key risks and developed mitigation strategies:

Data Quality & Availability
- Risk: Insufficient or poor quality training data
- Mitigation: Early data assessment, synthetic data generation techniques, and data quality validation framework

Integration Complexity
- Risk: Challenges integrating with legacy systems
- Mitigation: Comprehensive API approach, middleware solutions, and phased integration

Performance Scalability
- Risk: System unable to handle peak loads
- Mitigation: Load testing at 2x expected volume, auto-scaling architecture, and performance monitoring

Security Compliance
- Risk: Regulatory or compliance issues
- Mitigation: Built-in compliance controls, regular security audits, and privacy-by-design approach

Model Drift
- Risk: Degradation of model accuracy over time
- Mitigation: Automated monitoring, retraining schedules, and A/B testing framework`,
      isEditing: false,
      isExpanded: false,
    },
  ])

  const toggleEdit = (id: string) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isEditing: !section.isEditing } : section)),
    )
  }

  const updateContent = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  const saveContent = (id: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, isEditing: false } : section)))
    setSuccessMessage("Section updated successfully")
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const toggleExpand = (id: string) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  const exportProposal = () => {
    setSuccessMessage("Proposal exported successfully")
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const saveProposal = () => {
    setSuccessMessage("Proposal saved successfully")
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  // Calculate total cost
  const totalCost = bomItems.reduce((sum, item) => sum + item.totalPrice, 0)

  // Group items by category
  const itemsByCategory = bomItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, BOMItem[]>,
  )

  // Calculate category totals
  const categoryTotals = Object.entries(itemsByCategory).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.totalPrice, 0),
  }))

  return (
    <div className="h-[calc(100vh-120px)]">
     <Breadcrumb items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Generate Proposal</h1>
        <div className="flex items-center space-x-2">
          <Button
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
            onClick={exportProposal}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Proposal
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm"
            onClick={saveProposal}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Proposal
          </Button>
        </div>
      </div>

      <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-2 mb-4">
        Review and customize the Bill of Materials and Proposal details before generating the final document
      </div>

      {showSuccessMessage && (
        <div className="mb-4 bg-green-900/20 border border-green-700/30 rounded-md p-3 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>{successMessage}</span>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShowSuccessMessage(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <TabsContext.Provider value={{ value: activeTab, onValueChange: setActiveTab }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-64 mb-4">
            <TabsTrigger value="bom">Bill of Materials</TabsTrigger>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
          </TabsList>

          <TabsContent value="bom" className="mt-0">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <ShoppingCart className="h-5 w-5 text-blue-400 mr-2" />
                  Bill of Materials
                </h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center text-xs">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Export as CSV
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-blue-900/50 overflow-hidden bg-gradient-to-b from-blue-950/30 to-black/50 mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-900/40 hover:bg-blue-900/50">
                      <TableHead className="text-blue-200 font-medium">Item</TableHead>
                      <TableHead className="text-blue-200 font-medium">Category</TableHead>
                      <TableHead className="text-blue-200 font-medium text-right">Quantity</TableHead>
                      <TableHead className="text-blue-200 font-medium text-right">Unit Price</TableHead>
                      <TableHead className="text-blue-200 font-medium text-right">Total Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bomItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-900/20">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <DollarSign className="h-3 w-3 text-green-400 mr-0.5" />
                            <span className="font-mono">{item.unitPrice.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <div className="flex items-center justify-end">
                            <DollarSign className="h-3 w-3 text-green-400 mr-0.5" />
                            <span className="font-mono">{item.totalPrice.toLocaleString()}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Total row */}
                    <TableRow className="bg-blue-900/30 font-medium hover:bg-blue-900/40">
                      <TableCell colSpan={4} className="text-right flex items-center justify-end">
                        <BarChart className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-200">Total</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <DollarSign className="h-4 w-4 text-green-400 mr-0.5" />
                          <span className="font-mono text-green-300">${totalCost.toLocaleString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <h3 className="text-md font-medium mb-3">Cost Breakdown by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-900/40">
                  <div className="space-y-2">
                    {categoryTotals.map((cat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{cat.category}</span>
                        <span className="font-medium">${cat.total.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-blue-900/30 flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-blue-300">${totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-900/40">
                  <h4 className="text-sm font-medium mb-2">Category Distribution</h4>
                  <div className="space-y-2">
                    {categoryTotals.map((cat, index) => {
                      const percentage = (cat.total / totalCost) * 100
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{cat.category}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-blue-900/30 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proposal" className="mt-0">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4 overflow-y-auto h-[calc(100vh-220px)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Proposal Details</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center text-xs">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Load Template
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center text-xs">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Export as PDF
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {sections.map((section) => (
                  <div key={section.id} className="bg-blue-950/40 rounded-md border border-blue-900/30 overflow-hidden">
                    <button
                      onClick={() => toggleExpand(section.id)}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <span className="font-medium">{section.title}</span>
                      <span className="ml-2 text-blue-400">{section.isExpanded ? "▼" : "▶"}</span>
                    </button>

                    {section.isExpanded && (
                      <div className="p-3 pt-0 border-t border-blue-900/30">
                        <div className="flex justify-end mb-2">
                          {section.isEditing ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 flex items-center text-xs"
                              onClick={() => saveContent(section.id)}
                            >
                              <Save className="h-3.5 w-3.5 mr-1 text-green-400" />
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 flex items-center text-xs"
                              onClick={() => toggleEdit(section.id)}
                            >
                              <Edit className="h-3.5 w-3.5 mr-1 text-blue-400" />
                              Edit
                            </Button>
                          )}
                        </div>

                        {section.isEditing ? (
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateContent(section.id, e.target.value)}
                            className="min-h-[200px] bg-blue-950/30 border-blue-800/50"
                          />
                        ) : (
                          <div className="whitespace-pre-line text-sm">{section.content}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContext.Provider>
    </div>
  )
}
