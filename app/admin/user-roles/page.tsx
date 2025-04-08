import { MainLayout } from "@/components/main-layout"
import { UserRolesManagement } from "@/components/admin/user-roles-management"

export default function UserRolesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/user-roles">
        <UserRolesManagement />
      </MainLayout>
    </div>
  )
}
