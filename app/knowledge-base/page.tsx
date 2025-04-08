import { MainLayout } from "@/components/main-layout"
import { KnowledgeBaseContent } from "@/components/knowledge-base-content"

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/knowledge-base">
        <KnowledgeBaseContent />
      </MainLayout>
    </div>
  )
}
