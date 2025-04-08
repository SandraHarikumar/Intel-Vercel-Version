import { MainLayout } from "@/components/main-layout"
import { SummaryContent } from "@/components/summary-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/summary">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "SKU Recommendations", href: "/sku-recommendations" },
            { label: "Targeted Operational Cost", href: "/cost-questions" },
            { label: "Summary", href: "/summary", active: true },
          ]}
        />
        <SummaryContent />
      </MainLayout>
    </div>
  )
}
