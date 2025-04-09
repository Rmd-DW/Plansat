"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface DashboardLinkProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export default function DashboardLink({
  className,
  variant = "default",
  size = "default",
  children = "Acceder",
}: DashboardLinkProps) {
  return (
    <Link href="/loading">
      <Button variant={variant} size={size} className={className}>
        {children}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  )
}

