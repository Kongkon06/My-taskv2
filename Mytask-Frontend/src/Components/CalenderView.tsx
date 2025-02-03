import type React from "react"
import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import {format} from "date-fns/format"
import {parse} from "date-fns/parse"
import {startOfWeek} from "date-fns/startOfWeek"
import {getDay} from "date-fns/getDay"
import {enUS} from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

// Setup localizer for react-big-calendar
const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Sample task data (replace this with your actual data source)
const tasks = [
  {
    id: 1,
    title: "Complete project proposal",
    start: new Date(2023, 5, 1),
    end: new Date(2023, 5, 1),
    completed: false,
  },
  {
    id: 2,
    title: "Team meeting",
    start: new Date(2023, 5, 3),
    end: new Date(2023, 5, 3),
    completed: true,
  },
  {
    id: 3,
    title: "Review code",
    start: new Date(2023, 5, 5),
    end: new Date(2023, 5, 5),
    completed: false,
  },
  // Add more tasks as needed
]

export const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const eventStyleGetter = (event: any) => {
    const style = {
      backgroundColor: event.completed ? "hsl(var(--primary))" : "hsl(var(--muted))",
      color: event.completed ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
      border: "none",
    }
    return { style }
  }

  const handleSelectEvent = (event: any) => {
    setSelectedDate(event.start)
  }

  const TaskList = ({ date }: { date: Date }) => {
    const dayTasks = tasks.filter((task) => task.start.toDateString() === date.toDateString())

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Tasks for {format(date, "MMMM d, yyyy")}</h3>
        <ul className="space-y-2">
          {dayTasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-2">
              {task.completed ? (
                <CheckCircle2 className="text-primary h-5 w-5" />
              ) : (
                <Circle className="text-muted-foreground h-5 w-5" />
              )}
              <span>{task.title}</span>
              <Badge variant={task.completed ? "default" : "secondary"}>
                {task.completed ? "Completed" : "Pending"}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
          />
        </div>
        {selectedDate && <TaskList date={selectedDate} />}
      </CardContent>
    </Card>
  )
}

