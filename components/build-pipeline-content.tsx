"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  ChevronRight,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  Database,
  Server,
  Workflow,
  Cpu,
  Cloud,
  Shield,
  BarChart,
  GitBranch,
  Layers,
  MessageSquare,
  Globe,
  Webhook,
  Sparkles,
  Box,
  Boxes,
  Activity,
  Lock,
  GitMerge,
  Gauge,
  BrainCircuit,
  MicroscopeIcon as Microchip,
  MemoryStickIcon as Memory,
  HardDrive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useRouter } from "next/navigation"

interface Hardware {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
  bgColor: string
  textColor: string
  taskId: string
}

interface Software {
  id: string
  name: string
  icon: React.ReactNode
  hardwareIds?: string[]
  selected?: boolean
  type: "software" | "hardware"
}

interface PipelineTask {
  id: string
  name: string
  software: Software[]
}

interface SelectedSoftware {
  taskId: string
  taskName: string
  softwareId: string
  softwareName: string
  icon: React.ReactNode
  hardwareIds?: string[]
  type: "software" | "hardware"
}

interface SelectedHardware {
  taskId: string
  taskName: string
  hardwareId: string
  hardwareName: string
  icon: React.ReactNode
  color: string
  bgColor: string
  textColor: string
}

export function BuildPipelineContent() {
  const router = useRouter()
  // Define Intel hardware options based on the provided list
  const intelHardware: Hardware[] = [
    {
      id: "xeon-scalable",
      name: "Intel® Xeon® Scalable Processors",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors optimized for data center workloads",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "data-ingestion",
    },
    {
      id: "xeon-preprocessing",
      name: "Intel® Xeon®",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "data-preprocessing",
    },
    {
      id: "quickassist",
      name: "Intel® QuickAssist Technology (QAT)",
      icon: <Workflow className="h-3 w-3 text-white" />,
      description: "Hardware acceleration for cryptography and compression",
      color: "bg-purple-600",
      bgColor: "bg-purple-600/90",
      textColor: "text-white",
      taskId: "data-preprocessing",
    },
    {
      id: "xeon-feature",
      name: "Intel® Xeon®",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "feature-engineering",
    },
    {
      id: "optane-memory",
      name: "Intel® Optane™ Persistent Memory",
      icon: <Memory className="h-3 w-3 text-white" />,
      description: "Persistent memory technology for high-performance storage",
      color: "bg-yellow-600",
      bgColor: "bg-yellow-600/90",
      textColor: "text-white",
      taskId: "feature-engineering",
    },
    {
      id: "xeon-training",
      name: "Intel® Xeon®",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "model-training",
    },
    {
      id: "habana-gaudi2",
      name: "Intel® Habana® Gaudi2 Deep Learning Accelerators",
      icon: <Microchip className="h-3 w-3 text-white" />,
      description: "Deep Learning Accelerators",
      color: "bg-green-600",
      bgColor: "bg-green-600/90",
      textColor: "text-white",
      taskId: "model-training",
    },
    {
      id: "xeon-inference",
      name: "Intel® Xeon®",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "inference-engine",
    },
    {
      id: "xeon-orchestration",
      name: "Intel® Xeon®",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "High-performance server processors",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "orchestration",
    },
    {
      id: "ssd-d7",
      name: "Intel® SSD D7-P5520",
      icon: <HardDrive className="h-3 w-3 text-white" />,
      description: "High-performance data center SSDs",
      color: "bg-red-600",
      bgColor: "bg-red-600/90",
      textColor: "text-white",
      taskId: "storage",
    },
    {
      id: "optane-storage",
      name: "Intel® Optane™ Persistent Memory",
      icon: <Memory className="h-3 w-3 text-white" />,
      description: "Persistent memory technology for high-performance storage",
      color: "bg-yellow-600",
      bgColor: "bg-yellow-600/90",
      textColor: "text-white",
      taskId: "storage",
    },
    {
      id: "rdt",
      name: "Intel® RDT (Resource Director Technology)",
      icon: <Gauge className="h-3 w-3 text-white" />,
      description: "Resource Director Technology",
      color: "bg-purple-600",
      bgColor: "bg-purple-600/90",
      textColor: "text-white",
      taskId: "monitoring",
    },
    {
      id: "sgx",
      name: "Intel® SGX (Software Guard Extensions)",
      icon: <Shield className="h-3 w-3 text-white" />,
      description: "Software Guard Extensions",
      color: "bg-green-600",
      bgColor: "bg-green-600/90",
      textColor: "text-white",
      taskId: "security",
    },
    {
      id: "txt",
      name: "Intel® TXT (Trusted Execution Technology)",
      icon: <Lock className="h-3 w-3 text-white" />,
      description: "Trusted Execution Technology",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "security",
    },
    {
      id: "tme",
      name: "Intel® TME (Total Memory Encryption)",
      icon: <Lock className="h-3 w-3 text-white" />,
      description: "Total Memory Encryption",
      color: "bg-red-600",
      bgColor: "bg-red-600/90",
      textColor: "text-white",
      taskId: "security",
    },
    {
      id: "dlb",
      name: "Intel® DLB (Data Streaming Accelerator)",
      icon: <Activity className="h-3 w-3 text-white" />,
      description: "Data Streaming Accelerator",
      color: "bg-yellow-600",
      bgColor: "bg-yellow-600/90",
      textColor: "text-white",
      taskId: "security",
    },
    {
      id: "xeon-mlops",
      name: "Intel® Xeon® (Xeon-powered Jenkins)",
      icon: <Cpu className="h-3 w-3 text-white" />,
      description: "Xeon-powered Jenkins",
      color: "bg-blue-600",
      bgColor: "bg-blue-600/90",
      textColor: "text-white",
      taskId: "mlops",
    },
  ]

  const [pipelineTasks, setPipelineTasks] = useState<PipelineTask[]>([
    {
      id: "data-ingestion",
      name: "Data Ingestion",
      software: [
        {
          id: "kafka",
          name: "Kafka",
          icon: <MessageSquare className="h-3 w-3 text-red-300" />,
          hardwareIds: ["xeon-scalable"],
          type: "software",
        },
        {
          id: "pubsub",
          name: "PubSub",
          icon: <Cloud className="h-3 w-3 text-purple-300" />,
          hardwareIds: ["xeon-scalable"],
          type: "software",
        },
        {
          id: "rest-apis",
          name: "REST APIs",
          icon: <Globe className="h-3 w-3 text-blue-300" />,
          hardwareIds: ["xeon-scalable"],
          type: "software",
        },
        {
          id: "webhooks",
          name: "Webhooks",
          icon: <Webhook className="h-3 w-3 text-green-300" />,
          hardwareIds: ["xeon-scalable"],
          type: "software",
        },
      ],
    },
    {
      id: "data-preprocessing",
      name: "Data Preprocessing",
      software: [
        {
          id: "apache-spark",
          name: "Apache Spark",
          icon: <Activity className="h-3 w-3 text-orange-300" />,
          type: "software",
        },
        { id: "pandas", name: "Pandas", icon: <Database className="h-3 w-3 text-blue-300" />, type: "software" },
        {
          id: "openvino-preprocessor",
          name: "OpenVINO Preprocessor",
          icon: <Cpu className="h-3 w-3 text-teal-300" />,
          type: "software",
        },
        {
          id: "feast",
          name: "Feature Store - Feast",
          icon: <Box className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
        {
          id: "redis",
          name: "Feature Store - Redis",
          icon: <Database className="h-3 w-3 text-red-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "feature-engineering",
      name: "Feature Engineering",
      software: [
        {
          id: "stream-processors",
          name: "Real-time stream processors",
          icon: <Activity className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "feature-repository",
          name: "Feature repository",
          icon: <Box className="h-3 w-3 text-green-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "model-type",
      name: "Model Type",
      software: [
        {
          id: "transformer-slms",
          name: "Transformer-based SLMs",
          icon: <BrainCircuit className="h-3 w-3 text-purple-300" />,
          type: "software",
        },
        {
          id: "lstm-attention",
          name: "LSTM + Attention Hybrid",
          icon: <Sparkles className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
        {
          id: "xgboost",
          name: "XGBoost Ensemble (Fallback)",
          icon: <Workflow className="h-3 w-3 text-green-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "model-training",
      name: "Model Training Pipeline",
      software: [
        {
          id: "intel-devcloud",
          name: "Intel DevCloud",
          icon: <Cloud className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "sagemaker",
          name: "AWS SageMaker",
          icon: <Cloud className="h-3 w-3 text-orange-300" />,
          type: "software",
        },
        {
          id: "mlflow",
          name: "MLflow for versioning",
          icon: <GitBranch className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "inference-engine",
      name: "Inference Engine",
      software: [
        {
          id: "openvino",
          name: "OpenVINO Toolkit",
          icon: <Cpu className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "triton",
          name: "Triton Inference Server",
          icon: <Server className="h-3 w-3 text-green-300" />,
          type: "software",
        },
        {
          id: "onnx",
          name: "ONNX Runtime",
          icon: <Workflow className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "orchestration",
      name: "Orchestration",
      software: [
        {
          id: "kubernetes",
          name: "Kubernetes (K8s)",
          icon: <Boxes className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "kserve",
          name: "KServe",
          icon: <Server className="h-3 w-3 text-green-300" />,
          type: "software",
        },
        {
          id: "kubeflow",
          name: "Kubeflow Pipelines",
          icon: <Workflow className="h-3 w-3 text-purple-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "storage",
      name: "Storage",
      software: [
        {
          id: "s3",
          name: "Object Storage - S3",
          icon: <Database className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
        {
          id: "minio",
          name: "Object Storage - MinIO",
          icon: <Database className="h-3 w-3 text-red-300" />,
          type: "software",
        },
        {
          id: "feature-store",
          name: "Feature Store",
          icon: <Box className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "timescaledb",
          name: "TimescaleDB",
          icon: <Database className="h-3 w-3 text-green-300" />,
          type: "software",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          icon: <Database className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "monitoring",
      name: "Monitoring & Observability",
      software: [
        {
          id: "grafana-prometheus",
          name: "Grafana + Prometheus",
          icon: <BarChart className="h-3 w-3 text-orange-300" />,
          type: "software",
        },
        {
          id: "elk",
          name: "ELK Stack",
          icon: <Layers className="h-3 w-3 text-red-300" />,
          type: "software",
        },
        {
          id: "intel-telemetry",
          name: "Intel Telemetry",
          icon: <Activity className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "rdt-tools",
          name: "RDT tools",
          icon: <Gauge className="h-3 w-3 text-purple-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Compliance",
      software: [
        {
          id: "iam",
          name: "IAM",
          icon: <Lock className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "rbac",
          name: "RBAC",
          icon: <Shield className="h-3 w-3 text-green-300" />,
          type: "software",
        },
        {
          id: "tls",
          name: "TLS Encryption",
          icon: <Lock className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
        {
          id: "intel-sgx",
          name: "Intel SGX for confidential inference",
          icon: <Shield className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "mlops",
      name: "CI/CD for ML (MLOps)",
      software: [
        {
          id: "gitlab-ci",
          name: "GitLab CI",
          icon: <GitMerge className="h-3 w-3 text-orange-300" />,
          type: "software",
        },
        {
          id: "jenkins",
          name: "Jenkins",
          icon: <GitBranch className="h-3 w-3 text-red-300" />,
          type: "software",
        },
        {
          id: "mlflow-cicd",
          name: "MLflow",
          icon: <GitBranch className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "dvc",
          name: "DVC",
          icon: <GitBranch className="h-3 w-3 text-purple-300" />,
          type: "software",
        },
        {
          id: "argocd",
          name: "ArgoCD",
          icon: <GitMerge className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "flux",
          name: "Flux",
          icon: <GitMerge className="h-3 w-3 text-green-300" />,
          type: "software",
        },
      ],
    },
    {
      id: "simulation",
      name: "Simulation Layer",
      software: [
        {
          id: "intel-ai-compute",
          name: "Intel AI Compute Modeler",
          icon: <Cpu className="h-3 w-3 text-blue-300" />,
          type: "software",
        },
        {
          id: "token-cost",
          name: "Token cost + power model",
          icon: <Gauge className="h-3 w-3 text-green-300" />,
          type: "software",
        },
        {
          id: "reward-penalty",
          name: "Reward/Penalty engine",
          icon: <Activity className="h-3 w-3 text-yellow-300" />,
          type: "software",
        },
      ],
    },
  ])

  // Initialize all tasks as collapsed (false) instead of expanded
  const initialExpandedTasks: Record<string, boolean> = {}
  pipelineTasks.forEach((task) => {
    initialExpandedTasks[task.id] = false
  })

  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(initialExpandedTasks)
  const [selectedSoftware, setSelectedSoftware] = useState<SelectedSoftware[]>([])
  const [selectedHardware, setSelectedHardware] = useState<SelectedHardware[]>([])
  const [activeTab, setActiveTab] = useState<"software" | "hardware">("software")

  // Initialize with all software selected
  useEffect(() => {
    const allSoftware: SelectedSoftware[] = []
    pipelineTasks.forEach((task) => {
      task.software.forEach((sw) => {
        allSoftware.push({
          taskId: task.id,
          taskName: task.name,
          softwareId: sw.id,
          softwareName: sw.name,
          icon: sw.icon,
          hardwareIds: sw.hardwareIds,
          type: sw.type || "software",
        })
      })
    })
    setSelectedSoftware(allSoftware)

    // Initialize with all hardware selected
    const allHardware: SelectedHardware[] = []
    intelHardware.forEach((hw) => {
      allHardware.push({
        taskId: hw.taskId,
        taskName: pipelineTasks.find((t) => t.id === hw.taskId)?.name || "",
        hardwareId: hw.id,
        hardwareName: hw.name,
        icon: hw.icon,
        color: hw.color,
        bgColor: hw.bgColor,
        textColor: hw.textColor,
      })
    })
    setSelectedHardware(allHardware)
  }, [])

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks({
      ...expandedTasks,
      [taskId]: !expandedTasks[taskId],
    })
  }

  const toggleSoftwareSelection = (taskId: string, taskName: string, softwareId: string, softwareName: string) => {
    const isSelected = selectedSoftware.some((item) => item.taskId === taskId && item.softwareId === softwareId)

    if (isSelected) {
      setSelectedSoftware(
        selectedSoftware.filter((item) => !(item.taskId === taskId && item.softwareId === softwareId)),
      )
    } else {
      // Find the icon, hardware, and type for this software
      const task = pipelineTasks.find((t) => t.id === taskId)
      const software = task?.software.find((s) => s.id === softwareId)
      const icon = software?.icon || <Box className="h-3 w-3" />
      const hardwareIds = software?.hardwareIds || []
      const type = software?.type || "software"

      setSelectedSoftware([
        ...selectedSoftware,
        { taskId, taskName, softwareId, softwareName, icon, hardwareIds, type },
      ])
    }
  }

  const toggleHardwareSelection = (hardware: Hardware) => {
    const isSelected = selectedHardware.some(
      (item) => item.taskId === hardware.taskId && item.hardwareId === hardware.id,
    )

    if (isSelected) {
      setSelectedHardware(
        selectedHardware.filter((item) => !(item.taskId === hardware.taskId && item.hardwareId === hardware.id)),
      )
    } else {
      const taskName = pipelineTasks.find((t) => t.id === hardware.taskId)?.name || ""
      setSelectedHardware([
        ...selectedHardware,
        {
          taskId: hardware.taskId,
          taskName,
          hardwareId: hardware.id,
          hardwareName: hardware.name,
          icon: hardware.icon,
          color: hardware.color,
          bgColor: hardware.bgColor,
          textColor: hardware.textColor,
        },
      ])
    }
  }

  const isSoftwareSelected = (taskId: string, softwareId: string) => {
    return selectedSoftware.some((item) => item.taskId === taskId && item.softwareId === softwareId)
  }

  const isHardwareSelected = (taskId: string, hardwareId: string) => {
    return selectedHardware.some((item) => item.taskId === taskId && item.hardwareId === hardwareId)
  }

  const getSelectedSoftwareForTask = (taskId: string) => {
    return selectedSoftware.filter((item) => item.taskId === taskId)
  }

  const getSelectedHardwareForTask = (taskId: string) => {
    return selectedHardware.filter((item) => item.taskId === taskId)
  }

  // Get unique tasks that have selected software, in the original order
  const getSelectedTasksInOrder = () => {
    const selectedTaskIds = new Set(selectedSoftware.map((item) => item.taskId))
    return pipelineTasks.filter((task) => selectedTaskIds.has(task.id))
  }

  // Group hardware by task
  const getHardwareByTask = () => {
    const hardwareByTask: Record<string, Hardware[]> = {}

    intelHardware.forEach((hw) => {
      if (!hardwareByTask[hw.taskId]) {
        hardwareByTask[hw.taskId] = []
      }
      hardwareByTask[hw.taskId].push(hw)
    })

    return hardwareByTask
  }

  // Number of tasks per row
  const tasksPerRow = 3

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Left Panel - Tree View */}
      <div className="w-1/4 bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-blue-900/50 mr-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-2">AI Pipeline Components</h2>
        <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-1.5 mb-3">
          Select components to build your pipeline
        </div>

        {/* Tab navigation */}
        <div className="flex mb-3 border-b border-blue-900/50">
          <button
            className={`flex-1 py-1.5 text-xs font-medium ${
              activeTab === "software" ? "text-blue-300 border-b-2 border-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("software")}
          >
            Software
          </button>
          <button
            className={`flex-1 py-1.5 text-xs font-medium ${
              activeTab === "hardware" ? "text-green-300 border-b-2 border-green-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("hardware")}
          >
            Hardware
          </button>
        </div>

        {activeTab === "software" ? (
          <div className="space-y-1">
            {pipelineTasks.map((task) => (
              <div key={task.id} className="text-xs">
                <button
                  onClick={() => toggleTaskExpansion(task.id)}
                  className="w-full flex items-center text-left hover:bg-blue-900/20 rounded px-1.5 py-1"
                >
                  {expandedTasks[task.id] ? (
                    <ChevronDown className="h-3 w-3 text-blue-400 mr-1 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-blue-400 mr-1 flex-shrink-0" />
                  )}
                  <span className="font-medium truncate">{task.name}</span>
                  <span className="ml-auto text-[10px] text-blue-300">
                    {getSelectedSoftwareForTask(task.id).length}/{task.software.length}
                  </span>
                </button>

                {expandedTasks[task.id] && (
                  <div className="ml-4 mt-0.5 space-y-0.5">
                    {task.software.map((sw) => (
                      <button
                        key={sw.id}
                        onClick={() => toggleSoftwareSelection(task.id, task.name, sw.id, sw.name)}
                        className={cn(
                          "flex items-center w-full px-1.5 py-0.5 rounded text-[11px]",
                          isSoftwareSelected(task.id, sw.id)
                            ? "bg-blue-700/40 text-white"
                            : "hover:bg-blue-900/30 text-gray-300",
                        )}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 mr-1.5 flex-shrink-0 flex items-center justify-center rounded-sm",
                            isSoftwareSelected(task.id, sw.id) ? "bg-blue-500" : "border border-blue-500",
                          )}
                        >
                          {isSoftwareSelected(task.id, sw.id) && <Check className="h-2 w-2" />}
                        </div>
                        <span className="truncate">{sw.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {Object.entries(getHardwareByTask()).map(([taskId, hardwareList]) => {
              const task = pipelineTasks.find((t) => t.id === taskId)
              if (!task) return null

              return (
                <div key={taskId} className="text-xs">
                  <button
                    onClick={() => toggleTaskExpansion(taskId)}
                    className="w-full flex items-center text-left hover:bg-green-900/20 rounded px-1.5 py-1"
                  >
                    {expandedTasks[taskId] ? (
                      <ChevronDown className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                    )}
                    <span className="font-medium truncate">{task.name}</span>
                    <span className="ml-auto text-[10px] text-green-300">
                      {getSelectedHardwareForTask(taskId).length}/{hardwareList.length}
                    </span>
                  </button>

                  {expandedTasks[taskId] && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {hardwareList.map((hw) => (
                        <button
                          key={hw.id}
                          onClick={() => toggleHardwareSelection(hw)}
                          className={cn(
                            "flex items-center w-full px-1.5 py-0.5 rounded text-[11px]",
                            isHardwareSelected(taskId, hw.id)
                              ? "bg-green-700/40 text-white"
                              : "hover:bg-green-900/30 text-gray-300",
                          )}
                        >
                          <div
                            className={cn(
                              "w-3 h-3 mr-1.5 flex-shrink-0 flex items-center justify-center rounded-sm",
                              isHardwareSelected(taskId, hw.id) ? "bg-green-500" : "border border-green-500",
                            )}
                          >
                            {isHardwareSelected(taskId, hw.id) && <Check className="h-2 w-2" />}
                          </div>
                          <span className="truncate">{hw.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Right Panel - Visual Pipeline */}
      <div className="w-3/4 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">AI Pipeline Visualization</h2>
        <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-2 mb-4">
          Visual representation of your selected AI pipeline components
        </div>

        {/* Hardware Legend */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Component Categories</h3>
          <div className="flex flex-wrap gap-4 mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-1.5"></div>
              <span className="text-xs text-blue-300">Software Components</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-1.5"></div>
              <span className="text-xs text-green-300">Hardware Components</span>
            </div>
          </div>

          <div className="text-xs text-blue-200 bg-blue-900/30 rounded-md p-2 mb-3">
            Each pipeline task shows the Intel hardware it runs on and the software components it uses
          </div>
        </div>

        {selectedSoftware.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-center">
            <div className="text-blue-300 mb-4">
              <ArrowDown className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg">Select pipeline components from the left panel</p>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Choose the software and hardware components for each pipeline task to build your customized AI solution
            </p>
          </div>
        ) : (
          <div className="px-2 relative">
            {/* Grid layout for pipeline tasks */}
            {(() => {
              const selectedTasks = getSelectedTasksInOrder()
              const rows = Math.ceil(selectedTasks.length / tasksPerRow)

              return Array.from({ length: rows }).map((_, rowIndex) => {
                const startIdx = rowIndex * tasksPerRow
                const endIdx = Math.min(startIdx + tasksPerRow, selectedTasks.length)
                const rowTasks = selectedTasks.slice(startIdx, endIdx)

                return (
                  <div key={`row-${rowIndex}`} className="mb-10 relative z-10">
                    {/* Task blocks in this row */}
                    <div className="flex justify-between items-start">
                      {rowTasks.map((task, colIndex) => {
                        const taskIndex = startIdx + colIndex
                        const isLastInRow = colIndex === rowTasks.length - 1
                        const isLastTask = taskIndex === selectedTasks.length - 1

                        // Get software and hardware for this task
                        const taskSoftware = getSelectedSoftwareForTask(task.id).filter((sw) => sw.type === "software")
                        const taskHardware = getSelectedHardwareForTask(task.id)

                        return (
                          <div key={task.id} className="relative flex-1 mx-2">
                            {/* Task Block */}
                            <div className="bg-gradient-to-r from-blue-900/70 to-blue-800/50 rounded-lg p-2 border border-blue-700/50 shadow-lg">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium text-white text-xs flex items-center">
                                  <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center mr-1.5 text-[10px]">
                                    {taskIndex + 1}
                                  </span>
                                  {task.name}
                                </h3>
                              </div>

                              {/* Hardware Section - Show this first */}
                              {taskHardware.length > 0 && (
                                <div className="mb-2">
                                  <div className="text-[10px] text-green-300 mb-1 border-b border-blue-700/50 pb-0.5">
                                    Hardware
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {taskHardware.map((hw) => (
                                      <div key={hw.hardwareId} className="flex flex-col">
                                        <div className="flex items-center bg-green-900/30 rounded-md p-1 text-xs">
                                          <div
                                            className={`w-3 h-3 rounded-full ${hw.color} mr-1.5 flex-shrink-0 flex items-center justify-center`}
                                          >
                                            {hw.icon}
                                          </div>
                                          <span className="truncate">{hw.hardwareName}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Software Section */}
                              {taskSoftware.length > 0 && (
                                <div className="mb-2">
                                  <div className="text-[10px] text-blue-300 mb-1 border-b border-blue-700/50 pb-0.5">
                                    Software
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {taskSoftware.map((sw) => (
                                      <div key={sw.softwareId} className="flex flex-col">
                                        <div className="flex items-center justify-between bg-blue-950/70 rounded-md p-1 text-xs">
                                          <div className="flex items-center truncate mr-1">
                                            <span className="mr-1.5">{sw.icon}</span>
                                            <span className="truncate">{sw.softwareName}</span>
                                          </div>
                                          <button
                                            onClick={() =>
                                              toggleSoftwareSelection(
                                                sw.taskId,
                                                sw.taskName,
                                                sw.softwareId,
                                                sw.softwareName,
                                              )
                                            }
                                            className="text-red-400 hover:text-red-300 flex-shrink-0"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Horizontal arrow if not last in row */}
                            {!isLastInRow && (
                              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <ArrowRight className="h-4 w-4 text-blue-400" />
                              </div>
                            )}

                            {/* Connection to next row */}
                            {isLastInRow && !isLastTask && (
                              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <div className="h-4 w-0.5 bg-cyan-500"></div>
                                <div className="relative">
                                  <div className="absolute top-0 left-0 w-[100px] h-0.5 bg-cyan-500 -translate-x-full"></div>
                                  <div className="absolute top-0 left-0 h-4 w-0.5 bg-cyan-500"></div>
                                  <ArrowDown className="h-4 w-4 text-cyan-500 mt-4" />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Connection from last in row to first in next row */}
                    {rowIndex < rows - 1 && (
                      <div
                        className="absolute left-0 -bottom-8 h-0.5 bg-cyan-500"
                        style={{
                          width: `calc(${100 / tasksPerRow}% - 1rem)`,
                          marginLeft: "0.5rem",
                        }}
                      ></div>
                    )}
                  </div>
                )
              })
            })()}
          </div>
        )}

        {selectedSoftware.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={() => router.push("/simulate")} className="bg-blue-700 hover:bg-blue-600 h-8 text-sm">
              Simulate Digital Twin
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
