import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Appbar } from '../Components/Appbar';

type CalendarValue = Date | Date[] | [Date, Date] | null;

function Calc() {
  const [date, setDate] = useState<CalendarValue>(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2024, 0, 3), event: 'Design review', time: '10AM' },
    { date: new Date(2024, 0, 3), event: 'Sales meeting', time: '2PM' },
    { date: new Date(2024, 0, 7), event: 'Date night', time: '6PM' },
    { date: new Date(2024, 0, 12), event: "Sam's birthday party", time: '2PM' },
    { date: new Date(2024, 0, 22), event: 'Maple syrup museum', time: '3PM' },
    { date: new Date(2024, 0, 22), event: 'Hockey game', time: '7PM' },
    { date: new Date(2024, 1, 5), event: 'Cinema with friends', time: '9PM' },
  ]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const currentDayEvents = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );
      return currentDayEvents.map((event, index) => (
        <div key={index} className="w-auto h-auto border-x border-slate-700 flex flex-col items-start p-2">
          <span className="text-xs font-semibold">{event.event}</span>
          <span className="text-xs text-gray-500">{event.time}</span>
        </div>
      ));
    }
    return null;
  };

  const handleDateChange = (value: CalendarValue) => {
    setDate(value);
  };

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <h1 className="text-2xl font-dm-sans font-bold mb-4">Calendar</h1>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <Calendar
            onChange={()=>{handleDateChange}}  // Add the onChange prop
            tileContent={tileContent}
            tileClassName={`flex items-top sm:w-auto sm:h-auto  sm:lg:w-28 lg:h-28 `}
            defaultActiveStartDate={new Date()}
            className="w-full h-auto border-none font-dm-sans"
          />
        </div>
      </div>
    </div>
  );
}

export default Calc;
