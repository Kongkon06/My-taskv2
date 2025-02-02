import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"


// Sample data for different task types
const taskTypes = [
  { id: "all", name: "All Tasks" },
  { id: "work", name: "Work Tasks" },
  { id: "personal", name: "Personal Tasks" },
  { id: "study", name: "Study Tasks" },
]

const progressData = {
  all: [70, 45, 80, 60, 90, 30, 50],
  work: [80, 60, 75, 50, 85, 20, 40],
  personal: [50, 30, 70, 40, 60, 80, 55],
  study: [60, 75, 85, 70, 90, 40, 65],
}
type TaskType = keyof typeof progressData; // "all" | "work" | "personal" | "study"

export const WeeklyProgress: React.FC = () => {
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>("all");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Weekly Progress</CardTitle>
        <Select value={selectedTaskType} onValueChange={(value: TaskType) => setSelectedTaskType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select task type" />
          </SelectTrigger>
          <SelectContent>
            {taskTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-center">
            <div className="w-12">{day}</div>
            <Progress value={progressData[selectedTaskType][index]} className="flex-1" />
            <div className="w-12 text-right">{progressData[selectedTaskType][index]}%</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

