import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay, parseISO, isBefore, isAfter } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { Daily, dailyatom } from '../Atoms/Atoms';
import { Appbar } from '../Components/Appbar';

function TrackProgressCalendar() {
  const daily = useRecoilValue(dailyatom); 
  const today = new Date();  // Get today's date

  const isCompletedOnDate = (task: Daily, day: Date) => {
    return task.completions.some(completion =>
      isSameDay(parseISO(completion.date), day) && completion.completed
    );
  };

  const isInProgressOnDate = (task: Daily, day: Date) => {
    const createdAtDate = parseISO(task.createdAt);
    return (isAfter(day, createdAtDate) || isSameDay(day, createdAtDate)) && isBefore(day, today);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return daily
        .filter(task => isInProgressOnDate(task, date))
        .map((task, index) => {
          const isCompleted = isCompletedOnDate(task, date);
          return (
            <div key={index} className="w-auto h-auto flex flex-col items-center p-1">
              <span
                className={`text-xs font-bold ${isCompleted ? 'text-green-600' : 'text-red-600'}`}
              >
                {task.title}
              </span>
            </div>
          );
        });
    }
    return null;
  };

  // Update this function to handle 'CalendarValue' type properly

  return (
    <div >
      <Appbar/>
      <div className="flex flex-col font-dm-sans items-center justify-center h-auto bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Daily Task Progress</h1>
      <Calendar
        tileContent={tileContent}
        tileClassName={"lg:w-28 lg:h-28"}
        defaultActiveStartDate={new Date()}
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6"// Updated handler to match react-calendar's event
      />
      </div>
    </div>
  );
}

export default TrackProgressCalendar;
