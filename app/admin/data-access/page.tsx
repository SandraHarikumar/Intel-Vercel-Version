import { MainLayout } from "@/components/main-layout"
import { UserDataAccessManagement } from "@/components/admin/user-data-access-management"

export default function DataAccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/data-access">
        <UserDataAccessManagement />
      </MainLayout>
    </div>
  )
}
