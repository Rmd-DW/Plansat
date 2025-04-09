"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import ComparativeChartJS from "@/components/comparative-chart-js"
import StatsComparison from "@/components/stats-comparison"
import type { FireData } from "@/types/data-types"

interface AnalysisSectionProps {
  data: FireData[]
}

export default function AnalysisSection({ data }: AnalysisSectionProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2017)
  const [selectedCommune, setSelectedCommune] = useState<string>("Todas")

  // Filtrar datos según selecciones
  const filteredData = data.filter((item) => {
    if (selectedYear !== 0 && item.year !== selectedYear) return false
    if (selectedCommune !== "Todas" && item.commune !== selectedCommune) return false
    return true
  })

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg border p-3 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-3 md:mb-4">Módulo de Análisis</h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
          Seleccione los filtros para actualizar los análisis y comparar datos entre años o comunas.
        </p>

        {/* Filtros */}
        <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <h3 className="font-medium mb-3 md:mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Año registro</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <option value={0}>Todos</option>
                <option value={2017}>2017</option>
                <option value={2007}>2007</option>
                <option value={1986}>1986</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comunas</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Chillán">Chillán</option>
                <option value="San Nicolás">San Nicolás</option>
                <option value="Coelemu">Coelemu</option>
                <option value="Quirihue">Quirihue</option>
                <option value="Bulnes">Bulnes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secciones de análisis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardContent className="p-3 md:p-4">
              <h3 className="font-medium mb-1 md:mb-2 text-primary">Análisis Comparativo</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Comparación de áreas afectadas entre períodos seleccionados.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-medium mb-1 md:mb-2">
                Proyecciones Futuras <span className="text-red-500 text-xs">(en proceso)</span>
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Estimaciones de impacto basadas en tendencias históricas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico comparativo con Chart.js */}
        <div className="bg-white rounded-lg p-3 md:p-4 border">
          <ComparativeChartJS data={data} />
        </div>

        {/* Estadísticas */}
        <StatsComparison data={data} />
      </div>
    </div>
  )
}

