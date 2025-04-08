"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  return (
    <div className={cn("border border-blue-900/30 rounded-md overflow-hidden bg-blue-950/20 mb-2", className)}>
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function AccordionTrigger({ className, children, onClick }: AccordionTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between px-4 py-2 hover:bg-blue-900/30 hover:no-underline",
        className,
      )}
    >
      {children}
    </button>
  )
}

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
  expanded?: boolean
}

export function AccordionContent({ className, children, expanded = false }: AccordionContentProps) {
  if (!expanded) {
    return null
  }

  return <div className={cn("px-4 pb-4 pt-2", className)}>{children}</div>
}

interface AccordionProps {
  type: "single" | "multiple"
  defaultValue?: string[] | string
  className?: string
  children: React.ReactNode
}

export function Accordion({ type, defaultValue, className, children }: AccordionProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}
