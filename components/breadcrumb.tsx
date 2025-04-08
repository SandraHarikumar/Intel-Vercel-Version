import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex  w-full max-w-3xl" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center text-xs">
            {index > 0 && <ChevronRight className="w-3 h-3 text-blue-300 mx-1" />}
            {item.active ? (
              <span className="text-blue-300">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-gray-300 hover:text-blue-300">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
