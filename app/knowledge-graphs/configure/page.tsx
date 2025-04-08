import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphConfiguration } from "@/components/knowledge-graphs/knowledge-graph-configuration"

export default function KnowledgeGraphConfigurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <KnowledgeGraphConfiguration />
      </MainLayout>
    </div>
  )
}
