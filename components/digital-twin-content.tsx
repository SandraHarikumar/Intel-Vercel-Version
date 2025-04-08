"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ChevronDown,
  ChevronRight,
  Check,
  Play,
  Settings,
  BarChart,
  Database,
  BrainCircuit,
  Cpu,
  Workflow,
  Maximize2,
  Minimize2,
  FileText,
  Layers,
  ChevronLeftIcon as ChevronDoubleLeft,
  ChevronRightIcon as ChevronDoubleRight,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { DigitalTwinVisualization } from "./digital-twin-visualization"

// At the top of the file
import { validateNumericInput, RateLimiter } from "@/utils/security"

// Add the useRouter import at the top
import { useRouter } from "next/navigation"

type SimulationTask = {
  id: string
  name: string
  icon: React.ReactNode
}

type SimulationCategory = {
  id: string
  title: string
  icon: React.ReactNode
}

export function DigitalTwinContent() {
  // Add the router inside the component function
  const router = useRouter()

  const simulationTasks: SimulationTask[] = [
    {
      id: "data-ingestion",
      name: "Data Ingestion",
      icon: <Database className="h-4 w-4" />,
    },
    {
      id: "training",
      name: "Training",
      icon: <BrainCircuit className="h-4 w-4" />,
    },
    {
      id: "inference",
      name: "Inference",
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      id: "end-to-end",
      name: "End to End Simulation",
      icon: <Workflow className="h-4 w-4" />,
    },
  ]

  const simulationCategories: SimulationCategory[] = [
    {
      id: "inputs",
      title: "Inputs",
      icon: <Database className="h-3.5 w-3.5" />,
    },
    {
      id: "steps",
      title: "Steps",
      icon: <Layers className="h-3.5 w-3.5" />,
    },
    {
      id: "parameters",
      title: "Parameters",
      icon: <Settings className="h-3.5 w-3.5" />,
    },
    {
      id: "outputs",
      title: "Outputs",
      icon: <BarChart className="h-3.5 w-3.5" />,
    },
  ]

  const [selectedTask, setSelectedTask] = useState("training")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    inputs: true,
    steps: true,
    parameters: true,
    outputs: true,
  })
  const [fullscreenVisualization, setFullscreenVisualization] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(0.85)

  const [simulationResults, setSimulationResults] = useState({
    accuracy: 0,
    loss: 0,
    time: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    powerUsage: 0,
  })

  const visualizationRef = useRef<{ startSimulation: () => void } | null>(null)

  // Near the top of the component
  const rateLimiter = useRef(new RateLimiter())

  // Add the setSimulationComplete state
  const [simulationComplete, setSimulationComplete] = useState(false)

  // Add a function to navigate to the proposal page
  const navigateToProposal = () => {
    router.push("/generate-proposal")
  }

  const toggleCategory = (categoryId: string) => {
    if (rightPanelCollapsed) {
      setRightPanelCollapsed(false)
      setActiveCategory(categoryId)
      setExpandedCategories({
        inputs: categoryId === "inputs",
        steps: categoryId === "steps",
        parameters: categoryId === "parameters",
        outputs: categoryId === "outputs",
      })
    } else {
      if (activeCategory === categoryId) {
        setExpandedCategories({
          ...expandedCategories,
          [categoryId]: !expandedCategories[categoryId],
        })
      } else {
        setActiveCategory(categoryId)
        setExpandedCategories({
          ...expandedCategories,
          [categoryId]: true,
        })
      }
    }
  }

  const toggleFullscreen = () => {
    setFullscreenVisualization(!fullscreenVisualization)
  }

  const toggleRightPanel = () => {
    setRightPanelCollapsed(!rightPanelCollapsed)
  }

  const collapseAllCategories = () => {
    setExpandedCategories({
      inputs: false,
      steps: false,
      parameters: false,
      outputs: false,
    })
  }

  const expandAllCategories = () => {
    setExpandedCategories({
      inputs: true,
      steps: true,
      parameters: true,
      outputs: true,
    })
  }

  const [lastSimulationTime, setLastSimulationTime] = useState(0)
  const SIMULATION_COOLDOWN = 2000 // 2 seconds cooldown

  // Update the handleSimulationComplete function to add navigation option
  const handleSimulationComplete = (results: any) => {
    // Validate results
    const validatedResults = {
      accuracy: typeof results?.accuracy === "number" ? results.accuracy : 0,
      loss: typeof results?.loss === "number" ? results.loss : 0,
      time: typeof results?.time === "number" ? results.time : 0,
      cpuUsage: typeof results?.cpuUsage === "number" ? results.cpuUsage : 0,
      memoryUsage: typeof results?.memoryUsage === "number" ? results.memoryUsage : 0,
      powerUsage: typeof results?.powerUsage === "number" ? results.powerUsage : 0,
    }

    setSimulationResults(validatedResults)
    // Expand the outputs category when simulation completes
    setExpandedCategories({
      ...expandedCategories,
      outputs: true,
    })
    setActiveCategory("outputs")

    // Show the "Generate Proposal" button when simulation is complete
    setSimulationComplete(true)
  }

  const handleRunSimulation = () => {
    if (!rateLimiter.current.canPerformAction("runSimulation", 2000)) {
      // Could add a toast notification here
      return
    }

    if (visualizationRef.current && typeof visualizationRef.current.startSimulation === "function") {
      visualizationRef.current.startSimulation()
      // Expand the outputs category
      setExpandedCategories({
        ...expandedCategories,
        outputs: true,
      })
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Left Panel - Simulation Tasks */}
      <div
        className={`${
          fullscreenVisualization ? "hidden" : "w-1/6"
        } bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-blue-900/50 mr-4 overflow-y-auto flex flex-col`}
      >
        <h2 className="text-sm font-semibold mb-2">Simulation Tasks</h2>
        <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-1.5 mb-3">
          Select a task to configure and simulate
        </div>

        <div className="space-y-1">
          {simulationTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className={cn(
                "w-full flex items-center text-left px-2 py-2 rounded-md transition-colors",
                selectedTask === task.id
                  ? "bg-blue-900/50 text-white"
                  : "text-gray-300 hover:bg-blue-900/30 hover:text-white",
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center mr-2",
                  selectedTask === task.id ? "bg-blue-600" : "bg-blue-900/50",
                )}
              >
                {task.icon}
              </div>
              <span className="text-sm">{task.name}</span>
              {selectedTask === task.id && <Check className="h-4 w-4 ml-auto text-blue-300" />}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-blue-900/50">
          <h3 className="text-sm font-semibold mb-2">Data Center Legend</h3>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-blue-900/50">
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-md bg-blue-700 mr-2 flex-shrink-0"></div>
                <span>Compute Servers</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-md bg-purple-700 mr-2 flex-shrink-0"></div>
                <span>Network Equipment</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-md bg-green-700 mr-2 flex-shrink-0"></div>
                <span>Storage Systems</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-md bg-pink-700 mr-2 flex-shrink-0"></div>
                <span>Database Servers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel - 3D Visualization (Placeholder) */}
      <div
        className={`${
          fullscreenVisualization ? "w-3/4" : rightPanelCollapsed ? "w-5/6" : "w-7/12"
        } bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 mr-4 overflow-hidden relative transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-4">
              {simulationTasks.find((t) => t.id === selectedTask)?.name} Visualization
            </h2>
            <Button
              onClick={navigateToProposal}
              className="bg-green-600 hover:bg-green-500 flex items-center h-8 text-sm"
            >
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Generate Proposal
            </Button>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleRightPanel}
              className="text-blue-400 hover:text-blue-300 p-1 rounded-md hover:bg-blue-900/30 mr-2"
            >
              {rightPanelCollapsed ? (
                <ChevronDoubleLeft className="h-4 w-4" />
              ) : (
                <ChevronDoubleRight className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-blue-400 hover:text-blue-300 p-1 rounded-md hover:bg-blue-900/30 mr-2"
            >
              {fullscreenVisualization ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <div className="flex items-center bg-blue-900/30 rounded-md px-2 py-1">
              <span className="text-xs text-gray-300 mr-2">Zoom:</span>
              <button
                onClick={() => setZoomLevel((prev) => validateNumericInput(prev - 0.1, 0.5, 1.5))}
                className="text-blue-400 hover:text-blue-300 p-1 rounded-md hover:bg-blue-900/30"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-xs text-blue-300 mx-1">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((prev) => validateNumericInput(prev + 0.1, 0.5, 1.5))}
                className="text-blue-400 hover:text-blue-300 p-1 rounded-md hover:bg-blue-900/30"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-2 mb-4">
          Interactive visualization of the digital twin simulation
        </div>

        <div className="h-[calc(100vh-250px)] min-h-[400px]">
          <DigitalTwinVisualization
            simulationType={selectedTask}
            onSimulationComplete={handleSimulationComplete}
            ref={visualizationRef}
            zoomLevel={zoomLevel}
          />
        </div>
      </div>

      {/* Right Panel - Simulation Categories */}
      <div
        className={`${
          fullscreenVisualization ? "hidden" : ""
        } transition-all duration-300 ${rightPanelCollapsed ? "w-12" : "w-1/4"}`}
      >
        {rightPanelCollapsed ? (
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 h-full flex flex-col items-center py-3 space-y-3">
            {simulationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50"
                }`}
                title={category.title}
              >
                {category.icon}
              </button>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 overflow-hidden">
            <div className="flex justify-between items-center p-2 border-b border-blue-900/50">
              <div className="flex space-x-1">
                <button
                  onClick={collapseAllCategories}
                  className="text-xs bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded flex items-center"
                >
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Collapse All
                </button>
                <button
                  onClick={expandAllCategories}
                  className="text-xs bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded flex items-center"
                >
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Expand All
                </button>
              </div>
              <button
                onClick={toggleRightPanel}
                className="text-blue-400 hover:text-blue-300 p-1 rounded-md hover:bg-blue-900/30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <div className="grid grid-cols-1 gap-2">
                {/* 1. Inputs Category */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleCategory("inputs")}
                    className="w-full flex items-center justify-between p-2 text-left border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-1.5">
                        <Database className="h-3 w-3 text-blue-300" />
                      </div>
                      <span className="font-medium text-sm">Inputs</span>
                    </div>
                    {expandedCategories.inputs ? (
                      <ChevronDown className="h-3 w-3 text-blue-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-blue-400" />
                    )}
                  </button>

                  {expandedCategories.inputs && (
                    <div className="p-2 text-xs">
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-black/20 rounded p-1.5">
                          <div className="font-medium text-blue-300 mb-0.5">Dataset</div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span>Synthetic</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Format:</span>
                            <span>Tabular</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Volume:</span>
                            <span>5.5M records</span>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded p-1.5">
                          <div className="font-medium text-blue-300 mb-0.5">Model</div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span>Transformer</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Size:</span>
                            <span>Large</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Hardware:</span>
                            <span>Intel® Xeon®</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Steps Category */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleCategory("steps")}
                    className="w-full flex items-center justify-between p-2 text-left border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-900/50 flex items-center justify-center mr-1.5">
                        <Layers className="h-3 w-3 text-green-300" />
                      </div>
                      <span className="font-medium text-sm">Steps</span>
                    </div>
                    {expandedCategories.steps ? (
                      <ChevronDown className="h-3 w-3 text-blue-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-blue-400" />
                    )}
                  </button>

                  {expandedCategories.steps && (
                    <div className="p-2 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-900/30 flex items-center justify-center mr-1 text-[9px] text-white">
                            1
                          </div>
                          <span className="font-medium">Initialize Model</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-900/30 flex items-center justify-center mr-1 text-[9px] text-white">
                            2
                          </div>
                          <span className="font-medium">Load Training Data</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-900/30 flex items-center justify-center mr-1 text-[9px] text-white">
                            3
                          </div>
                          <span className="font-medium">Run Training Loop</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-900/30 flex items-center justify-center mr-1 text-[9px] text-white">
                            4
                          </div>
                          <span className="font-medium">Track Resource Usage</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-900/30 flex items-center justify-center mr-1 text-[9px] text-white">
                            5
                          </div>
                          <span className="font-medium">Collect & Log Metrics</span>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-center">
                        <Button
                          onClick={handleRunSimulation}
                          className="bg-green-600 hover:bg-green-500 flex items-center h-6 text-xs px-2"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Simulation
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Parameters Category */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleCategory("parameters")}
                    className="w-full flex items-center justify-between p-2 text-left border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-yellow-900/50 flex items-center justify-center mr-1.5">
                        <Settings className="h-3 w-3 text-yellow-300" />
                      </div>
                      <span className="font-medium text-sm">Parameters</span>
                    </div>
                    {expandedCategories.parameters ? (
                      <ChevronDown className="h-3 w-3 text-blue-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-blue-400" />
                    )}
                  </button>

                  {expandedCategories.parameters && (
                    <div className="p-2 space-y-1.5 text-xs">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-medium text-gray-300">Learning Rate</label>
                          <span className="text-blue-300">0.001</span>
                        </div>
                        <Slider defaultValue={[0.001]} min={0.0001} max={0.01} step={0.0001} className="my-0.5" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-medium text-gray-300">Batch Size</label>
                          <span className="text-blue-300">64</span>
                        </div>
                        <Slider defaultValue={[64]} min={8} max={256} step={8} className="my-0.5" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-medium text-gray-300">Epochs</label>
                          <span className="text-blue-300">10</span>
                        </div>
                        <Slider defaultValue={[10]} min={1} max={50} step={1} className="my-0.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-black/20 rounded p-1">
                          <div className="font-medium text-blue-300 mb-0.5">Data Size</div>
                          <div className="flex space-x-1">
                            <button className="flex-1 bg-blue-900/30 rounded px-1 py-0.5">S</button>
                            <button className="flex-1 bg-blue-600/50 rounded px-1 py-0.5">M</button>
                            <button className="flex-1 bg-blue-900/30 rounded px-1 py-0.5">L</button>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded p-1">
                          <div className="font-medium text-blue-300 mb-0.5">Hardware</div>
                          <div className="flex space-x-1">
                            <button className="flex-1 bg-blue-900/30 rounded px-1 py-0.5">CPU</button>
                            <button className="flex-1 bg-blue-600/50 rounded px-1 py-0.5">GPU</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Outputs Category */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleCategory("outputs")}
                    className="w-full flex items-center justify-between p-2 text-left border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-900/50 flex items-center justify-center mr-1.5">
                        <BarChart className="h-3 w-3 text-purple-300" />
                      </div>
                      <span className="font-medium text-sm">Outputs</span>
                    </div>
                    {expandedCategories.outputs ? (
                      <ChevronDown className="h-3 w-3 text-blue-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-blue-400" />
                    )}
                  </button>

                  {expandedCategories.outputs && (
                    <div className="p-2 text-xs">
                      {simulationResults.time === 0 ? (
                        <div className="text-center text-gray-400 mb-1.5">Run simulation to view results</div>
                      ) : (
                        <div className="text-center text-green-400 mb-1.5">Simulation complete!</div>
                      )}

                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-black/20 rounded p-1">
                          <div className="font-medium text-blue-300 mb-0.5">Performance</div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Accuracy:</span>
                            <span>{simulationResults.accuracy > 0 ? `${simulationResults.accuracy}%` : "--"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Loss:</span>
                            <span>{simulationResults.loss > 0 ? simulationResults.loss : "--"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Time:</span>
                            <span>{simulationResults.time > 0 ? `${simulationResults.time}s` : "--"}</span>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded p-1">
                          <div className="font-medium text-blue-300 mb-0.5">Resources</div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">CPU:</span>
                            <span>{simulationResults.cpuUsage > 0 ? `${simulationResults.cpuUsage}%` : "--"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Memory:</span>
                            <span>
                              {simulationResults.memoryUsage > 0 ? `${simulationResults.memoryUsage}%` : "--"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Power:</span>
                            <span>{simulationResults.powerUsage > 0 ? `${simulationResults.powerUsage}%` : "--"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-gray-400">Model State:</span>
                        <span className="text-blue-300">{simulationResults.time > 0 ? "Trained" : "Not trained"}</span>
                      </div>

                      <div className="mt-1 flex justify-end">
                        <button className="flex items-center text-blue-400 hover:text-blue-300">
                          <FileText className="h-2.5 w-2.5 mr-0.5" />
                          <span>View Logs</span>
                        </button>
                      </div>
                      {simulationComplete && (
                        <div className="mt-4 flex justify-center">
                          <Button
                            onClick={navigateToProposal}
                            className="bg-green-600 hover:bg-green-500 flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            Generate Proposal
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
