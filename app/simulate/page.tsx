import { MainLayout } from "@/components/main-layout"
import { DigitalTwinContent } from "@/components/digital-twin-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function DigitalTwinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/simulate">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "Build AI Pipeline", href: "/build-pipeline" },
            { label: "Digital Twin Simulation", href: "/simulate", active: true },
          ]}
        />
        <DigitalTwinContent />
      </MainLayout>
    </div>
  )
}
