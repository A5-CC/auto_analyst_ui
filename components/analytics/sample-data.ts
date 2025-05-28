import type { DashboardData } from "./types"

export const dashboardData: DashboardData = {
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