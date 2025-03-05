import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { GradientCard } from "./FancyCard"
import { ScrollArea } from "./ui/scroll-area"
import { useRecoilState } from "recoil"
import { dailyatom } from "@/Atoms/Atoms"
import { DATABASE_URL } from '@/config'
import axios from 'axios'

export const TaskList: React.FC = () => {
  const [daily, setdaily] = useRecoilState(dailyatom);
  const statusChange = async (id: any) => {
    await axios.post(`${DATABASE_URL}/api/v2/Daily/update`, {
      id: id,
      completed: true
    })
    setdaily(daily.map((task: any) =>
      task.id === id ? {
        ...task, completions: [...task.completions,
        {
          id: Date.now(), // Generate a unique ID
          completed: true,
          dailyTaskId: task.id,
          date: new Date().toISOString(), // Current date
          todoId: task.id
        }]
      } : task
    ));
    console.log(daily);
  };
  return (
    daily.length != 0 ? <Card className="relative min-h-full max-h-auto border-none overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <GradientCard />
      </div>
      <CardHeader>
        <CardTitle className="text-white relative font-kubo">Daily Tasks</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ScrollArea>
          <ul className="space-y-4">
            {daily.map((task: any) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox onClick={() => statusChange(task.id)} className="bg-white" id={`task-${task.id}`} checked={task.completions.some((data: any) =>
                  new Date(data.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
                )} />
                <label
                  htmlFor={`task-${task.id}`}
                  className={task.completions.some((data:any) => 
                    new Date(data.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
                  ) ? "line-through text-muted-foreground" : "text-white"}
                >
                  {task.title}
                </label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card> : <div></div>
  )
}

