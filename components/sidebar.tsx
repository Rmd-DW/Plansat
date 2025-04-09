"use client"

import { Home, BarChart2, FileText, HelpCircle, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isMobile?: boolean
  onClose?: () => void
}

export default function Sidebar({ activeSection, setActiveSection, isMobile = false, onClose }: SidebarProps) {
  const menuItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "analisis", label: "Análisis", icon: BarChart2 },
    { id: "reportes", label: "Reportes", icon: FileText },
    { id: "soporte", label: "Soporte", icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-card border-r h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <Link href="/dashboard">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-FE1MGS6isFplG4BZ1WYezlE61Ypq3j.png"
            alt="PLANSAT Logo"
            width={150}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t text-sm text-muted-foreground">
        <p>© 2025 PLANSAT</p>
      </div>
    </div>
  )
}

