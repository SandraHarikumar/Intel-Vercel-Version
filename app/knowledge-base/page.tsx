import { MainLayout } from "@/components/main-layout"
import { KnowledgeBaseContent } from "@/components/knowledge-base-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-base">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Knowledge Base", href: "/knowledge-base", active: true },
          ]}
        />
        <KnowledgeBaseContent />
      </MainLayout>
    </div>
  )
}
