"use client"

import type { FireData } from "@/types/data-types"

interface StatsComparisonProps {
  data: FireData[]
}

interface YearStats {
  year: number
  totalArea: number
  fireCount: number
  averageArea: number
  maxArea: number
  mostAffectedCommune: string
}

export default function StatsComparison({ data }: StatsComparisonProps) {
  // Años a comparar
  const yearsToCompare = [1986, 2007, 2017]

  // Calcular estadísticas para cada año
  const yearStats: YearStats[] = yearsToCompare.map((year) => {
    const yearData = data.filter((item) => item.year === year)

    // Calcular área total
    const totalArea = yearData.reduce((sum, item) => sum + item.area, 0)

    // Contar incendios
    const fireCount = yearData.length

    // Calcular promedio
    const averageArea = fireCount > 0 ? totalArea / fireCount : 0

    // Encontrar el máximo
    const maxArea = yearData.reduce((max, item) => Math.max(max, item.area), 0)

    // Encontrar la comuna más afectada
    const communeAreas: Record<string, number> = {}
    yearData.forEach((item) => {
      if (!communeAreas[item.commune]) {
        communeAreas[item.commune] = 0
      }
      communeAreas[item.commune] += item.area
    })

    let mostAffectedCommune = ""
    let maxCommuneArea = 0

    Object.entries(communeAreas).forEach(([commune, area]) => {
      if (area > maxCommuneArea) {
        maxCommuneArea = area
        mostAffectedCommune = commune
      }
    })

    return {
      year,
      totalArea,
      fireCount,
      averageArea,
      maxArea,
      mostAffectedCommune,
    }
  })

  return (
    <div className="mt-4 md:mt-8 border-t pt-4 md:pt-6">
      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Estadísticas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {yearStats.map((stats) => (
          <div
            key={stats.year}
            className="bg-white p-3 md:p-4 rounded-md shadow-sm border border-gray-200 hover:border-primary/30 transition-colors"
          >
            <div className="text-sm text-gray-600 mb-1 pb-2 border-b border-gray-100">Año: {stats.year}</div>
            <div className="text-xs md:text-sm mb-1">
              <span className="font-medium">Área total:</span> {stats.totalArea.toFixed(1)} ha
            </div>
            <div className="text-xs md:text-sm mb-1">
              <span className="font-medium">Nº incendios:</span> {stats.fireCount}
            </div>
            <div className="text-xs md:text-sm mb-1">
              <span className="font-medium">Promedio:</span> {stats.averageArea.toFixed(1)} ha
            </div>
            <div className="text-xs md:text-sm mb-1">
              <span className="font-medium">Máximo:</span> {stats.maxArea.toFixed(1)} ha
            </div>
            <div className="text-xs md:text-sm">
              <span className="font-medium">Comuna más afectada:</span> {stats.mostAffectedCommune}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

