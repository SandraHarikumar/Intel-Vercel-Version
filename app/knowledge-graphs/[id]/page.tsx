import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphViewer } from "@/components/knowledge-graphs/knowledge-graph-viewer"
import { Breadcrumb } from "@/components/breadcrumb"

export default function KnowledgeGraphViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Knowledge Graphs", href: "/knowledge-graphs" },
            { label: "View Graph", href: `/knowledge-graphs/${params.id}`, active: true },
          ]}
        />
        <KnowledgeGraphViewer id={params.id} />
      </MainLayout>
    </div>
  )
}
