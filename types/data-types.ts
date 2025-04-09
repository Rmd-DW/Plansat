export type VegetationType =
  | "Bosque Nativo"
  | "Bosque Mixto"
  | "Matorral"
  | "Matorral Arborescente"
  | "Matorral-Pradera"
  | "Praderas"

export interface FireData {
  id: string
  year: number
  commune: string
  vegetationType: VegetationType
  area: number
  impactLevel: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface YearData {
  year: number
  data: Record<VegetationType, number>
}

