import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { GradientCard } from './FancyCard';
import { useRecoilValue } from 'recoil';
import { todoatom } from '@/Atoms/Atoms';

const WeeklyProgress = () => {
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri","Sat","Sun"];
  const goals = useRecoilValue(todoatom);
  // Generate random status for demonstration
  const getRandomStatus = () => {
    return Math.random() > 0.5 ? 'completed' : 'not-started';
  };

  const getStatusColor = (status:any) => {
    return status === 'completed' ? 'bg-indigo-700' : 'bg-gray-300';
  };

  return ( goals.length !=0 ? <Card className="w-full h-full relative overflow-hidden bg-slate-900 border-none mx-auto">
      <div className='absolute inset-0'>
        <GradientCard/>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-center font-kubo relative mb-4 text-white">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent className='relative'>
        <div className="grid grid-cols-8 gap-y-4 items-center">
          <div className="h-6 w-12 "></div>
          {days.map((day, index) => (
            <div key={index} className="text-center text-white font-medium text-sm">
              {day}
            </div>
          ))}
          
          {goals.map((goal, goalIndex) => (
            <React.Fragment key={goalIndex}>    
            <div className="font-medium text-sm text-slate-300">
              {goal.name.length > 10 ? goal.name.slice(0, 10) + "..." : goal.name}
            </div>
              {days.map((_, dayIndex) => {
                const status = getRandomStatus();
                return (
                  <div
                    key={`${goalIndex}-${dayIndex}`}
                    className="relative h-4 w-full"
                  >
                    <div
                      className={`absolute inset-0 transform hover:scale-105 transition-transform duration-200 ${getStatusColor(status)}`}
                      style={{
                        clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                      }}
                    ></div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-800"></div>
            <span className="text-sm text-white">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300"></div>
            <span className="text-sm text-white">Not Started</span>
          </div>
        </div>
      </CardContent>
    </Card>
  :<div></div>);
};

export default WeeklyProgress;
