"use client"

import type { FireData, VegetationType, YearData } from "@/types/data-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts"

interface ChartSectionProps {
  filteredData: FireData[]
  yearData: YearData[]
}

export default function ChartSection({ filteredData, yearData }: ChartSectionProps) {
  // Prepare data for line chart
  const lineChartData = yearData.map((yearItem) => {
    const totalByType = {
      year: yearItem.year,
      "Bosque Nativo": yearItem.data["Bosque Nativo"],
      "Bosque Mixto": yearItem.data["Bosque Mixto"],
      Matorral: yearItem.data["Matorral"],
      "Matorral Arborescente": yearItem.data["Matorral Arborescente"],
      "Matorral-Pradera": yearItem.data["Matorral-Pradera"],
      Praderas: yearItem.data["Praderas"],
    }
    return totalByType
  })

  // Prepare data for pie chart
  const pieChartData = Object.entries(
    filteredData.reduce(
      (acc, item) => {
        if (!acc[item.vegetationType]) {
          acc[item.vegetationType] = 0
        }
        acc[item.vegetationType] += item.area
        return acc
      },
      {} as Record<VegetationType, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  // Actualizar los colores en el componente ChartSection
  // Colors for vegetation types
  const COLORS = {
    "Bosque Nativo": "#2D7A41",
    "Bosque Mixto": "#4E9A65",
    Matorral: "#6FB587",
    "Matorral Arborescente": "#90CCA6",
    "Matorral-Pradera": "#B5DFCA",
    Praderas: "#D8F0E3",
    "Área Afectada": "#F9C76C",
  }

  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="mb-4 bg-primary/10 w-full">
        <TabsTrigger
          value="timeline"
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Línea Temporal
        </TabsTrigger>
        <TabsTrigger
          value="pie"
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Distribución
        </TabsTrigger>
      </TabsList>
      <TabsContent value="timeline">
        <Card>
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="text-base md:text-lg">Evolución de Áreas Afectadas por Tipo de Vegetación</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    label={{
                      value: "Hectáreas",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                      offset: -5,
                    }}
                  />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                  {Object.entries(COLORS).map(([type, color]) => (
                    <Line
                      key={type}
                      type="monotone"
                      dataKey={type}
                      stroke={color}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pie">
        <Card>
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="text-base md:text-lg">Proporción de Tipos de Vegetación Afectada</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="h-[300px] md:h-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as VegetationType] || "#CCCCCC"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} hectáreas`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

