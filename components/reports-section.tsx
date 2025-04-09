"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, FileText, Download } from "lucide-react"
import type { FireData } from "@/types/data-types"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ReportsSectionProps {
  data: FireData[]
}

export default function ReportsSection({ data }: ReportsSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(2017)
  const [selectedCommune, setSelectedCommune] = useState<string>("Todas")

  // Filtrar datos según selecciones
  const filteredData = data.filter((item) => {
    if (selectedYear !== 0 && item.year !== selectedYear) return false
    if (selectedCommune !== "Todas" && item.commune !== selectedCommune) return false
    return true
  })

  // Calcular estadísticas para el reporte
  const calculateStats = () => {
    const yearData = data.filter((item) => item.year === selectedYear)

    // Área total
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

    // Calcular áreas por tipo de vegetación
    const vegetationAreas: Record<string, number> = {}
    yearData.forEach((item) => {
      if (!vegetationAreas[item.vegetationType]) {
        vegetationAreas[item.vegetationType] = 0
      }
      vegetationAreas[item.vegetationType] += item.area
    })

    return {
      year: selectedYear,
      totalArea,
      fireCount,
      averageArea,
      maxArea,
      mostAffectedCommune,
      vegetationAreas,
    }
  }

  // Generar y descargar el PDF
  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const stats = calculateStats()

      // Crear un elemento temporal para renderizar el contenido del PDF
      const reportElement = document.createElement("div")
      reportElement.style.padding = "20px"
      reportElement.style.width = "800px"
      reportElement.style.backgroundColor = "white"
      reportElement.style.fontFamily = "Arial, sans-serif"

      // Contenido del reporte
      reportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #5900ff; margin-bottom: 5px;">PLANSAT - Reporte de Incendios</h1>
          <p style="color: #666;">Generado el ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Información General</h2>
          <p><strong>Año:</strong> ${stats.year}</p>
          <p><strong>Comuna:</strong> ${selectedCommune}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Estadísticas de Incendios</h2>
          <p><strong>Área total afectada:</strong> ${stats.totalArea.toFixed(1)} hectáreas</p>
          <p><strong>Número de incendios:</strong> ${stats.fireCount}</p>
          <p><strong>Área promedio por incendio:</strong> ${stats.averageArea.toFixed(1)} hectáreas</p>
          <p><strong>Incendio de mayor extensión:</strong> ${stats.maxArea.toFixed(1)} hectáreas</p>
          <p><strong>Comuna más afectada:</strong> ${stats.mostAffectedCommune}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Distribución por Tipo de Vegetación</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Tipo de Vegetación</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Área Afectada (ha)</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(stats.vegetationAreas)
                .map(
                  ([type, area]) => `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${type}</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">${area.toFixed(1)}</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">${((area / stats.totalArea) * 100).toFixed(1)}%</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          <p>Este reporte fue generado automáticamente por el sistema PLANSAT.</p>
        </div>
      `

      // Añadir el elemento al DOM temporalmente
      document.body.appendChild(reportElement)

      // Convertir el elemento a canvas
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      // Eliminar el elemento temporal
      document.body.removeChild(reportElement)

      // Crear el PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Añadir la imagen del canvas al PDF
      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Descargar el PDF
      pdf.save(`PLANSAT_Reporte_Incendios_${stats.year}_${selectedCommune}.pdf`)
    } catch (error) {
      console.error("Error al generar el PDF:", error)
      alert("Ocurrió un error al generar el reporte. Por favor, inténtelo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Generación de Reportes</h2>
        <p className="text-center text-muted-foreground mb-6">
          Genere reportes personalizados en formato PDF con los datos de análisis de incendios.
        </p>

        {/* Filtros para el reporte */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-4">Configuración del Reporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Año</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <option value={2017}>2017</option>
                <option value={2007}>2007</option>
                <option value={1986}>1986</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comuna</label>
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

        {/* Tipos de reportes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-2 text-primary">Reporte Completo</h3>
                  <p className="text-sm text-muted-foreground">
                    Informe detallado con estadísticas, gráficos y análisis de impacto.
                  </p>
                </div>
                <FileText className="text-primary h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card className="opacity-60 cursor-not-allowed">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-2">
                    Reporte Ejecutivo <span className="text-red-500 text-xs">(próximamente)</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">Resumen ejecutivo con los datos más relevantes.</p>
                </div>
                <FileText className="text-muted-foreground h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón para generar el reporte */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Generando reporte...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Generar Reporte PDF</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

