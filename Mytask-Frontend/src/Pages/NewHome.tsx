import { Sidebar } from "@/Components/Sidebar"
import { AppBar } from "@/Components/Appbar" 
import { TaskStats } from "@/Components/TaskStats"
import { WeeklyProgress } from "@/Components/WeeklyProgress"
import { TaskList } from "@/Components/TaskList"
import { Analytics } from "@/Components/Analytics"
import { Button } from "@/Components/ui/button"
import { PlusCircle } from "lucide-react"

export function NewHome() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <AppBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-8 gap-6">
            {/* First row */}
            <div className="col-span-2 space-y-4">
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
              <TaskStats />
            </div>
            <div className="col-span-6">
              <WeeklyProgress />
            </div>

            {/* Second row */}
            <div className="col-span-5">
              <TaskList />
            </div>
            <div className="col-span-3">
              <Analytics />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

