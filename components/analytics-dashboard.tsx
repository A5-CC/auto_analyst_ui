"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardHeader } from "@/components/analytics/dashboard-header"
import { ExecutiveFlash } from "@/components/analytics/executive-flash"
import { KPIGrid } from "@/components/analytics/kpi-grid"
import { EconomicOccupancyChart } from "@/components/analytics/economic-occupancy-chart"
import { InsightsSection } from "@/components/analytics/insights-section"
import { FooterActions } from "@/components/analytics/footer-actions"
import { dashboardData } from "@/components/analytics/sample-data"

export default function AnalyticsDashboard() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <DashboardHeader title={dashboardData.document_title} />
          <ExecutiveFlash data={dashboardData.exec_flash} />
          <KPIGrid kpis={dashboardData.kpis} />
          <EconomicOccupancyChart data={dashboardData.key_chart} />
          <InsightsSection insights={dashboardData.insights} />
          <FooterActions />
        </div>
      </div>
    </TooltipProvider>
  )
}
