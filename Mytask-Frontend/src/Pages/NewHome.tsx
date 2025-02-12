import { Sidebar } from "@/Components/Sidebar"
import { AppBar } from "@/Components/Appbar" 
import GitHubContributions from '@/Components/GitContri';
import { TaskList } from "@/Components/TaskList"
import { Analytics } from "@/Components/Analytics"
import { Button } from "@/Components/ui/button"
import { PlusCircle } from "lucide-react"
import TaskProgressCircle from "@/Components/TaskCircle"
import Goals from "@/Components/Goals";

export function NewHome() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <AppBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-8 gap-6">
            {/* First row */}
            <div className="col-span-2 space-y-4 h-64">
              <Button className="w-full h-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
            <div className="col-span-4">
              <GitHubContributions />
            </div>
            <div className="col-span-2 flex justify-center items-center">
            <TaskProgressCircle progress={62.5} total={8} completed={5} />
            </div>
            {/* Second row */}
            <div className="col-span-2">
              <TaskList />
            </div>
            <div className="col-span-3 h-64">
              <Goals />
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

