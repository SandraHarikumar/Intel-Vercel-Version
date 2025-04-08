import { MainLayout } from "@/components/main-layout"
import { RolesManagement } from "@/components/admin/roles-management"

export default function RolesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/roles">
        <RolesManagement />
      </MainLayout>
    </div>
  )
}
