"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { FireData } from "@/types/data-types"

interface ComparativeChartProps {
  data: FireData[]
}

export default function ComparativeChart({ data }: ComparativeChartProps) {
  // Calcular área total por año
  const yearlyData = [1986, 2007, 2017].map((year) => {
    const yearData = data.filter((item) => item.year === year)
    const totalArea = yearData.reduce((sum, item) => sum + item.area, 0)

    return {
      year,
      area: Math.round(totalArea),
    }
  })

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: "Año", position: "insideBottom", offset: -5 }} />
          <YAxis
            label={{ value: "Área Afectada (ha)", angle: -90, position: "insideLeft" }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Bar
            name="Área Afectada (ha)"
            dataKey="area"
            fill="#F9C76C"
            label={{
              position: "top",
              formatter: (value: number) => value.toLocaleString(),
              style: { fontSize: "12px" },
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

