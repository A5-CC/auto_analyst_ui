"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown, Info, AlertTriangle, Target, CheckCircle2, ArrowRight } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data based on the schema
const dashboardData = {
  document_title: "Management Summary: Portal Asset Management LLC - April 2024",

  exec_flash: {
    title: "Executive Snapshot",
    summary:
      "Strong unit occupancy at 80% masks significant revenue underperformance due to aggressive discounting. While net rentals show positive momentum, economic occupancy gaps reveal $300K monthly revenue leak across facilities requiring immediate pricing strategy intervention.",
  },

  kpis: [
    {
      id: "total_revenue",
      name: "Total Revenue",
      current: { value: "$594.2K", unit: "USD", period_label: "MTD" },
      delta: { value: "-34%", direction: "down", label: "vs last month" },
      tooltip: {
        definition:
          "Total revenue measures the combined income from all facilities including rent, fees, merchandise, services, and insurance.",
        formula:
          "Sum of rent revenue plus fees plus merchandise plus services plus insurance plus miscellaneous revenue across all facilities",
      },
    },
    {
      id: "occupancy_rate",
      name: "Average Unit Occupancy",
      current: { value: "80.1%", unit: "%", period_label: "Snapshot" },
      delta: { value: "+2.3%", direction: "up", label: "vs target" },
      tooltip: {
        definition:
          "Average unit occupancy measures the percentage of storage units that are currently rented across all facilities.",
        formula: "Total occupied units divided by total available units multiplied by 100",
      },
    },
    {
      id: "economic_occupancy",
      name: "Economic Occupancy",
      current: { value: "68.4%", unit: "%", period_label: "Snapshot" },
      delta: { value: "-5.2%", direction: "down", label: "vs full-rent potential" },
      tooltip: {
        definition:
          "Economic occupancy measures the actual rental income as a percentage of potential rental income if all units were occupied at full rates.",
        formula: "Actual rent collected divided by potential rent at full occupancy multiplied by 100",
      },
    },
    {
      id: "net_rentals",
      name: "Net Rentals",
      current: { value: "+16", unit: "units", period_label: "MTD" },
      delta: { value: "+37", direction: "up", label: "vs YTD trend" },
      tooltip: {
        definition:
          "Net rentals measures the net change in occupied units by subtracting move-outs from move-ins during the period.",
        formula: "Total move-ins minus total move-outs plus transfers across all facilities",
      },
    },
  ],

  key_chart: {
    title: "Economic Occupancy Rate by Facility",
    data: [
      { facility: "21st Century - Pennsauken", occupancy: 75.79 },
      { facility: "modSTORAGE - Airport Way", occupancy: 73.52 },
      { facility: "modSTORAGE - Laramie", occupancy: 63.62 },
      { facility: "modSTORAGE - Long Island City", occupancy: 80.78 },
      { facility: "modSTORAGE - Ocean Township", occupancy: 53.77 },
      { facility: "modSTORAGE - Philadelphia", occupancy: 60.31 },
      { facility: "modSTORAGE - Rifle", occupancy: 69.7 },
      { facility: "modSTORAGE - Sky Park", occupancy: 55.44 },
    ],
  },

  insights: {
    headline:
      "Strong 80% unit occupancy masks $300K monthly revenue leak from aggressive discounting and underperforming rates.",
    opportunities: [
      "Long Island City achieves 81% economic occupancy while others lag at 54-69%; replicating their pricing strategy could unlock $35K+ monthly.",
      "Rifle shows stellar 88% unit occupancy with healthy net rentals (+31 YTD); expand marketing investment there for outsized returns.",
      "Insurance penetration varies wildly (38-76%); standardizing enrollment scripts from top performers could add $8K monthly revenue.",
    ],
    risks: [
      "Philadelphia drowning in $106K aged receivables with 180 delinquent tenants—immediate collection action needed to prevent write-offs.",
      "Ocean Township hemorrhaging potential: 78% units occupied but only 54% economic occupancy indicates severe rate management failure.",
      "Fernley facility completely dormant with zero activity—carrying costs without any revenue generation.",
    ],
    actions: [
      {
        text: "Implement immediate discount freeze at Ocean Township and Sky Park until economic occupancy exceeds 65% (target: +$15K monthly).",
        kpi_ref: "economic_occupancy",
      },
      {
        text: "Redirect Fernley's allocated resources to Rifle facility where 69% lead conversion proves market demand exists.",
        kpi_ref: "total_revenue",
      },
      {
        text: "Launch aggressive collections campaign in Philadelphia targeting 61-120 day buckets; aim for 30% recovery rate within 60 days.",
        kpi_ref: "net_rentals",
      },
    ],
  },
}

export default function AnalyticsDashboard() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg border p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{dashboardData.document_title}</h1>
            <p className="text-sm text-gray-500">
              Generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Executive Flash */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                {dashboardData.exec_flash.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{dashboardData.exec_flash.summary}</p>
            </CardContent>
          </Card>

          {/* KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData.kpis.map((kpi) => (
              <Card key={kpi.id} className="relative">
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
            ))}
          </div>

          {/* Key Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{dashboardData.key_chart.title}</CardTitle>
              <CardDescription>Performance comparison across all facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  occupancy: {
                    label: "Economic Occupancy %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.key_chart.data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="facility" width={110} tick={{ fontSize: 12 }} tickLine={false} />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Facility</span>
                                  <span className="font-bold text-foreground">{payload[0].payload.facility}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Economic Occupancy
                                  </span>
                                  <span className="font-bold text-foreground">{payload[0].value.toFixed(1)}%</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar
                      dataKey="occupancy"
                      fill="var(--color-occupancy)"
                      radius={[0, 4, 4, 0]}
                      barSize={24}
                      label={{
                        position: "right",
                        formatter: (value) => `${value.toFixed(1)}%`,
                        fill: "var(--foreground)",
                        fontSize: 12,
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Insights Section */}
          <div className="space-y-6">
            {/* Headline Insight */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg">Key Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 font-medium leading-relaxed">{dashboardData.insights.headline}</p>
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
                    {dashboardData.insights.opportunities.map((opportunity, index) => (
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
                    {dashboardData.insights.risks.map((risk, index) => (
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
                    {dashboardData.insights.actions.map((action, index) => (
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

          {/* Footer Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Ready to take action?</h3>
                  <p className="text-sm text-gray-600">
                    Download detailed reports or schedule a strategy session to implement these insights.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Download Report</Button>
                  <Button>Schedule Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
