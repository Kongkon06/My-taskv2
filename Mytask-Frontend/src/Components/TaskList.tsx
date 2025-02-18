import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { GradientCard } from "./FancyCard"

const tasks = [
  { id: 1, title: "Complete project proposal", completed: false },
  { id: 2, title: "Review team performance", completed: true },
  { id: 3, title: "Prepare presentation slides", completed: false },
  { id: 4, title: "Schedule client meeting", completed: false },
  { id: 5, title: "Update website content", completed: true },
]

export const TaskList: React.FC = () => {
  return (
    <Card className="relative border-none overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <GradientCard/>
      </div>
      <CardHeader>
        <CardTitle className="text-white relative font-kubo">Daily Tasks</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox className="bg-white" id={`task-${task.id}`} checked={task.completed} />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : "text-white"}`}
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

