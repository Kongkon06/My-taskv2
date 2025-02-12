import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"

const tasks = [
  { id: 1, title: "Complete project proposal", completed: false },
  { id: 2, title: "Review team performance", completed: true },
  { id: 3, title: "Prepare presentation slides", completed: false },
  { id: 4, title: "Schedule client meeting", completed: false },
  { id: 5, title: "Update website content", completed: true },
]

export const TaskList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox id={`task-${task.id}`} checked={task.completed} />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {task.title}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

