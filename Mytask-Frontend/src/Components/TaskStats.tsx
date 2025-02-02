import { Card,CardContent,CardHeader, CardTitle } from "./ui/card"

export const TaskStats = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Today's Tasks Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">5/8</div>
        <p className="text-xs text-muted-foreground">62.5% completed</p>
      </CardContent>
    </Card>
  )
}

