import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", tasks: 3 },
  { name: "Tue", tasks: 5 },
  { name: "Wed", tasks: 7 },
  { name: "Thu", tasks: 4 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 2 },
  { name: "Sun", tasks: 1 },
]

export const Analytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

