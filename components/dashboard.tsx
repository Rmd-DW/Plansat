"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import FilterPanel from "@/components/filter-panel"
import ChartSection from "@/components/chart-section"
import LoadingScreen from "@/components/loading-screen"
import AnalysisSection from "@/components/analysis-section"
import ReportsSection from "@/components/reports-section"
import { useMobile } from "@/hooks/use-mobile"
import { Menu } from "lucide-react"
import type { VegetationType, YearData } from "@/types/data-types"
import { mockData } from "@/data/mock-data"
import MapÑuble from "@/components/map-nuble"
import Link from "next/link"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number>(2017)
  const [selectedCommune, setSelectedCommune] = useState<string>("Todas")
  const [selectedVegetationTypes, setSelectedVegetationTypes] = useState<VegetationType[]>([
    "Bosque Nativo",
    "Bosque Mixto",
    "Matorral",
    "Matorral Arborescente",
    "Matorral-Pradera",
    "Praderas",
  ])
  const [selectedImpactLevel, setSelectedImpactLevel] = useState<string>("Todos")
  const [activeSection, setActiveSection] = useState<string>("inicio")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isMobile = useMobile()

  // Cerrar sidebar al cambiar de sección en móvil
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Filter data based on selections
  const filteredData = mockData.filter((item) => {
    return (
      (selectedYear === 0 || item.year === selectedYear) &&
      (selectedCommune === "Todas" || item.commune === selectedCommune) &&
      selectedVegetationTypes.includes(item.vegetationType) &&
      (selectedImpactLevel === "Todos" || item.impactLevel === selectedImpactLevel)
    )
  })

  // Get years data for charts
  const getYearData = (): YearData[] => {
    const years = [1986, 2007, 2017]
    return years.map((year) => {
      const yearData = mockData.filter((item) => item.year === year)

      // Calculate total area by vegetation type
      const vegetationData: Record<VegetationType, number> = {
        "Bosque Nativo": 0,
        "Bosque Mixto": 0,
        Matorral: 0,
        "Matorral Arborescente": 0,
        "Matorral-Pradera": 0,
        Praderas: 0,
      }

      yearData.forEach((item) => {
        vegetationData[item.vegetationType] += item.area
      })

      return {
        year,
        data: vegetationData,
      }
    })
  }

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return (
          <div className="flex flex-col gap-6">
            <div className="h-[300px] md:h-[500px] rounded-lg overflow-hidden border">
              <MapÑuble
                data={filteredData}
                year={selectedYear}
                selectedCommune={selectedCommune}
                selectedVegetationTypes={selectedVegetationTypes}
              />
            </div>
            <ChartSection filteredData={filteredData} yearData={getYearData()} />
          </div>
        )
      case "analisis":
        return <AnalysisSection data={mockData} />
      case "reportes":
        return <ReportsSection data={mockData} />
      case "soporte":
        return (
          <div className="p-4 md:p-6 bg-card rounded-lg border">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Soporte y Contacto</h2>
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Ingrese su nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input type="email" className="w-full p-2 border rounded-md" placeholder="Ingrese su correo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensaje</label>
                <textarea className="w-full p-2 border rounded-md" rows={4} placeholder="Escriba su mensaje" />
              </div>
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Enviar Mensaje
              </button>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} minDisplayTime={3000} />
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Barra de navegación móvil */}
      {isMobile && (
        <div className="bg-white border-b py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 mr-2">
              <Menu size={24} />
            </button>
            <Link href="/dashboard">
              <h1 className="text-lg font-bold text-primary cursor-pointer">PLANSAT</h1>
            </Link>
          </div>
          <div className="text-sm font-medium">
            {activeSection === "inicio" && "Dashboard"}
            {activeSection === "analisis" && "Análisis"}
            {activeSection === "reportes" && "Reportes"}
            {activeSection === "soporte" && "Soporte"}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out" : "relative"} 
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {isMobile && <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />}
        <div className={`relative ${isMobile ? "w-64 h-full" : "h-screen"} z-50`}>
          <Sidebar
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
            isMobile={isMobile}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {!isMobile && activeSection !== "analisis" && activeSection !== "reportes" && (
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">
              Dashboard de Impacto de Incendios
            </h1>
          )}

          {activeSection === "inicio" && (
            <FilterPanel
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedCommune={selectedCommune}
              setSelectedCommune={setSelectedCommune}
              selectedVegetationTypes={selectedVegetationTypes}
              setSelectedVegetationTypes={setSelectedVegetationTypes}
              selectedImpactLevel={selectedImpactLevel}
              setSelectedImpactLevel={setSelectedImpactLevel}
              isMobile={isMobile}
            />
          )}

          <div className={`${activeSection === "inicio" ? "mt-4 md:mt-6" : "mt-0"}`}>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

