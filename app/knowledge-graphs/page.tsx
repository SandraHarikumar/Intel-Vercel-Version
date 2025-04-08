import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphsContent } from "@/components/knowledge-graphs/knowledge-graphs-content"

export default function KnowledgeGraphsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <KnowledgeGraphsContent />
      </MainLayout>
    </div>
  )
}
