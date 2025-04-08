import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphViewer } from "@/components/knowledge-graphs/knowledge-graph-viewer"

export default function KnowledgeGraphViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <KnowledgeGraphViewer id={params.id} />
      </MainLayout>
    </div>
  )
}
