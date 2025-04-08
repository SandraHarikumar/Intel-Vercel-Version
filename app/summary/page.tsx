import { MainLayout } from "@/components/main-layout"
import { SummaryContent } from "@/components/summary-content"

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/summary">
        <SummaryContent />
      </MainLayout>
    </div>
  )
}
