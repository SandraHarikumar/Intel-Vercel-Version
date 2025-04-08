import { MainLayout } from "@/components/main-layout"
import { BuildPipelineContent } from "@/components/build-pipeline-content"
import { Breadcrumb } from "@/components/breadcrumb"

export default function BuildPipelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/build-pipeline">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Explore Usecase", href: "/" },
            { label: "Build AI Pipeline", href: "/build-pipeline", active: true },
          ]}
        />
        <BuildPipelineContent />
      </MainLayout>
    </div>
  )
}
