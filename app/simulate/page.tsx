import { MainLayout } from "@/components/main-layout"
import { DigitalTwinContent } from "@/components/digital-twin-content"

export default function DigitalTwinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/simulate">
        <DigitalTwinContent />
      </MainLayout>
    </div>
  )
}
