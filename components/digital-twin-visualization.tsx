"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"

// At the top of the file
import { generateSecureId, sanitizeText, safeErrorLog } from "@/utils/security"

// Add this function at the top of the file outside the component
// function generateSecureId(): string {
//   const array = new Uint32Array(2);
//   crypto.getRandomValues(array);
//   return `id-${array[0]}-${array[1]}`;
// }

// Add this function at the top of the file outside the component
// function sanitizeText(text: string): string {
//   return text.replace(/[<>&"']/g, (match) => {
//     switch (match) {
//       case '<': return '&lt;';
//       case '>': return '&gt;';
//       case '&': return '&amp;';
//       case '"': return '&quot;';
//       case "'": return '&#39;';
//       default: return match;
//     }
//   });
// }

interface DigitalTwinVisualizationProps {
  simulationType: string
  zoomLevel?: number
  onSimulationComplete?: (results: {
    accuracy: number
    loss: number
    time: number
    cpuUsage: number
    memoryUsage: number
    powerUsage: number
  }) => void
}

export const DigitalTwinVisualization = forwardRef<{ startSimulation: () => void }, DigitalTwinVisualizationProps>(
  ({ simulationType, zoomLevel = 0.85, onSimulationComplete }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [cpuUsage, setCpuUsage] = useState(0)
    const [memoryUsage, setMemoryUsage] = useState(0)
    const [powerUsage, setPowerUsage] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [simulationProgress, setSimulationProgress] = useState(0)
    const [simulationComplete, setSimulationComplete] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const [lastSimulationTime, setLastSimulationTime] = useState(0)
    const SIMULATION_COOLDOWN = 2000 // 2 seconds cooldown

    // Animation frame reference
    const animationRef = useRef<number>(0)

    // Server room state - simplified for better performance
    const [serverRoomState, setServerRoomState] = useState({
      racks: [] as any[],
      cables: [] as any[],
      dataFlows: [] as any[],
      coolingUnits: [] as any[],
      statusDisplays: [] as any[],
      rackUtilization: {} as Record<string, number>,
      networkActivity: {} as Record<string, number>,
      temperatureMap: {} as Record<string, number>,
      alertStatus: {} as Record<string, string>,
    })

    // Replace the scaleFactor with the zoomLevel prop
    const scaleFactor = zoomLevel

    // Initialize server room layout - simplified for better performance
    useEffect(() => {
      if (isInitialized) return

      try {
        // Define rack positions in a realistic data center layout - smaller size and better positioning
        const racks = [
          // Row 1 - Main compute racks (smaller size)
          { id: "rack-1", x: 80, y: 60, width: 60, height: 120, type: "compute", label: "Intel® Xeon® Rack 1" },
          { id: "rack-2", x: 160, y: 60, width: 60, height: 120, type: "compute", label: "Intel® Xeon® Rack 2" },
          { id: "rack-3", x: 240, y: 60, width: 60, height: 120, type: "compute", label: "Intel® Xeon® Rack 3" },
          { id: "rack-4", x: 320, y: 60, width: 60, height: 120, type: "compute", label: "Intel® Habana® Gaudi2" },

          // Row 2 - Network and storage (smaller size)
          { id: "rack-5", x: 80, y: 220, width: 60, height: 120, type: "network", label: "Core Network" },
          { id: "rack-6", x: 160, y: 220, width: 60, height: 120, type: "storage", label: "Primary Storage" },
          { id: "rack-7", x: 240, y: 220, width: 60, height: 120, type: "storage", label: "Backup Storage" },
          { id: "rack-8", x: 320, y: 220, width: 60, height: 120, type: "network", label: "Edge Network" },

          // Row 3 - Specialized systems (smaller size)
          { id: "rack-9", x: 440, y: 60, width: 60, height: 120, type: "compute", label: "Inference Servers" },
          { id: "rack-10", x: 520, y: 60, width: 60, height: 120, type: "database", label: "Database Cluster" },
          { id: "rack-11", x: 440, y: 220, width: 60, height: 120, type: "management", label: "Management" },
          { id: "rack-12", x: 520, y: 220, width: 60, height: 120, type: "security", label: "Security Systems" },
        ]

        // Define cooling units (smaller size)
        const coolingUnits = [
          { id: "cooling-1", x: 30, y: 60, width: 20, height: 120 },
          { id: "cooling-2", x: 30, y: 220, width: 20, height: 120 },
          { id: "cooling-3", x: 600, y: 60, width: 20, height: 120 },
          { id: "cooling-4", x: 600, y: 220, width: 20, height: 120 },
        ]

        // Define status displays (smaller size)
        const statusDisplays = [
          { id: "status-1", x: 80, y: 10, width: 120, height: 40, type: "system" },
          { id: "status-2", x: 240, y: 10, width: 120, height: 40, type: "network" },
          { id: "status-3", x: 400, y: 10, width: 120, height: 40, type: "power" },
        ]

        // Define network cables between racks - simplified
        const cables = [
          // Connect compute racks to network
          { id: "cable-1", from: "rack-1", to: "rack-5", color: "#3b82f6", width: 2 },
          { id: "cable-2", from: "rack-2", to: "rack-5", color: "#3b82f6", width: 2 },
          { id: "cable-3", from: "rack-3", to: "rack-5", color: "#3b82f6", width: 2 },
          { id: "cable-4", from: "rack-4", to: "rack-5", color: "#3b82f6", width: 2 },

          // Connect specialized racks to network
          { id: "cable-5", from: "rack-9", to: "rack-8", color: "#3b82f6", width: 2 },
          { id: "cable-6", from: "rack-10", to: "rack-8", color: "#3b82f6", width: 2 },

          // Connect storage to network
          { id: "cable-7", from: "rack-6", to: "rack-5", color: "#10b981", width: 3 },
          { id: "cable-8", from: "rack-7", to: "rack-5", color: "#10b981", width: 3 },

          // Connect networks together
          { id: "cable-9", from: "rack-5", to: "rack-8", color: "#8b5cf6", width: 4 },

          // Connect management to everything
          { id: "cable-10", from: "rack-11", to: "rack-5", color: "#f59e0b", width: 2 },
          { id: "cable-11", from: "rack-11", to: "rack-8", color: "#f59e0b", width: 2 },
        ]

        // Initialize rack utilization
        const rackUtilization: Record<string, number> = {}
        racks.forEach((rack) => {
          rackUtilization[rack.id] = 0
        })

        // Initialize network activity
        const networkActivity: Record<string, number> = {}
        cables.forEach((cable) => {
          networkActivity[cable.id] = 0
        })

        // Initialize temperature map
        const temperatureMap: Record<string, number> = {}
        racks.forEach((rack) => {
          temperatureMap[rack.id] = 20 + Math.random() * 5 // 20-25°C
        })

        // Initialize alert status
        const alertStatus: Record<string, string> = {}
        racks.forEach((rack) => {
          alertStatus[rack.id] = "normal"
        })

        // Set initial server room state
        setServerRoomState({
          racks,
          cables,
          dataFlows: [],
          coolingUnits,
          statusDisplays,
          rackUtilization,
          networkActivity,
          temperatureMap,
          alertStatus,
        })

        setIsInitialized(true)

        // Initial draw
        setTimeout(() => {
          if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            if (ctx) {
              drawVisualization(ctx)
            }
          }
        }, 100)
      } catch (error) {
        console.error("An error occurred in the visualization")
        // Log sanitized error for debugging
        const sanitizedError = error instanceof Error ? error.message : "Unknown error"
        if (process.env.NODE_ENV === "development") {
          console.debug("Debug info:", sanitizedError)
        }
        safeErrorLog(error, "visualization")
      }
    }, [isInitialized])

    // Add resize handler
    useEffect(() => {
      const handleResize = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const container = canvas.parentElement
          if (container) {
            // Make sure we have enough height to show everything
            const minHeight = 400
            canvas.width = container.clientWidth
            canvas.height = Math.max(container.clientHeight, minHeight)

            // Redraw after resize
            const ctx = canvas.getContext("2d")
            if (ctx) {
              drawVisualization(ctx)
            }
          }
        }
      }

      window.addEventListener("resize", handleResize)

      // Initial sizing
      setTimeout(handleResize, 100)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [isInitialized])

    const MAX_FPS = 30
    const FRAME_MIN_TIME = 1000 / MAX_FPS
    let lastFrameTime = 0

    // Animation loop
    useEffect(() => {
      if (!isInitialized) return

      let isMounted = true

      if (isSimulating) {
        let lastTimestamp = 0
        let frameCount = 0

        const animate = (timestamp: number) => {
          try {
            // Throttle frame rate
            const elapsed = timestamp - lastFrameTime
            if (elapsed < FRAME_MIN_TIME) {
              animationRef.current = requestAnimationFrame(animate)
              return
            }
            lastFrameTime = timestamp

            if (!lastTimestamp) lastTimestamp = timestamp
            const deltaTime = timestamp - lastTimestamp
            lastTimestamp = timestamp
            frameCount++

            // Only update simulation state every 2 frames for better performance
            if (frameCount % 2 === 0) {
              updateSimulation(deltaTime)
            }

            // Draw the current state
            const canvas = canvasRef.current
            if (canvas) {
              const ctx = canvas.getContext("2d")
              if (ctx) {
                drawVisualization(ctx)
              }
            }

            // Continue animation
            animationRef.current = requestAnimationFrame(animate)
          } catch (error) {
            console.error("An error occurred in the visualization")
            // Log sanitized error for debugging
            const sanitizedError = error instanceof Error ? error.message : "Unknown error"
            if (process.env.NODE_ENV === "development") {
              console.debug("Debug info:", sanitizedError)
            }
            safeErrorLog(error, "visualization")
            cancelAnimationFrame(animationRef.current)
          }
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
          isMounted = false
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = 0
          }
        }
      } else {
        // Even when not simulating, we want to draw the static visualization
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d")
          if (ctx) {
            drawVisualization(ctx)
          }
        }
      }

      return () => {
        isMounted = false
      }
    }, [isSimulating, isInitialized])

    // Update simulation state - simplified for better performance
    const updateSimulation = (deltaTime: number) => {
      // Update metrics
      setCpuUsage((prev) => {
        const target = isSimulating ? 60 + Math.sin(Date.now() / 2000) * 20 : 0
        return prev + (target - prev) * 0.05
      })

      setMemoryUsage((prev) => {
        const target = isSimulating ? 45 + Math.sin(Date.now() / 3000) * 15 : 0
        return prev + (target - prev) * 0.05
      })

      setPowerUsage((prev) => {
        const target = isSimulating ? 70 + Math.sin(Date.now() / 4000) * 10 : 0
        return prev + (target - prev) * 0.05
      })

      if (isSimulating) {
        setElapsedTime((prev) => prev + deltaTime / 1000)

        if (accuracy < 95) {
          setAccuracy((prev) => Math.min(95, prev + deltaTime * 0.01))
        }

        // Update simulation progress
        if (simulationProgress < 100) {
          setSimulationProgress((prev) => {
            const newProgress = Math.min(100, prev + deltaTime * 0.02)

            // When simulation reaches 100%, set it as complete
            if (newProgress >= 100 && prev < 100) {
              setSimulationComplete(true)
              const results = {
                accuracy: Number.parseFloat(accuracy.toFixed(2)),
                loss: Number.parseFloat((0.15 + Math.random() * 0.1).toFixed(4)),
                time: Number.parseFloat(elapsedTime.toFixed(1)),
                cpuUsage: Math.round(cpuUsage),
                memoryUsage: Math.round(memoryUsage),
                powerUsage: Math.round(powerUsage),
              }

              // Call the callback with the results
              if (onSimulationComplete) {
                onSimulationComplete(results)
              }

              // Pause simulation when complete
              setTimeout(() => {
                setIsSimulating(false)
              }, 500)
            }

            return newProgress
          })
        }
      }

      // Update server room state - simplified for better performance
      setServerRoomState((prev) => {
        // Create a deep copy to avoid mutation
        const newState = { ...prev }

        // Update rack utilization based on simulation
        if (isSimulating) {
          Object.keys(newState.rackUtilization).forEach((rackId) => {
            const rack = newState.racks.find((r) => r.id === rackId)
            if (!rack) return

            let targetUtilization = 0

            // Different utilization patterns based on rack type
            switch (rack.type) {
              case "compute":
                // Higher utilization for compute during training
                targetUtilization =
                  70 + Math.sin(Date.now() / (1000 + Number.parseInt(rackId.split("-")[1]) * 500)) * 20
                break
              case "network":
                // Variable network utilization
                targetUtilization = 50 + Math.sin(Date.now() / 1500) * 30
                break
              case "storage":
                // Storage has more consistent utilization
                targetUtilization = 40 + Math.sin(Date.now() / 3000) * 15
                break
              case "database":
                targetUtilization = 30 + Math.sin(Date.now() / 2000) * 20
                break
              case "management":
                targetUtilization = 20 + Math.sin(Date.now() / 4000) * 10
                break
              case "security":
                targetUtilization = 15 + Math.sin(Date.now() / 5000) * 5
                break
              default:
                targetUtilization = 10 + Math.sin(Date.now() / 3000) * 10
            }

            // Smooth transition to target
            newState.rackUtilization[rackId] =
              newState.rackUtilization[rackId] + (targetUtilization - newState.rackUtilization[rackId]) * 0.1
          })

          // Update network activity
          Object.keys(newState.networkActivity).forEach((cableId) => {
            const cable = newState.cables.find((c) => c.id === cableId)
            if (!cable) return

            // Calculate network activity based on connected rack utilization
            const sourceRack = cable.from
            const targetRack = cable.to

            const sourceUtil = newState.rackUtilization[sourceRack] || 0
            const targetUtil = newState.rackUtilization[targetRack] || 0

            // Network activity is influenced by both connected racks
            const baseActivity = (sourceUtil + targetUtil) / 3

            // Add some randomness for realistic network bursts
            const burstFactor = Math.random() > 0.95 ? Math.random() * 50 : 0

            // Smooth transition
            newState.networkActivity[cableId] =
              newState.networkActivity[cableId] + (baseActivity + burstFactor - newState.networkActivity[cableId]) * 0.2
          })

          // Update temperature based on utilization
          Object.keys(newState.temperatureMap).forEach((rackId) => {
            const utilization = newState.rackUtilization[rackId] || 0

            // Temperature rises with utilization
            const targetTemp = 20 + (utilization / 100) * 15 // 20-35°C range

            // Smooth transition
            newState.temperatureMap[rackId] =
              newState.temperatureMap[rackId] + (targetTemp - newState.temperatureMap[rackId]) * 0.05

            // Set alert status based on temperature
            if (newState.temperatureMap[rackId] > 30) {
              newState.alertStatus[rackId] = "warning"
            } else if (newState.temperatureMap[rackId] > 33) {
              newState.alertStatus[rackId] = "critical"
            } else {
              newState.alertStatus[rackId] = "normal"
            }
          })

          // Generate new data flows - simplified for better performance
          if (Math.random() > 0.95) {
            // Find active cables with high activity
            const activeCables = newState.cables.filter((cable) => newState.networkActivity[cable.id] > 20)

            if (activeCables.length > 0) {
              // Pick a random active cable
              const cable = activeCables[Math.floor(Math.random() * activeCables.length)]

              // Create a new data flow
              const sourceRack = newState.racks.find((r) => r.id === cable.from)
              const targetRack = newState.racks.find((r) => r.id === cable.to)

              if (sourceRack && targetRack) {
                const newFlow = {
                  id: generateSecureId(),
                  sourceId: sourceRack.id,
                  targetId: targetRack.id,
                  sourceX: sourceRack.x + sourceRack.width / 2,
                  sourceY: sourceRack.y + sourceRack.height / 2,
                  targetX: targetRack.x + targetRack.width / 2,
                  targetY: targetRack.y + targetRack.height / 2,
                  progress: 0,
                  speed: 0.001 + Math.random() * 0.002,
                  size: 2 + Math.random() * 3,
                  color: getFlowColor(sourceRack.type),
                }

                // Limit the number of active flows for better performance
                const activeFlows = [...newState.dataFlows.filter((flow) => flow.progress < 1)]
                if (activeFlows.length < 20) {
                  activeFlows.push(newFlow)
                }

                // Update progress of active flows
                activeFlows.forEach((flow) => {
                  flow.progress += flow.speed * deltaTime
                })

                newState.dataFlows = activeFlows
              }
            }
          } else {
            // Just update existing flows
            const activeFlows = newState.dataFlows.filter((flow) => flow.progress < 1)
            activeFlows.forEach((flow) => {
              flow.progress += flow.speed * deltaTime
            })
            newState.dataFlows = activeFlows
          }
        } else {
          // When not simulating, gradually reduce utilization and activity
          Object.keys(newState.rackUtilization).forEach((rackId) => {
            newState.rackUtilization[rackId] *= 0.95
          })

          Object.keys(newState.networkActivity).forEach((cableId) => {
            newState.networkActivity[cableId] *= 0.95
          })

          // Cool down temperature
          Object.keys(newState.temperatureMap).forEach((rackId) => {
            const targetTemp = 20 + Math.random() * 2 // 20-22°C when idle
            newState.temperatureMap[rackId] =
              newState.temperatureMap[rackId] + (targetTemp - newState.temperatureMap[rackId]) * 0.05

            // Reset alert status
            newState.alertStatus[rackId] = "normal"
          })

          // Clear data flows
          newState.dataFlows = []
        }

        return newState
      })
    }

    // Helper function to get flow color based on source type
    const getFlowColor = (sourceType: string): string => {
      switch (sourceType) {
        case "compute":
          return "#60a5fa" // blue
        case "storage":
          return "#34d399" // green
        case "network":
          return "#a78bfa" // purple
        case "database":
          return "#f472b6" // pink
        case "management":
          return "#f59e0b" // amber
        case "security":
          return "#ef4444" // red
        default:
          return "#60a5fa" // default blue
      }
    }

    // Draw the visualization - with scaling for better fit
    const drawVisualization = (ctx: CanvasRenderingContext2D) => {
      try {
        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        // Apply scaling to fit everything
        ctx.save()
        ctx.scale(scaleFactor, scaleFactor)

        // Center the content when scaled
        const offsetX = (ctx.canvas.width / scaleFactor - ctx.canvas.width) / 2
        const offsetY = (ctx.canvas.height / scaleFactor - ctx.canvas.height) / 2
        ctx.translate(offsetX, offsetY)

        // Draw data center background
        drawDataCenterBackground(ctx)

        // Draw cables between racks
        drawNetworkCables(ctx)

        // Draw data flows
        drawDataFlows(ctx)

        // Draw server racks
        drawServerRacks(ctx)

        // Draw cooling units
        drawCoolingUnits(ctx)

        // Draw status displays
        drawStatusDisplays(ctx)

        // Draw rack labels and status indicators
        drawRackLabels(ctx)

        // Restore original scale
        ctx.restore()
      } catch (error) {
        console.error("An error occurred in the visualization")
        // Log sanitized error for debugging
        const sanitizedError = error instanceof Error ? error.message : "Unknown error"
        if (process.env.NODE_ENV === "development") {
          console.debug("Debug info:", sanitizedError)
        }
        safeErrorLog(error, "visualization")
      }
    }

    // Add effect to redraw when zoom level changes
    useEffect(() => {
      if (isInitialized && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          drawVisualization(ctx)
        }
      }
    }, [zoomLevel, isInitialized])

    // Draw data center background with floor tiles and ceiling - simplified
    const drawDataCenterBackground = (ctx: CanvasRenderingContext2D) => {
      // Draw raised floor with grid pattern
      const tileSize = 40
      const width = ctx.canvas.width
      const height = ctx.canvas.height

      // Fill background
      ctx.fillStyle = "#0f172a" // Dark blue background
      ctx.fillRect(0, 0, width, height)

      // Draw floor grid
      ctx.strokeStyle = "rgba(30, 58, 138, 0.3)" // Light blue grid lines
      ctx.lineWidth = 1

      // Draw floor tiles
      for (let x = 0; x < width; x += tileSize) {
        for (let y = 0; y < height; y += tileSize) {
          // Alternate tile colors slightly for realistic look
          if ((x / tileSize + y / tileSize) % 2 === 0) {
            ctx.fillStyle = "rgba(30, 58, 138, 0.1)"
          } else {
            ctx.fillStyle = "rgba(30, 58, 138, 0.15)"
          }

          ctx.fillRect(x, y, tileSize, tileSize)
          ctx.strokeRect(x, y, tileSize, tileSize)
        }
      }

      // Add ceiling elements
      const ceilingLightSize = 20
      const ceilingLightSpacing = 120

      // Draw ceiling lights
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let x = ceilingLightSize * 2; x < width; x += ceilingLightSpacing) {
        for (let y = ceilingLightSize * 2; y < height; y += ceilingLightSpacing) {
          // Only draw lights in certain areas (not directly over racks)
          const shouldDrawLight = !serverRoomState.racks.some(
            (rack) =>
              x > rack.x - ceilingLightSize &&
              x < rack.x + rack.width + ceilingLightSize &&
              y > rack.y - ceilingLightSize &&
              y < rack.y + rack.height + ceilingLightSize,
          )

          if (shouldDrawLight) {
            // Draw light fixture
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
            ctx.fillRect(x - ceilingLightSize / 2, y - ceilingLightSize / 2, ceilingLightSize, ceilingLightSize)

            // Draw light glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, ceilingLightSize)
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, ceilingLightSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    // Draw cooling units - simplified
    const drawCoolingUnits = (ctx: CanvasRenderingContext2D) => {
      serverRoomState.coolingUnits.forEach((unit) => {
        // Draw cooling unit body
        ctx.fillStyle = "#1e3a8a" // Dark blue
        ctx.fillRect(unit.x, unit.y, unit.width, unit.height)

        // Draw cooling unit border
        ctx.strokeStyle = "#60a5fa" // Light blue
        ctx.lineWidth = 1
        ctx.strokeRect(unit.x, unit.y, unit.width, unit.height)

        // Draw cooling vents - simplified
        const ventCount = Math.floor(unit.height / 40)
        for (let i = 0; i < ventCount; i++) {
          const ventY = unit.y + 15 + i * 40

          // Draw vent slats
          ctx.fillStyle = "rgba(148, 163, 184, 0.5)" // Slate gray
          ctx.fillRect(unit.x + 5, ventY, unit.width - 10, 5)
        }

        // Draw status LED
        ctx.fillStyle = isSimulating ? "#22c55e" : "#64748b" // Green when active, gray when inactive
        ctx.beginPath()
        ctx.arc(unit.x + unit.width - 5, unit.y + 10, 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw network cables between racks - simplified
    const drawNetworkCables = (ctx: CanvasRenderingContext2D) => {
      if (!serverRoomState || !serverRoomState.cables) return

      serverRoomState.cables.forEach((cable) => {
        if (!cable || !cable.from || !cable.to) return

        const sourceRack = serverRoomState.racks?.find((r) => r?.id === cable.from)
        const targetRack = serverRoomState.racks?.find((r) => r?.id === cable.to)

        if (!sourceRack || !targetRack) return

        // Calculate connection points
        const sourceX = sourceRack.x + sourceRack.width / 2
        const sourceY = sourceRack.y + sourceRack.height / 2
        const targetX = targetRack.x + targetRack.width / 2
        const targetY = targetRack.y + targetRack.height / 2

        // Get network activity for this cable
        const activity = serverRoomState.networkActivity[cable.id] || 0

        // Draw cable with activity-based glow
        ctx.strokeStyle = cable.color
        ctx.lineWidth = cable.width

        // Draw main cable
        ctx.beginPath()
        ctx.moveTo(sourceX, sourceY)
        ctx.lineTo(targetX, targetY)
        ctx.stroke()

        // Draw activity glow for active cables
        if (activity > 20) {
          ctx.strokeStyle = `rgba(${hexToRgb(cable.color)}, ${Math.min(0.8, activity / 100)})`
          ctx.lineWidth = cable.width + 2
          ctx.beginPath()
          ctx.moveTo(sourceX, sourceY)
          ctx.lineTo(targetX, targetY)
          ctx.stroke()
        }
      })
    }

    // Draw data flows between racks - simplified
    const drawDataFlows = (ctx: CanvasRenderingContext2D) => {
      serverRoomState.dataFlows.forEach((flow) => {
        // Calculate current position
        const x = flow.sourceX + (flow.targetX - flow.sourceX) * flow.progress
        const y = flow.sourceY + (flow.targetY - flow.sourceY) * flow.progress

        // Draw data packet
        ctx.fillStyle = flow.color
        ctx.beginPath()
        ctx.arc(x, y, flow.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw server racks - enhanced for more realistic server room appearance
    const drawServerRacks = (ctx: CanvasRenderingContext2D) => {
      serverRoomState.racks.forEach((rack) => {
        // Draw rack base color based on type
        let rackColor
        switch (rack.type) {
          case "compute":
            rackColor = "#1e40af" // Blue
            break
          case "network":
            rackColor = "#5b21b6" // Purple
            break
          case "storage":
            rackColor = "#065f46" // Green
            break
          case "database":
            rackColor = "#9d174d" // Pink
            break
          case "management":
            rackColor = "#92400e" // Amber
            break
          case "security":
            rackColor = "#991b1b" // Red
            break
          default:
            rackColor = "#1e3a8a" // Default blue
        }

        // Draw rack body
        ctx.fillStyle = rackColor
        ctx.fillRect(rack.x, rack.y, rack.width, rack.height)

        // Draw rack border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.strokeRect(rack.x, rack.y, rack.width, rack.height)

        // Draw server units inside rack
        const serverHeight = 10
        const serverGap = 2
        const serversPerRack = Math.floor((rack.height - 10) / (serverHeight + serverGap))

        for (let i = 0; i < serversPerRack; i++) {
          const serverY = rack.y + 5 + i * (serverHeight + serverGap)

          // Alternate server colors for visual interest
          if (i % 2 === 0) {
            ctx.fillStyle = "rgba(30, 41, 59, 0.8)" // Darker server
          } else {
            ctx.fillStyle = "rgba(30, 41, 59, 0.6)" // Lighter server
          }

          ctx.fillRect(rack.x + 2, serverY, rack.width - 4, serverHeight)

          // Add server LED lights
          const ledSize = 2
          const ledGap = 4
          const ledsPerServer = 3

          for (let j = 0; j < ledsPerServer; j++) {
            // Randomize LED colors based on utilization
            const utilization = serverRoomState.rackUtilization[rack.id] || 0
            const isActive = Math.random() * 100 < utilization

            if (isActive) {
              // Active LED colors
              if (j === 0)
                ctx.fillStyle = "#22c55e" // Green
              else if (j === 1)
                ctx.fillStyle = "#3b82f6" // Blue
              else ctx.fillStyle = "#f59e0b" // Amber
            } else {
              ctx.fillStyle = "#64748b" // Gray when inactive
            }

            ctx.beginPath()
            ctx.arc(rack.x + rack.width - 6, serverY + 5, ledSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Draw utilization indicator
        const utilization = serverRoomState.rackUtilization[rack.id] || 0
        if (utilization > 5) {
          const barHeight = (rack.height - 10) * (utilization / 100)

          // Determine color based on utilization level
          let barColor
          if (utilization < 30) {
            barColor = "#22c55e" // Green
          } else if (utilization < 70) {
            barColor = "#f59e0b" // Amber
          } else {
            barColor = "#ef4444" // Red
          }

          // Draw vertical utilization bar
          ctx.fillStyle = barColor
          ctx.fillRect(rack.x + rack.width - 3, rack.y + rack.height - 5 - barHeight, 2, barHeight)
        }

        // Draw temperature indicator
        const alertStatus = serverRoomState.alertStatus[rack.id] || "normal"

        // Draw temperature LED
        let tempColor
        if (alertStatus === "normal") {
          tempColor = "#22c55e" // Green
        } else if (alertStatus === "warning") {
          tempColor = "#f59e0b" // Amber
        } else {
          tempColor = "#ef4444" // Red
        }

        // Draw temperature indicator
        ctx.fillStyle = tempColor
        ctx.beginPath()
        ctx.arc(rack.x + 5, rack.y + 10, 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw status displays - simplified
    const drawStatusDisplays = (ctx: CanvasRenderingContext2D) => {
      serverRoomState.statusDisplays.forEach((display) => {
        // Draw display background
        ctx.fillStyle = "#0f172a" // Dark blue
        ctx.fillRect(display.x, display.y, display.width, display.height)

        // Draw display border
        ctx.strokeStyle = "#475569" // Slate
        ctx.lineWidth = 2
        ctx.strokeRect(display.x, display.y, display.width, display.height)

        // Draw display content based on type
        if (display.type === "system") {
          // System status display
          ctx.fillStyle = "#f8fafc" // White
          ctx.font = "10px monospace"
          ctx.textAlign = "left"
          ctx.fillText("SYSTEM STATUS", display.x + 10, display.y + 15)

          // Draw CPU usage
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("CPU:", display.x + 10, display.y + 30)

          // Draw CPU bar background
          ctx.fillStyle = "#0f172a" // Dark background
          ctx.fillRect(display.x + 50, display.y + 24, 80, 8)

          // CPU usage color
          let cpuColor
          if (cpuUsage < 30) {
            cpuColor = "#22c55e" // Green
          } else if (cpuUsage < 70) {
            cpuColor = "#f59e0b" // Amber
          } else {
            cpuColor = "#ef4444" // Red
          }

          // Draw CPU bar
          const cpuBarWidth = 80 * (cpuUsage / 100)
          ctx.fillStyle = cpuColor
          ctx.fillRect(display.x + 50, display.y + 24, cpuBarWidth, 8)

          // Draw memory usage
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("MEM:", display.x + 10, display.y + 45)

          // Draw memory bar background
          ctx.fillStyle = "#0f172a" // Dark background
          ctx.fillRect(display.x + 50, display.y + 39, 80, 8)

          // Draw memory bar
          const memBarWidth = 80 * (memoryUsage / 100)
          ctx.fillStyle = "#8b5cf6" // Purple
          ctx.fillRect(display.x + 50, display.y + 39, memBarWidth, 8)
        } else if (display.type === "network") {
          // Network status display
          ctx.fillStyle = "#f8fafc" // White
          ctx.font = "10px monospace"
          ctx.textAlign = "left"
          ctx.fillText("NETWORK STATUS", display.x + 10, display.y + 15)

          // Calculate average network activity
          let totalActivity = 0
          let activeCount = 0

          Object.values(serverRoomState.networkActivity).forEach((activity) => {
            totalActivity += activity
            if (activity > 0) activeCount++
          })

          const avgActivity = activeCount > 0 ? totalActivity / activeCount : 0

          // Draw network activity
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("ACTIVITY:", display.x + 10, display.y + 30)

          // Draw activity bar background
          ctx.fillStyle = "#0f172a" // Dark background
          ctx.fillRect(display.x + 70, display.y + 24, 70, 8)

          // Draw activity bar
          const activityBarWidth = 70 * (avgActivity / 100)
          ctx.fillStyle = "#3b82f6" // Blue
          ctx.fillRect(display.x + 70, display.y + 24, activityBarWidth, 8)

          // Draw packet count
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("PACKETS:", display.x + 10, display.y + 45)

          // Simulate packet count
          const packetCount = isSimulating ? Math.floor(avgActivity * 10 + Math.sin(Date.now() / 1000) * 50) : 0

          ctx.fillStyle = "#f8fafc" // White
          ctx.textAlign = "left"
          ctx.fillText(`${packetCount}/s`, display.x + 70, display.y + 45)
        } else if (display.type === "power") {
          // Power status display
          ctx.fillStyle = "#f8fafc" // White
          ctx.font = "10px monospace"
          ctx.textAlign = "left"
          ctx.fillText("POWER STATUS", display.x + 10, display.y + 15)

          // Draw power usage
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("USAGE:", display.x + 10, display.y + 30)

          // Draw power bar background
          ctx.fillStyle = "#0f172a" // Dark background
          ctx.fillRect(display.x + 60, display.y + 24, 70, 8)

          // Draw power bar
          const powerBarWidth = 70 * (powerUsage / 100)
          ctx.fillStyle = "#10b981" // Green
          ctx.fillRect(display.x + 60, display.y + 24, powerBarWidth, 8)

          // Draw temperature
          ctx.fillStyle = "#94a3b8" // Slate
          ctx.fillText("TEMP:", display.x + 10, display.y + 45)

          // Calculate average temperature
          let totalTemp = 0
          let tempCount = 0

          Object.values(serverRoomState.temperatureMap).forEach((temp) => {
            totalTemp += temp
            tempCount++
          })

          const avgTemp = tempCount > 0 ? totalTemp / tempCount : 22

          ctx.fillStyle = "#f8fafc" // White
          ctx.textAlign = "left"
          ctx.fillText(`${avgTemp.toFixed(1)}°C`, display.x + 60, display.y + 45)
        }
      })
    }

    // Draw rack labels - simplified
    const drawRackLabels = (ctx: CanvasRenderingContext2D) => {
      serverRoomState.racks.forEach((rack) => {
        // Draw label background
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)" // Dark blue with transparency
        ctx.fillRect(rack.x, rack.y - 20, rack.width, 15)

        // Draw label text
        ctx.fillStyle = "#f8fafc" // White
        ctx.font = "9px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(sanitizeText(rack.label), rack.x + rack.width / 2, rack.y - 10)

        // Draw utilization percentage
        const utilization = serverRoomState.rackUtilization[rack.id] || 0
        if (utilization > 5) {
          ctx.fillStyle = "#f8fafc" // White
          ctx.font = "8px sans-serif"
          ctx.textAlign = "center"
          ctx.fillText(`${Math.round(utilization)}%`, rack.x + rack.width / 2, rack.y + rack.height + 12)
        }
      })
    }

    // Helper function to convert hex color to rgb
    const hexToRgb = (hex: string): string => {
      // Remove # if present
      hex = hex.replace("#", "")

      // Convert 3-digit hex to 6-digits
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }

      // Parse the hex values
      const r = Number.parseInt(hex.substring(0, 2), 16)
      const g = Number.parseInt(hex.substring(2, 4), 16)
      const b = Number.parseInt(hex.substring(4, 6), 16)

      return `${r}, ${g}, ${b}`
    }

    // Function to start the simulation
    const startSimulation = () => {
      const now = Date.now()
      if (now - lastSimulationTime < SIMULATION_COOLDOWN) {
        console.log("Please wait before starting another simulation")
        return
      }

      setLastSimulationTime(now)
      setIsSimulating(true)
      setSimulationProgress(0)
      setSimulationComplete(false)
      setCpuUsage(0)
      setMemoryUsage(0)
      setPowerUsage(0)
      setElapsedTime(0)
      setAccuracy(0)

      // Reset server room state
      setServerRoomState((prev) => {
        const newState = { ...prev }

        // Reset utilization
        Object.keys(newState.rackUtilization).forEach((rackId) => {
          newState.rackUtilization[rackId] = 0
        })

        // Reset network activity
        Object.keys(newState.networkActivity).forEach((cableId) => {
          newState.networkActivity[cableId] = 0
        })

        // Reset temperature
        Object.keys(newState.temperatureMap).forEach((rackId) => {
          newState.temperatureMap[rackId] = 20 + Math.random() * 2
        })

        // Reset alert status
        Object.keys(newState.alertStatus).forEach((rackId) => {
          newState.alertStatus[rackId] = "normal"
        })

        // Clear data flows
        newState.dataFlows = []

        return newState
      })

      // Initial draw
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          drawVisualization(ctx)
        }
      }
    }

    // Expose the startSimulation method to parent components
    useImperativeHandle(ref, () => ({
      startSimulation,
    }))

    // Handle canvas resize
    useEffect(() => {
      const handleResize = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const container = canvas.parentElement
          if (container) {
            // Make sure we have enough height to show everything
            const minHeight = 400
            canvas.width = container.clientWidth
            canvas.height = Math.max(container.clientHeight, minHeight)

            // Redraw after resize
            const ctx = canvas.getContext("2d")
            if (ctx) {
              drawVisualization(ctx)
            }
          }
        }
      }

      window.addEventListener("resize", handleResize)

      // Initial sizing
      setTimeout(handleResize, 100)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [isInitialized])

    return (
      <div className="flex flex-col h-full">
        {/* Simulation Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-300">Simulation Progress:</span>
            <span className="text-xs font-medium text-blue-300">{Math.round(simulationProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${simulationComplete ? "bg-green-500" : "bg-blue-500"}`}
              style={{ width: `${simulationProgress}%` }}
            ></div>
          </div>
        </div>

        <div
          className="flex-1 bg-gradient-to-b from-blue-900/20 to-blue-950/40 rounded-lg overflow-hidden relative"
          style={{ minHeight: "400px" }}
        >
          <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
        </div>
      </div>
    )
  },
)

DigitalTwinVisualization.displayName = "DigitalTwinVisualization"
