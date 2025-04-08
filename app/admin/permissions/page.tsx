import { MainLayout } from "@/components/main-layout"
import { PermissionsManagement } from "@/components/admin/permissions-management"
import { Breadcrumb } from "@/components/breadcrumb"

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/permissions">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Permissions", href: "/admin/permissions", active: true },
          ]}
        />
        <PermissionsManagement />
      </MainLayout>
    </div>
  )
}
