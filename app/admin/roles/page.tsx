import { MainLayout } from "@/components/main-layout"
import { RolesManagement } from "@/components/admin/roles-management"
import { Breadcrumb } from "@/components/breadcrumb"

export default function RolesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0068b5] to-black text-white">
      <MainLayout activeRoute="/admin/roles">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "IT/Application Support", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Roles", href: "/admin/roles", active: true },
          ]}
        />
        <RolesManagement />
      </MainLayout>
    </div>
  )
}
