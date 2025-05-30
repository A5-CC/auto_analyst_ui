export interface KPITooltip {
  definition: string
  formula: string
}

export interface KPIDelta {
  value: string
  direction: "up" | "down"
  label: string
}

export interface KPICurrent {
  value: string
  unit: string
  period_label: string
}

export interface KPI {
  id: string
  name: string
  current: KPICurrent
  delta: KPIDelta
  tooltip: KPITooltip
}

export interface ExecFlash {
  title: string
  summary: string
}

export interface ChartDataPoint {
  facility: string
  occupancy: number
}

export interface KeyChart {
  title: string
  data: ChartDataPoint[]
}

export interface Action {
  text: string
  kpi_ref: string
}

export interface Insights {
  headline: string
  opportunities: string[]
  risks: string[]
  actions: Action[]
}

export interface DashboardData {
  document_title: string
  exec_flash: ExecFlash
  kpis: KPI[]
  key_chart: KeyChart
  insights: Insights
}

export type AppMode = 'idle' | 'uploading' | 'processing' | 'done' | 'error'