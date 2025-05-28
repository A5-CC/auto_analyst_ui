import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react"
import type { Insights } from "./types"

interface InsightsSectionProps {
  insights: Insights
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Headline Insight */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-lg">Key Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 font-medium leading-relaxed">{insights.headline}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Opportunities */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="h-5 w-5" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.opportunities.map((opportunity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-green-700">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{opportunity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risks */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.risks.map((risk, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                    <AlertTriangle className="h-3 w-3 text-red-700" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{risk}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <CheckCircle2 className="h-5 w-5" />
              Immediate Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.actions.map((action, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <ArrowRight className="h-3 w-3 text-blue-700" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{action.text}</p>
                  </div>
                  <div className="ml-9">
                    <Badge variant="outline" className="text-xs">
                      Impacts: {action.kpi_ref.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}