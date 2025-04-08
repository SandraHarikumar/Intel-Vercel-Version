import { MainLayout } from "@/components/main-layout"
import { CostQuestionsContent } from "@/components/cost-questions-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CostQuestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/cost-questions">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "SKU Recommendations", href: "/sku-recommendations" },
            { label: "Targeted Operational Cost", href: "/cost-questions", active: true },
          ]}
        />
        <CostQuestionsContent />
      </MainLayout>
    </div>
  )
}
