import { MainLayout } from "@/components/main-layout"
import { SkuRecommendations } from "@/components/sku-recommendations"
import { Breadcrumb } from "@/components/breadcrumb"

export default function SkuRecommendationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/sku-recommendations">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "SKU Recommendations", href: "/sku-recommendations", active: true },
          ]}
        />
        <SkuRecommendations />
      </MainLayout>
    </div>
  )
}
