import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parseISO, isSameDay, isAfter, startOfDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Badge } from "../Components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { Sidebar } from "../Components/Sidebar";
import { useRecoilValue } from "recoil";
import { dailyatom } from "@/Atoms/Atoms";

// Localizer setup
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse: (dateString: any) => parseISO(dateString),
  startOfWeek: () => new Date(),
  getDay: (date: any) => date.getDay(),
  locales,
});


export const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const daily = useRecoilValue(dailyatom)
  const today = startOfDay(new Date());

  useEffect(() => {
    const mappedEvents: any[] = [];

    daily.forEach((task) => {
      const createdAt = startOfDay(parseISO(task.createdAt));

      let currentDate = createdAt;
      while (isAfter(today, currentDate) || isSameDay(today, currentDate)) {
        const completion = task.completions.find((c:any) =>
          isSameDay(parseISO(c.date), currentDate)
        );
        mappedEvents.push({
          id: task.id,
          title: task.title,
          start: currentDate,
          end: currentDate,
          completed: !!completion,
        });

        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    });

    setEvents(mappedEvents);
  }, []);

  const eventStyleGetter = (event: any) => ({
    style: {
      backgroundColor: event.completed ? "hsl(142.1 76.2% 36.3%)" : "hsl(215.4 16.3% 46.9%)",
      color: "hsl(210 40% 98%)",
      border: "none",
      borderRadius: "4px",
      padding: "2px 6px",
      fontSize: "0.875rem",
    },
  });

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 p-6">
        <Card className="w-full bg-black border-slate-800">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-slate-100 font-kubo">Task Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <style>
              {`
               .rbc-toolbar button {
                color: white !important;
                }

                .rbc-toolbar button:hover {
                color:hsl(215.4 16.3% 46.9%) !important;
                }

                .rbc-toolbar-label {
                color: white !important;
                }
                .rbc-toolbar-label:hover {
                color:hsl(215.4 16.3% 46.9%) !important;
                }
                .rbc-header {
                color: white !important;
                }

                .rbc-button-link {
                color: white !important;
                }

                .rbc-off-range-bg {
                background-color: rgba(0, 0, 0, 0.1) !important;
                }

                .rbc-today {
                background-color: rgba(255, 255, 255, 0.1) !important;
                }

              `}
            </style>
            <div className="h-[600px] rounded-lg overflow-hidden border border-slate-800">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => setSelectedDate(event.start)}
                className="dark-calendar text-slate-100"
                views={["month"]}
                messages={{
                  today: "Today",
                  previous: "Previous",
                  next: "Next",
                }}
              />
            </div>
            {selectedDate && (
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  Tasks for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                <ul className="space-y-3">
                  {events
                    .filter((event) => isSameDay(event.start, selectedDate))
                    .map((event) => (
                      <li key={event.id} className="flex items-center space-x-3 text-slate-100">
                        {event.completed ? (
                          <CheckCircle2 className="text-emerald-500 h-5 w-5" />
                        ) : (
                          <Circle className="text-rose-500 h-5 w-5" />
                        )}
                        <span className="flex-1">{event.title}</span>
                        <Badge
                          variant={event.completed ? "default" : "secondary"}
                          className={event.completed ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}
                        >
                          {event.completed ? "Completed" : "Uncompleted"}
                        </Badge>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;