import { MainLayout } from "@/components/main-layout"
import { CostQuestionsContent } from "@/components/cost-questions-content"

export default function CostQuestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/cost-questions">
        <CostQuestionsContent />
      </MainLayout>
    </div>
  )
}
