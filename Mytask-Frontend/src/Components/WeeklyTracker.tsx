
const WeeklyProgressTracker = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const goals = [
    {
      name: 'Exercise',
      progress: [true, true, false, true, false, true, false]
    },
    {
      name: 'Reading',
      progress: [true, true, true, false, false, false, false]
    },
    {
      name: 'Meditate',
      progress: [true, false, true, true, true, false, true]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="space-y-6">
        {goals.map((goal, goalIndex) => (
          <div key={goalIndex} className="space-y-2">
            <div className="text-sm text-gray-600">{goal.name}</div>
            <div className="flex gap-2">
              {goal.progress.map((completed, dayIndex) => (
                <div key={dayIndex} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-6 h-6 rounded-full transition-colors duration-200
                      ${completed ? 'bg-emerald-400' : 'bg-gray-100'}`}
                  />
                  <span className="text-xs text-gray-400">
                    {days[dayIndex]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressTracker;