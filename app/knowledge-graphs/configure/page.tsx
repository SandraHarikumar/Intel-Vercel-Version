import { MainLayout } from "@/components/main-layout"
import { KnowledgeGraphConfiguration } from "@/components/knowledge-graphs/knowledge-graph-configuration"
import { Breadcrumb } from "@/components/breadcrumb"

export default function KnowledgeGraphConfigurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-graphs">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Knowledge Graphs", href: "/knowledge-graphs" },
            { label: "Configure Graph", href: "/knowledge-graphs/configure", active: true },
          ]}
        />
        <KnowledgeGraphConfiguration />
      </MainLayout>
    </div>
  )
}
