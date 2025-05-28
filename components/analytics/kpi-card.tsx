import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown, Info } from "lucide-react"
import type { KPI } from "./types"

interface KPICardProps {
  kpi: KPI
}

export function KPICard({ kpi }: KPICardProps) {
  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">{kpi.name}</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">{kpi.tooltip.definition}</p>
                <p className="text-xs text-gray-500">{kpi.tooltip.formula}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{kpi.current.value}</span>
            <span className="text-xs text-gray-500 uppercase">{kpi.current.period_label}</span>
          </div>
          <div className="flex items-center gap-1">
            {kpi.delta.direction === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                kpi.delta.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {kpi.delta.value}
            </span>
            <span className="text-xs text-gray-500">{kpi.delta.label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}