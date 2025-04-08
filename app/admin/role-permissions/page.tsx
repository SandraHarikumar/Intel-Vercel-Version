import { MainLayout } from "@/components/main-layout"
import { RolePermissionsManagement } from "@/components/admin/role-permissions-management"

export default function RolePermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/role-permissions">
        <RolePermissionsManagement />
      </MainLayout>
    </div>
  )
}
