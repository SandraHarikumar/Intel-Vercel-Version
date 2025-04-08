import { MainLayout } from "@/components/main-layout"
import { CalculateRoiContent } from "@/components/calculate-roi-content"

export default function CalculateRoiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/calculate-roi">
        <CalculateRoiContent />
      </MainLayout>
    </div>
  )
}
