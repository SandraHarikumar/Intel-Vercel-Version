import { MainLayout } from "@/components/main-layout"
import { ProposalContent } from "@/components/proposal-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/generate-proposal">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "Build AI Pipeline", href: "/build-pipeline" },
            { label: "Digital Twin Simulation", href: "/simulate" },
            { label: "Generate Proposal", href: "/generate-proposal", active: true },
          ]}
        />
        <ProposalContent />
      </MainLayout>
    </div>
  )
}
