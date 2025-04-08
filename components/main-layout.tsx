"use client"

import { Sidebar } from "@/components/sidebar"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Bot } from "lucide-react"
import { IntelLogo } from "@/components/intel-logo"
import { DocumentUpload } from "@/components/document-upload"
import { UseCaseExplorer } from "@/components/use-case-explorer"
import { UseCaseAnalysis } from "@/components/use-case-analysis"
import { Breadcrumb } from "@/components/breadcrumb"

interface NavSubItem {
  label: string
  href: string
  active?: boolean
  subItems?: NavSubItem[]
}

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  subItems?: NavSubItem[]
}

interface MainLayoutProps {
  activeRoute?: string
}

export function MainLayout({ children, activeRoute = "/" }: MainLayoutProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisData, setAnalysisData] = useState({
    performance: {
      tps: "10,000+",
      latency: "50ms",
      volume: "5M transactions/day",
    },
    metrics: {
      fraudRate: "98.5%",
      falsePositive: "< 0.1%",
      accuracy: "99.2%",
    },
    deployment: {
      type: "Hybrid (Cloud + On-Premises)",
      inference: "Real-time",
      edge: "Not Required",
    },
  })

  const handleExploreUseCase = () => {
    setShowAnalysis(true)
  }

  // Determine breadcrumb items based on active route
  const getBreadcrumbItems = () => {
    if (activeRoute === "/") {
      return [
        { label: "Home", href: "/" },
        { label: "Use Case Explorer", href: "/", active: true },
      ]
    } else if (activeRoute === "/build-pipeline") {
      return [
        { label: "Home", href: "/" },
        { label: "Explore Usecase", href: "/" },
        { label: "Build AI Pipeline", href: "/build-pipeline", active: true },
      ]
    } else if (activeRoute === "/simulate") {
      return [
        { label: "Home", href: "/" },
        { label: "Explore Usecase", href: "/" },
        { label: "Build AI Pipeline", href: "/build-pipeline" },
        { label: "Digital Twin Simulation", href: "/simulate", active: true },
      ]
    } else if (activeRoute === "/generate-proposal") {
      return [
        { label: "Home", href: "/" },
        { label: "Explore Usecase", href: "/" },
        { label: "Build AI Pipeline", href: "/build-pipeline" },
        { label: "Digital Twin Simulation", href: "/simulate" },
        { label: "Generate Proposal", href: "/generate-proposal", active: true },
      ]
    }
    return []
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-[#003a66] bg-[#001a33] backdrop-blur-sm z-50 relative">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <IntelLogo className="h-10 w-16" />
            <h1 className="text-lg font-semibold tracking-tight">AI Compute Modeller</h1>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeRoute={activeRoute} />
        {activeRoute === "/" && <DocumentUpload />}
        <main className={`flex-1 overflow-y-auto ${activeRoute === "/" ? "ml-60" : "ml-12"}`}>
          {activeRoute === "/" ? (
            <>
              {/* <Breadcrumb items={getBreadcrumbItems()} /> */}
              <div className="p-2">
        <Breadcrumb items={getBreadcrumbItems()} />
      </div>
              <div className="flex gap-4 h-[calc(100vh-120px)]">
                <div className="w-7/12">
                  <UseCaseExplorer onExplore={handleExploreUseCase} />
                </div>

                <div className="w-5/12">
                  {showAnalysis ? (
                    <UseCaseAnalysis data={analysisData} initialExpanded={true} />
                  ) : (
                    <div className="bg-[#001a33] backdrop-blur-sm rounded-lg p-4 border border-[#003a66] h-full flex flex-col items-center justify-center">
                      <div className="text-center max-w-md">
                        <Bot className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Use Case Analysis</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          Fill in your use case details on the left panel and click "Explore Use Case" to generate an
                          AI-powered analysis.
                        </p>
                        <div className="flex flex-col items-center text-blue-300 text-sm space-y-4">
                          <div className="flex flex-col items-center">
                            <span>Complete the form</span>
                            <ArrowRight className="h-4 w-4 transform rotate-90 my-2" />
                          </div>
                          <div className="flex flex-col items-center">
                            <span>Click Explore</span>
                            <ArrowRight className="h-4 w-4 transform rotate-90 my-2" />
                          </div>
                          <div>
                            <span>View Analysis</span>
                          </div>
                        </div>
                        <div className="mt-6 p-3 bg-[#002b4d] rounded-md text-xs text-blue-200">
                          The analysis will include performance requirements, metrics, compliance needs, and deployment
                          recommendations tailored to your use case.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {children}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
