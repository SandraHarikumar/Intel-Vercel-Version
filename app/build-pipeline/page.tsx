import { MainLayout } from "@/components/main-layout"
import { BuildPipelineContent } from "@/components/build-pipeline-content"

export default function BuildPipelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/build-pipeline">
        <BuildPipelineContent />
      </MainLayout>
    </div>
  )
}
