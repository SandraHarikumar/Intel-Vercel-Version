import { MainLayout } from "@/components/main-layout"
import { UserRolesManagement } from "@/components/admin/user-roles-management"
import { Breadcrumb } from "@/components/breadcrumb"

export default function UserRolesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/user-roles">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "User Roles", href: "/admin/user-roles", active: true },
          ]}
        />
        <UserRolesManagement />
      </MainLayout>
    </div>
  )
}
