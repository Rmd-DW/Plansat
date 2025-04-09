"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
import type { FireData } from "@/types/data-types"
import { useMobile } from "@/hooks/use-mobile"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

interface ComparativeChartProps {
  data: FireData[]
}

export default function ComparativeChartJS({ data }: ComparativeChartProps) {
  const isMobile = useMobile()

  // Calcular área total por año
  const yearlyData = [1986, 2007, 2017].map((year) => {
    const yearData = data.filter((item) => item.year === year)
    const totalArea = yearData.reduce((sum, item) => sum + item.area, 0)

    return {
      year,
      area: Math.round(totalArea),
    }
  })

  // Configuración del gráfico
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !isMobile,
          text: "Área Afectada (ha)",
          font: {
            weight: "bold",
            size: isMobile ? 10 : 12,
          },
        },
        ticks: {
          callback: (value) => value.toLocaleString(),
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        title: {
          display: !isMobile,
          text: "Año",
          font: {
            weight: "bold",
            size: isMobile ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "Comparación de Áreas Afectadas por Incendios",
        font: {
          size: isMobile ? 14 : 16,
          weight: "bold",
        },
        padding: {
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString() + " ha"
            }
            return label
          },
        },
        titleFont: {
          size: isMobile ? 10 : 12,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
      },
      // Configuración del plugin datalabels
      datalabels: {
        color: "#333",
        anchor: "end",
        align: "top",
        offset: 0,
        formatter: (value: number) =>
          isMobile ? (value > 10000 ? `${Math.round(value / 1000)}k` : value.toLocaleString()) : value.toLocaleString(),
        font: {
          weight: "bold",
          size: isMobile ? 9 : 12,
        },
        padding: {
          top: 5,
        },
        display: !isMobile || window.innerWidth > 400,
      },
    },
  }

  // Datos para el gráfico
  const chartData: ChartData<"bar"> = {
    labels: yearlyData.map((d) => d.year.toString()),
    datasets: [
      {
        label: "Área Afectada (ha)",
        data: yearlyData.map((d) => d.area),
        backgroundColor: "#F9C76C",
        borderColor: "#E6B55F",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="w-full h-[250px] md:h-[400px] mt-3 md:mt-6">
      <Bar options={options} data={chartData} />
    </div>
  )
}

