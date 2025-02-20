import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { GradientCard } from "./FancyCard"
import { useEffect } from "react"
import axios from "axios"
import { DATABASE_URL } from "@/config"
import { ScrollArea } from "./ui/scroll-area"
import { useRecoilState } from "recoil"
import { dailyatom } from "@/Atoms/Atoms"


export const TaskList: React.FC = () => {
  const [daily, setdaily] = useRecoilState(dailyatom);
  useEffect(()=>{
   async function fetchData(){
    const res = await axios.post(`${DATABASE_URL}/api/v2/Daily`,{
        userId:11
    })
    setdaily(res.data);
   }
   fetchData();
  },[])
  return (
    <Card className="relative min-h-full max-h-auto border-none overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <GradientCard/>
      </div>
      <CardHeader>
        <CardTitle className="text-white relative font-kubo">Daily Tasks</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ScrollArea>
        <ul className="space-y-4">
          {daily.map((task:any) => (
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
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

