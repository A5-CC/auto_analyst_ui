"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  FileText,
  History,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { DashboardData } from "./types"
import { DocMeta } from "@/lib/api/types"
import { AppMode } from "@/lib/api/types"

interface FooterProps {
  dashboardData?: DashboardData | null
  history?: DocMeta[]
  onHistorySelect?: (docId: string) => void
  mode?: AppMode
}

export function Footer({ dashboardData, history = [], onHistorySelect, mode }: FooterProps) {
  const [showHistory, setShowHistory] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const shouldShowHistoryNav = mode !== 'upload' && history.length > 0

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-6 py-6">
        {/* Current Report Info */}
        {dashboardData && (
          <div className="mb-6 space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Current Report Details
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>File:</span>
                <span className="font-medium">{dashboardData.filename}</span>
              </div>
              <div className="flex justify-between">
                <span>Processed:</span>
                <span className="font-medium">{formatDate(dashboardData.processed_at)}</span>
              </div>
              <div className="flex justify-between">
                <span>Job ID:</span>
                <span className="font-mono text-xs">{dashboardData.job_id.substring(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span>Document ID:</span>
                <span className="font-mono text-xs">{dashboardData.doc_id.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation & History - Only show when HistorySelector is not visible */}
        {shouldShowHistoryNav && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <History className="h-4 w-4" />
              Report Navigation
            </h4>

            {history.length > 0 ? (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full justify-between text-xs"
                >
                  <span>Browse {history.length} previous reports</span>
                  {showHistory ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>

                {showHistory && (
                  <div className="max-h-32 overflow-y-auto space-y-1 border rounded-md p-2 bg-gray-50">
                    {history.slice(0, 5).map((doc, index) => (
                      <button
                        key={`${doc.id}-${index}`}
                        onClick={() => {
                          onHistorySelect?.(doc.id)
                          setShowHistory(false)
                        }}
                        className="w-full text-left px-2 py-1 text-xs hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors"
                      >
                        <div className="font-medium truncate">{doc.title}</div>
                        <div className="text-gray-500">{formatDate(doc.created_at)}</div>
                      </button>
                    ))}
                    {history.length > 5 && (
                      <div className="text-center py-1 text-xs text-gray-500">
                        +{history.length - 5} more reports
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No previous reports available</p>
            )}
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Real-time Analytics
            </Badge>
            {dashboardData && (
              <Badge variant="outline" className="text-xs">
                {dashboardData.kpis.length} KPIs analyzed
              </Badge>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}