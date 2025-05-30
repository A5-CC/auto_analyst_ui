"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardHeader } from "@/components/analytics/dashboard-header"
import { ExecutiveFlash } from "@/components/analytics/executive-flash"
import { KPIGrid } from "@/components/analytics/kpi-grid"
import { EconomicOccupancyChart } from "@/components/analytics/economic-occupancy-chart"
import { InsightsSection } from "@/components/analytics/insights-section"
import { FooterActions } from "@/components/analytics/footer-actions"
import { UploadForm } from "@/components/upload-form"
import { ProcessingBanner } from "@/components/processing-banner"
import { HistorySelector } from "@/components/history-selector"
import { dashboardData } from "@/components/analytics/sample-data"
import { DashboardData } from "@/components/analytics/types"
import { AppMode, DocMeta } from "@/lib/api/types"

interface AnalyticsDashboardProps {
  mode: AppMode
  summary: DashboardData | null
  history: DocMeta[]
  currentFileName: string
  error: string | null
  onUpload: (file: File) => Promise<void>
  onHistorySelect: (docId: string) => Promise<void>
  onCancel: () => void
  onReset: () => void
}

export default function AnalyticsDashboard({
  mode,
  summary,
  history,
  currentFileName,
  error,
  onUpload,
  onHistorySelect,
  onCancel,
  onReset
}: AnalyticsDashboardProps) {
  const renderContent = () => {
    switch (mode) {
      case 'idle':
        return (
          <div className="space-y-6">
            <UploadForm
              onUpload={onUpload}
              isUploading={false}
            />
            <HistorySelector
              history={history}
              onSelect={onHistorySelect}
              isLoading={false}
            />
          </div>
        )

      case 'uploading':
      case 'processing':
        return (
          <ProcessingBanner
            fileName={currentFileName}
            onCancel={onCancel}
          />
        )

      case 'done':
        if (!summary) {
          // Fallback to sample data if no summary loaded
          const data = dashboardData
          return (
            <div className="space-y-6">
              <DashboardHeader title={data.document_title} onReset={onReset} />
              <ExecutiveFlash data={data.exec_flash} />
              <KPIGrid kpis={data.kpis} />
              <EconomicOccupancyChart data={data.key_chart} />
              <InsightsSection insights={data.insights} />
              <FooterActions />
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <DashboardHeader title={summary.document_title} onReset={onReset} />
            <ExecutiveFlash data={summary.exec_flash} />
            <KPIGrid kpis={summary.kpis} />
            <EconomicOccupancyChart data={summary.key_chart} />
            <InsightsSection insights={summary.insights} />
            <FooterActions />
          </div>
        )

      case 'error':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                {error || 'An error occurred'}
              </div>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
            <HistorySelector
              history={history}
              onSelect={onHistorySelect}
              isLoading={false}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </TooltipProvider>
  )
}
