import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const WeeklyProgress = () => {
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri","Sat","Sun"];
  const goals = ["Goal 1", "Goal 2", "Goal 3", "Goal 4"];
  
  // Generate random status for demonstration
  const getRandomStatus = () => {
    return Math.random() > 0.5 ? 'completed' : 'not-started';
  };

  const getStatusColor = (status:any) => {
    return status === 'completed' ? 'bg-black' : 'bg-gray-300';
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-center mb-4">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-y-4 items-center">
          <div className="h-6 w-12"></div>
          {days.map((day, index) => (
            <div key={index} className="text-center font-medium text-sm">
              {day}
            </div>
          ))}
          
          {goals.map((goal, goalIndex) => (
            <React.Fragment key={goalIndex}>
              <div className="font-medium text-sm text-gray-600">{goal}</div>
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
            <div className="w-4 h-4 bg-black"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300"></div>
            <span className="text-sm">Not Started</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;