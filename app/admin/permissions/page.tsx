import { MainLayout } from "@/components/main-layout"
import { PermissionsManagement } from "@/components/admin/permissions-management"

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/permissions">
        <PermissionsManagement />
      </MainLayout>
    </div>
  )
}
