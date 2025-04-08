"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  PieChart,
  Cpu,
  Play,
  FileText,
  Shield,
  ChevronDown,
  ChevronRight,
  Database,
  Settings,
  ShoppingCart,
  Network,
} from "lucide-react"

interface NavSubItem {
  label: string
  href: string
  active?: boolean
  subItems?: NavSubItem[]
}

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  subItems?: NavSubItem[]
}

interface SidebarProps {
  activeRoute?: string
}

export function Sidebar({ activeRoute = "/" }: SidebarProps) {
  const [expanded, setExpanded] = useState(false)
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)
  const [expandedAdminMenu, setExpandedAdminMenu] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Determine if the current route is under admin, knowledge base, or knowledge graphs
  const isAdminRoute = activeRoute.startsWith("/admin")
  const isKnowledgeBaseRoute = activeRoute === "/knowledge-base"
  const isKnowledgeGraphRoute = activeRoute.startsWith("/knowledge-graphs")
  const isITSupportRoute = isAdminRoute || isKnowledgeBaseRoute || isKnowledgeGraphRoute

  // Toggle submenu expansion
  const toggleSubmenu = (label: string) => {
    if (expandedSubmenu === label) {
      setExpandedSubmenu(null)
    } else {
      setExpandedSubmenu(label)
    }
  }

  // Toggle Admin submenu expansion
  const toggleAdminSubmenu = () => {
    setExpandedAdminMenu(!expandedAdminMenu)
  }

  // Automatically expand IT Support submenu and Admin submenu if on an admin route
  useEffect(() => {
    if (isAdminRoute) {
      setExpandedSubmenu("IT/Application Support")
      setExpandedAdminMenu(true)
    } else if (isKnowledgeBaseRoute || isKnowledgeGraphRoute) {
      setExpandedSubmenu("IT/Application Support")
    }
  }, [isAdminRoute, isKnowledgeBaseRoute, isKnowledgeGraphRoute])

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-3.5 w-3.5" />,
      label: "Use Case Explorer",
      href: "/",
      active: activeRoute === "/",
    },
    {
      icon: <ShoppingCart className="h-3.5 w-3.5" />,
      label: "SKU Recommendations",
      href: "/sku-recommendations",
      active:
        activeRoute === "/sku-recommendations" ||
        activeRoute === "/cost-questions" ||
        activeRoute === "/summary" ||
        activeRoute === "/calculate-roi",
    },
    {
      icon: <PieChart className="h-3.5 w-3.5" />,
      label: "Build AI Pipeline",
      href: "/build-pipeline",
      active: activeRoute === "/build-pipeline",
    },
    {
      icon: <Cpu className="h-3.5 w-3.5" />,
      label: "Simulate Digital Twin",
      href: "/simulate",
      active: activeRoute === "/simulate",
    },
    {
      icon: <FileText className="h-3.5 w-3.5" />,
      label: "Generate Proposal",
      href: "/generate-proposal",
      active: activeRoute === "/generate-proposal",
    },
    {
      icon: <Play className="h-3.5 w-3.5" />,
      label: "Execute",
      href: "/execute",
      active: activeRoute === "/execute",
    },
    {
      icon: <Settings className="h-3.5 w-3.5" />,
      label: "IT/Application Support",
      href: "/it-support",
      active: isITSupportRoute,
      subItems: [
        {
          label: "Knowledge Base",
          href: "/knowledge-base",
          active: activeRoute === "/knowledge-base",
        },
        {
          label: "Knowledge Graphs",
          href: "/knowledge-graphs",
          active: activeRoute === "/knowledge-graphs",
        },
        {
          label: "Admin",
          href: "/admin",
          active: isAdminRoute,
          subItems: [
            {
              label: "Create Roles",
              href: "/admin/roles",
              active: activeRoute === "/admin/roles",
            },
            {
              label: "Create Permissions",
              href: "/admin/permissions",
              active: activeRoute === "/admin/permissions",
            },
            {
              label: "Assign Users Roles",
              href: "/admin/user-roles",
              active: activeRoute === "/admin/user-roles",
            },
            {
              label: "Assign Role Permissions",
              href: "/admin/role-permissions",
              active: activeRoute === "/admin/role-permissions",
            },
            {
              label: "Assign User Data Access",
              href: "/admin/data-access",
              active: activeRoute === "/admin/data-access",
            },
          ],
        },
      ],
    },
  ]

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed top-[53px] h-[calc(100vh-53px)] bg-[#001a33] backdrop-blur-sm border-r border-[#003a66] transition-all duration-300 z-20",
        expanded ? "w-48" : "w-10",
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-2">
          <ul className="space-y-0.5">
            {navItems.map((item, index) => (
              <li key={index} className="px-1">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={cn(
                        "flex items-center w-full px-2 py-1.5 text-gray-300 hover:bg-[#002b4d] hover:text-white rounded-md transition-colors",
                        item.active && "bg-[#002b4d] text-white",
                      )}
                    >
                      <span className="min-w-4 flex justify-center">{item.icon}</span>
                      <span
                        className={cn(
                          "ml-1.5 whitespace-nowrap transition-opacity text-[10px] flex-1 text-left",
                          expanded ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {item.label}
                      </span>
                      {expanded && (
                        <span className="ml-auto">
                          {expandedSubmenu === item.label ? (
                            <ChevronDown className="h-2.5 w-2.5" />
                          ) : (
                            <ChevronRight className="h-2.5 w-2.5" />
                          )}
                        </span>
                      )}
                    </button>
                    {expanded && expandedSubmenu === item.label && (
                      <ul className="mt-0.5 ml-5 space-y-0.5">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {subItem.label === "Admin" && subItem.subItems ? (
                              <div>
                                <button
                                  onClick={toggleAdminSubmenu}
                                  className={cn(
                                    "flex items-center w-full px-2 py-1 text-gray-300 hover:bg-[#002b4d] hover:text-white rounded-md text-[10px] transition-colors justify-between",
                                    subItem.active && "bg-[#003a66] text-white",
                                  )}
                                >
                                  <div className="flex items-center">
                                    <Shield className="h-3 w-3 mr-1" />
                                    <span>{subItem.label}</span>
                                  </div>
                                  {expandedAdminMenu ? (
                                    <ChevronDown className="h-2 w-2" />
                                  ) : (
                                    <ChevronRight className="h-2 w-2" />
                                  )}
                                </button>
                                {expandedAdminMenu && (
                                  <ul className="mt-0.5 ml-3 space-y-0.5">
                                    {subItem.subItems.map((adminItem, adminIndex) => (
                                      <li key={adminIndex}>
                                        <Link
                                          href={adminItem.href}
                                          className={cn(
                                            "flex items-center px-1.5 py-0.5 text-gray-300 hover:bg-[#002b4d] hover:text-white rounded-md text-[9px] transition-colors",
                                            adminItem.active && "bg-[#003a66] text-white",
                                          )}
                                        >
                                          <span className="truncate">{adminItem.label}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex items-center px-2 py-1 text-gray-300 hover:bg-[#002b4d] hover:text-white rounded-md text-[10px] transition-colors",
                                  subItem.active && "bg-[#003a66] text-white",
                                )}
                              >
                                {subItem.label === "Knowledge Base" && <Database className="h-3 w-3 mr-1" />}
                                {subItem.label === "Knowledge Graphs" && <Network className="h-3 w-3 mr-1" />}
                                <span className="truncate">{subItem.label}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-1.5 text-gray-300 hover:bg-[#002b4d] hover:text-white rounded-md transition-colors",
                      item.active && "bg-[#002b4d] text-white",
                    )}
                  >
                    <span className="min-w-4 flex justify-center">{item.icon}</span>
                    <span
                      className={cn(
                        "ml-1.5 whitespace-nowrap transition-opacity text-[10px]",
                        expanded ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
