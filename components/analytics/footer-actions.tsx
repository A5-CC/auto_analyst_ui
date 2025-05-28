import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FooterActions() {
  return (
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
  )
}