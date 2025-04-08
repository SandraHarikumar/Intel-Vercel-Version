import { MainLayout } from "@/components/main-layout"
import { SkuRecommendations } from "@/components/sku-recommendations"

export default function SkuRecommendationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/sku-recommendations">
        <SkuRecommendations />
      </MainLayout>
    </div>
  )
}
