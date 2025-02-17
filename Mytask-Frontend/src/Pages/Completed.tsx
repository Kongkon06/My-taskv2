import { Sidebar } from "../Components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Award, Calendar, CheckCircle } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import GitHubContributions from "@/Components/GitContri";
import WeeklyProgress from "@/Components/WeeklyProgress";

const TaskCompletionRate: React.FC = () => {
  const totalTasks = 100
  const completedTasks = 75

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Overall Task Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          {completedTasks}/{totalTasks}
        </div>
        <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {((completedTasks / totalTasks) * 100).toFixed(1)}% of all tasks completed
        </p>
      </CardContent>
    </Card>
  )
}

const TaskStreak: React.FC = () => {
  const currentStreak = 7
  const longestStreak = 14

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Task Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <div className="text-3xl font-bold">{currentStreak}</div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </div>
          <div>
            <div className="text-3xl font-bold">{longestStreak}</div>
            <p className="text-sm text-muted-foreground">Longest Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const MonthlyProgress: React.FC = () => {
  const completedThisMonth = 87
  const totalThisMonth = 120

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Monthly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          {completedThisMonth}/{totalThisMonth}
        </div>
        <Progress value={(completedThisMonth / totalThisMonth) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {((completedThisMonth / totalThisMonth) * 100).toFixed(1)}% of monthly tasks completed
        </p>
      </CardContent>
    </Card>
  )
}

export function Completed(){
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1 text-white">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-kubo mb-6">Task Report & Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TaskCompletionRate />
            <TaskStreak />
            <MonthlyProgress />
            <GitHubContributions />
            <div className="col-span-2"><WeeklyProgress /></div>
          </div>
        </main>
      </div>
    </div>
  )
}

