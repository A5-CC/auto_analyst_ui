import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { KeyChart } from "./types"

interface EconomicOccupancyChartProps {
  data: KeyChart
}

export function EconomicOccupancyChart({ data }: EconomicOccupancyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
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
              data={data.data}
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
                            <span className="font-bold text-foreground">
                              {typeof payload[0]?.value === 'number' ? payload[0].value.toFixed(1) : payload[0]?.value}%
                            </span>
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
                  formatter: (value: number) => `${value.toFixed(1)}%`,
                  fill: "var(--foreground)",
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}