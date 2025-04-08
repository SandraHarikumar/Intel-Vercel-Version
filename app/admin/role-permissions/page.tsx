import { MainLayout } from "@/components/main-layout"
import { RolePermissionsManagement } from "@/components/admin/role-permissions-management"
import { Breadcrumb } from "@/components/breadcrumb"

export default function RolePermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/role-permissions">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Role Permissions", href: "/admin/role-permissions", active: true },
          ]}
        />
        <RolePermissionsManagement />
      </MainLayout>
    </div>
  )
}
