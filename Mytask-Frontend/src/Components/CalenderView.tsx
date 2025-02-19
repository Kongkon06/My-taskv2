import React from "react"
import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format } from "date-fns/format"
import { parse } from "date-fns/parse"
import { startOfWeek } from "date-fns/startOfWeek"
import { getDay } from "date-fns/getDay"
import { enUS } from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle2, Circle } from "lucide-react"
import { Sidebar } from "./Sidebar"

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

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Complete project proposal",
    start: new Date(2025, 5, 1),
    end: new Date(2025, 5, 1),
    completed: false,
  },
  {
    id: 2,
    title: "Team meeting",
    start: new Date(2025, 5, 3),
    end: new Date(2025, 5, 3),
    completed: true,
  },
  {
    id: 3,
    title: "Review code",
    start: new Date(2025, 5, 5),
    end: new Date(2025, 5, 5),
    completed: false,
  },
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
    <div className="flex h-screen dark">
      <Sidebar />
      <Card className="w-full bg-background text-foreground">
        <CardHeader>
          <CardTitle>Task Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] calendar-dark">
            <Calendar
              localizer={localizer}
              events={tasks}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              className="dark-calendar"
            />
          </div>
          {selectedDate && <TaskList date={selectedDate} />}
        </CardContent>
      </Card>
      <style>{`
        .calendar-dark .rbc-calendar {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
        }

        .calendar-dark .rbc-header {
          background-color: hsl(var(--muted));
          color: hsl(var(--muted-foreground));
          border-bottom: 1px solid hsl(var(--border));
        }

        .calendar-dark .rbc-month-view {
          border: 1px solid hsl(var(--border));
        }

        .calendar-dark .rbc-day-bg {
          background-color: hsl(var(--background));
        }

        .calendar-dark .rbc-off-range-bg {
          background-color: hsl(var(--muted));
        }

        .calendar-dark .rbc-today {
          background-color: hsl(var(--accent));
        }

        .calendar-dark .rbc-button-link {
          color: hsl(var(--foreground));
        }

        .calendar-dark .rbc-show-more {
          color: hsl(var(--primary));
          background-color: transparent;
        }

        .calendar-dark .rbc-row-segment {
          padding: 2px 4px;
        }

        .calendar-dark .rbc-event {
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default CalendarView