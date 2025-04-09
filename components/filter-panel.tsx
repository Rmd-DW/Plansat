"use client"

import type { VegetationType } from "@/types/data-types"
import { Check, ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface FilterPanelProps {
  selectedYear: number
  setSelectedYear: (year: number) => void
  selectedCommune: string
  setSelectedCommune: (commune: string) => void
  selectedVegetationTypes: VegetationType[]
  setSelectedVegetationTypes: (types: VegetationType[]) => void
  selectedImpactLevel: string
  setSelectedImpactLevel: (level: string) => void
  isMobile?: boolean
}

export default function FilterPanel({
  selectedYear,
  setSelectedYear,
  selectedCommune,
  setSelectedCommune,
  selectedVegetationTypes,
  setSelectedVegetationTypes,
  selectedImpactLevel,
  setSelectedImpactLevel,
  isMobile = false,
}: FilterPanelProps) {
  const [yearOpen, setYearOpen] = useState(false)
  const [communeOpen, setCommuneOpen] = useState(false)
  const [impactOpen, setImpactOpen] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(!isMobile)

  const years = [
    { value: 1986, label: "1986" },
    { value: 2007, label: "2007" },
    { value: 2017, label: "2017" },
  ]

  const communes = [
    { value: "Todas", label: "Todas las comunas" },
    { value: "Chillán", label: "Chillán" },
    { value: "Chillán Viejo", label: "Chillán Viejo" },
    { value: "Bulnes", label: "Bulnes" },
    { value: "Coelemu", label: "Coelemu" },
    { value: "Coihueco", label: "Coihueco" },
    { value: "El Carmen", label: "El Carmen" },
    { value: "Ninhue", label: "Ninhue" },
    { value: "Ñiquén", label: "Ñiquén" },
    { value: "Pemuco", label: "Pemuco" },
    { value: "Pinto", label: "Pinto" },
    { value: "Portezuelo", label: "Portezuelo" },
    { value: "Quillón", label: "Quillón" },
    { value: "Quirihue", label: "Quirihue" },
    { value: "Ránquil", label: "Ránquil" },
    { value: "San Carlos", label: "San Carlos" },
    { value: "San Fabián", label: "San Fabián" },
    { value: "San Ignacio", label: "San Ignacio" },
    { value: "San Nicolás", label: "San Nicolás" },
    { value: "Treguaco", label: "Treguaco" },
    { value: "Yungay", label: "Yungay" },
  ]

  const impactLevels = [
    { value: "Todos", label: "Todos los niveles" },
    { value: "Alto", label: "Alto" },
    { value: "Medio", label: "Medio" },
    { value: "Bajo", label: "Bajo" },
  ]

  const vegetationTypes: { value: VegetationType; label: string; color: string }[] = [
    { value: "Bosque Nativo", label: "Bosque Nativo", color: "#2D7A41" },
    { value: "Bosque Mixto", label: "Bosque Mixto", color: "#4E9A65" },
    { value: "Matorral", label: "Matorral", color: "#6FB587" },
    { value: "Matorral Arborescente", label: "Matorral Arborescente", color: "#90CCA6" },
    { value: "Matorral-Pradera", label: "Matorral-Pradera", color: "#B5DFCA" },
    { value: "Praderas", label: "Praderas", color: "#D8F0E3" },
  ]

  const handleVegetationTypeChange = (type: VegetationType) => {
    if (selectedVegetationTypes.includes(type)) {
      setSelectedVegetationTypes(selectedVegetationTypes.filter((t) => t !== type))
    } else {
      setSelectedVegetationTypes([...selectedVegetationTypes, type])
    }
  }

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded)
  }

  return (
    <div className="relative bg-card rounded-lg border">
      {/* Pestaña para plegar/desplegar */}
      <div
        className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-card border border-t-0 rounded-b-lg px-4 py-1 cursor-pointer flex items-center gap-1 shadow-sm hover:bg-muted transition-colors"
        onClick={togglePanel}
      >
        <span className="text-xs font-medium">Filtros</span>
        {isPanelExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>

      {/* Contenido del panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isPanelExpanded ? "max-h-[500px] opacity-100 p-3 md:p-4" : "max-h-0 opacity-0 p-0",
        )}
      >
        <h2 className="font-medium mb-2">Filtros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Year Filter */}
          <div>
            <Label className="mb-1 block">Año</Label>
            <Popover open={yearOpen} onOpenChange={setYearOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={yearOpen} className="w-full justify-between">
                  {selectedYear ? selectedYear : "Seleccionar año"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar año..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {years.map((year) => (
                        <CommandItem
                          key={year.value}
                          value={year.label}
                          onSelect={() => {
                            setSelectedYear(year.value)
                            setYearOpen(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", selectedYear === year.value ? "opacity-100" : "opacity-0")}
                          />
                          {year.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Commune Filter */}
          <div>
            <Label className="mb-1 block">Comuna</Label>
            <Popover open={communeOpen} onOpenChange={setCommuneOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={communeOpen}
                  className="w-full justify-between"
                >
                  {selectedCommune || "Seleccionar comuna"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar comuna..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {communes.map((commune) => (
                        <CommandItem
                          key={commune.value}
                          value={commune.label}
                          onSelect={() => {
                            setSelectedCommune(commune.value)
                            setCommuneOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCommune === commune.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {commune.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Impact Level Filter */}
          <div>
            <Label className="mb-1 block">Nivel de Impacto</Label>
            <Popover open={impactOpen} onOpenChange={setImpactOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={impactOpen} className="w-full justify-between">
                  {selectedImpactLevel || "Seleccionar nivel"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar nivel..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {impactLevels.map((level) => (
                        <CommandItem
                          key={level.value}
                          value={level.label}
                          onSelect={() => {
                            setSelectedImpactLevel(level.value)
                            setImpactOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedImpactLevel === level.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {level.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Vegetation Type Filter */}
          <div>
            <Label className="mb-1 block">Tipo de Vegetación</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded-md">
              {vegetationTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`veg-${type.value}`}
                    checked={selectedVegetationTypes.includes(type.value)}
                    onCheckedChange={() => handleVegetationTypeChange(type.value)}
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                    <Label htmlFor={`veg-${type.value}`} className="text-sm cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

