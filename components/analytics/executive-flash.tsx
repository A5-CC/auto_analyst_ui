import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import type { ExecFlash } from "./types"

interface ExecutiveFlashProps {
  data: ExecFlash
}

export function ExecutiveFlash({ data }: ExecutiveFlashProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </CardContent>
    </Card>
  )
}