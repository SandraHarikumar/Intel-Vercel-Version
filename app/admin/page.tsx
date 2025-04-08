import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to the roles page by default
  redirect("/admin/roles")
}
