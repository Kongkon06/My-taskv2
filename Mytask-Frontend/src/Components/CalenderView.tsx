import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import { parse } from "date-fns";
import { startOfWeek } from "date-fns";
import { getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { CheckCircle2, Circle } from "lucide-react";

const locales = {
    "en-US": enUS,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  
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
    {
        id: 4,
        title: "code create",
        start: new Date(2025, 5, 5),
        end: new Date(2025, 5, 5),
        completed: false,
      },
  ];
  
  export const CalendarView: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
    // Custom styles for dark theme calendar
    const customStyles = {
      className: "shadow-none bg-slate-900 dark",
      style: {
        height: "100%",
      },
    };
  
    // Event styling for dark theme
    const eventStyleGetter = (event: any) => ({
      style: {
        backgroundColor: event.completed 
          ? "hsl(var(--primary))" 
          : "hsl(var(--muted))",
        color: event.completed 
          ? "hsl(var(--primary-foreground))" 
          : "hsl(var(--muted-foreground))",
        border: "none",
        borderRadius: "4px",
        padding: "2px 6px",
      },
    });
  
    const handleSelectEvent = (event: any) => {
      setSelectedDate(event.start);
    };
  
    // Custom styles for the dark theme calendar
    const darkThemeStyles = `
      .rbc-calendar {
        color: hsl(var(--foreground));
      }
      .rbc-off-range-bg {
        background-color: hsl(var(--muted)/0.3);
      }
      .rbc-today {
        background-color: hsl(var(--accent)/0.3);
      }
      .rbc-header {
        color: hsl(var(--foreground));
        border-bottom: 1px solid hsl(var(--border));
      }
      .rbc-month-view {
        border: 1px solid hsl(var(--border));
      }
      .rbc-day-bg + .rbc-day-bg,
      .rbc-month-row + .rbc-month-row {
        border-color: hsl(var(--border));
      }
    `;
  
    const TaskList = ({ date }: { date: Date }) => {
      const dayTasks = tasks.filter(
        (task) => task.start.toDateString() === date.toDateString()
      );
  
      return (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground">
            Tasks for {format(date, "MMMM d, yyyy")}
          </h3>
          <Separator className="my-4" />
          <ScrollArea className="h-[200px] pr-4">
            <ul className="space-y-4">
              {dayTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="text-primary h-5 w-5" />
                    ) : (
                      <Circle className="text-muted-foreground h-5 w-5" />
                    )}
                    <span className="font-medium text-foreground">{task.title}</span>
                  </div>
                  <Badge variant={task.completed ? "default" : "secondary"}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      );
    };
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Task Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <style>{darkThemeStyles}</style>
          <div className="h-[600px] rounded-md border border-border">
            <BigCalendar
              localizer={localizer}
              events={tasks}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              {...customStyles}
              views={["month"]}
              className="rounded-md bg-background p-4"
            />
          </div>
          {selectedDate && <TaskList date={selectedDate} />}
        </CardContent>
      </Card>
    );
  };