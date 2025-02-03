import type React from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const GitHubContributions: React.FC = () => {
  // Helper to generate sample data for current month
  const generateMonthData = () => {
    const data = []
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const daysInMonth = lastDay.getDate()

    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(firstDay)
      date.setDate(date.getDate() + i)
      data.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        day: date.getDate(),
      })
    }
    return data
  }

  const contributions = generateMonthData()

  // Get contribution level (0-4) based on count
  const getContributionLevel = (count: number) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 8) return 3
    return 4
  }

  // Get color based on contribution level
  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-primary/10"
      case 1:
        return "bg-primary/30"
      case 2:
        return "bg-primary/50"
      case 3:
        return "bg-primary/70"
      case 4:
        return "bg-primary"
      default:
        return "bg-primary/10"
    }
  }

  // Calculate total contributions
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)
  const activeCount = contributions.filter((day) => day.count > 0).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {totalContributions} contributions in {activeCount} active days
        </p>

        <div>
          <div className="grid grid-cols-7 gap-[3px]">
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs text-muted-foreground h-4 text-center mb-1">
                {day}
              </div>
            ))}

            {/* Empty cells for proper calendar alignment */}
            {Array(new Date(contributions[0].date).getDay())
              .fill(null)
              .map((_, i) => (
                <div key={`empty-${i}`} className="w-[10px] h-[10px]" />
              ))}

            {/* Contribution cells */}
            {contributions.map((day) => {
              const level = getContributionLevel(day.count)
              return (
                <TooltipProvider key={day.date}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`w-[10px] h-[10px] rounded-sm ${getColor(level)} 
                          hover:ring-1 hover:ring-primary/50 transition-all cursor-pointer`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {day.count} contributions on {day.weekday}, {day.date}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>

          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground justify-center">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-[10px] h-[10px] rounded-sm ${getColor(level)}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GitHubContributions

