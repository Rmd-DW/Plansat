import type { FireData } from "@/types/data-types"

// Generate random coordinates around Valparaíso, Chile
const generateRandomCoordinates = (baseLat: number, baseLng: number, range: number) => {
  return {
    lat: baseLat + (Math.random() - 0.5) * range,
    lng: baseLng + (Math.random() - 0.5) * range,
  }
}

// Base coordinates for communes in Ñuble region
const communeCoordinates = {
  Chillán: { lat: -36.6063, lng: -72.1034 },
  "Chillán Viejo": { lat: -36.6372, lng: -72.1383 },
  Bulnes: { lat: -36.7421, lng: -72.2984 },
  Coelemu: { lat: -36.4863, lng: -72.7042 },
  Coihueco: { lat: -36.6278, lng: -71.8307 },
  "El Carmen": { lat: -36.8994, lng: -72.0311 },
  Ninhue: { lat: -36.4019, lng: -72.3981 },
  Ñiquén: { lat: -36.2917, lng: -71.9019 },
  Pemuco: { lat: -36.9767, lng: -72.1017 },
  Pinto: { lat: -36.7003, lng: -71.8931 },
  Portezuelo: { lat: -36.5294, lng: -72.4333 },
  Quillón: { lat: -36.7381, lng: -72.4692 },
  Quirihue: { lat: -36.2828, lng: -72.5414 },
  Ránquil: { lat: -36.6519, lng: -72.5539 },
  "San Carlos": { lat: -36.4244, lng: -71.9581 },
  "San Fabián": { lat: -36.5539, lng: -71.5508 },
  "San Ignacio": { lat: -36.8092, lng: -72.0317 },
  "San Nicolás": { lat: -36.4992, lng: -72.2139 },
  Treguaco: { lat: -36.4333, lng: -72.6667 },
  Yungay: { lat: -37.1211, lng: -72.0156 },
}

// Generate mock data
export const mockData: FireData[] = []

// Helper to generate random data
const vegetationTypes = [
  "Bosque Nativo",
  "Bosque Mixto",
  "Matorral",
  "Matorral Arborescente",
  "Matorral-Pradera",
  "Praderas",
]
const impactLevels = ["Alto", "Medio", "Bajo"]

// Datos específicos para cada año según las estadísticas proporcionadas
const yearSpecificData = {
  1986: {
    totalArea: 3615.5,
    fireCount: 141,
    maxArea: 967.9,
    mostAffectedCommune: "San Nicolás",
  },
  2007: {
    totalArea: 32662.9,
    fireCount: 89,
    maxArea: 5890.0,
    mostAffectedCommune: "Coelemu",
  },
  2017: {
    totalArea: 124266.0, // Actualizado según la referencia
    fireCount: 141,
    maxArea: 15000.0, // Valor estimado para un incendio grande
    mostAffectedCommune: "San Nicolás",
  },
}

// Generate data for each year
const years = [1986, 2007, 2017]

let id = 1
years.forEach((year) => {
  const yearData = yearSpecificData[year as keyof typeof yearSpecificData]
  const { fireCount, totalArea, maxArea, mostAffectedCommune } = yearData

  // Asegurar que la comuna más afectada tenga el incendio más grande
  mockData.push({
    id: `fire-${id++}`,
    year,
    commune: mostAffectedCommune,
    vegetationType: vegetationTypes[Math.floor(Math.random() * vegetationTypes.length)] as any,
    area: maxArea,
    impactLevel: "Alto",
    coordinates: generateRandomCoordinates(
      communeCoordinates[mostAffectedCommune as keyof typeof communeCoordinates].lat,
      communeCoordinates[mostAffectedCommune as keyof typeof communeCoordinates].lng,
      0.05,
    ),
  })

  // Distribuir el resto del área entre los demás incendios
  const remainingArea = totalArea - maxArea
  const remainingCount = fireCount - 1
  const avgArea = remainingArea / remainingCount

  for (let i = 0; i < remainingCount; i++) {
    const commune = Object.keys(communeCoordinates)[Math.floor(Math.random() * Object.keys(communeCoordinates).length)]
    const vegetationType = vegetationTypes[Math.floor(Math.random() * vegetationTypes.length)] as any
    const impactLevel = impactLevels[Math.floor(Math.random() * impactLevels.length)]

    // Área con variación aleatoria alrededor del promedio
    const areaVariation = avgArea * (0.5 + Math.random())

    mockData.push({
      id: `fire-${id++}`,
      year,
      commune,
      vegetationType,
      area: areaVariation,
      impactLevel,
      coordinates: generateRandomCoordinates(
        communeCoordinates[commune as keyof typeof communeCoordinates].lat,
        communeCoordinates[commune as keyof typeof communeCoordinates].lng,
        0.1,
      ),
    })
  }
})

