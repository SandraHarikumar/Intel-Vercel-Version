import { MainLayout } from "@/components/main-layout"
import { CalculateRoiContent } from "@/components/calculate-roi-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CalculateRoiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/calculate-roi">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "SKU Recommendations", href: "/sku-recommendations" },
            { label: "Targeted Operational Cost", href: "/cost-questions" },
            { label: "Summary", href: "/summary" },
            { label: "Calculate ROI", href: "/calculate-roi", active: true },
          ]}
        />
        <CalculateRoiContent />
      </MainLayout>
    </div>
  )
}
