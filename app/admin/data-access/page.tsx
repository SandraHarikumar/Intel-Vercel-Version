import { MainLayout } from "@/components/main-layout"
import { UserDataAccessManagement } from "@/components/admin/user-data-access-management"
import { Breadcrumb } from "@/components/breadcrumb"

export default function DataAccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/data-access">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Data Access", href: "/admin/data-access", active: true },
          ]}
        />
        <UserDataAccessManagement />
      </MainLayout>
    </div>
  )
}
