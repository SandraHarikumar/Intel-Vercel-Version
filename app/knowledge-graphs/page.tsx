import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphsContent } from "@/components/knowledge-graphs/knowledge-graphs-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function KnowledgeGraphsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Knowledge Graphs", href: "/knowledge-graphs", active: true },
          ]}
        />
        <KnowledgeGraphsContent />
      </MainLayout>
    </div>
  )
}
