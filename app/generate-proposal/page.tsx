import { MainLayout } from "@/components/main-layout"
import { ProposalContent } from "@/components/proposal-content"

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/generate-proposal">
        <ProposalContent />
      </MainLayout>
    </div>
  )
}
