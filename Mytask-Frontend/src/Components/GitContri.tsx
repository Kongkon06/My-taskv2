import { Calendar } from 'lucide-react';

const GitHubContributions = () => {
  // Helper to generate sample data for current month
  const generateMonthData = () => {
    const data = [];
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
        day: date.getDate()
      });
    }
    return data;
  };

  const contributions = generateMonthData();

  // Get contribution level (0-4) based on count
  const getContributionLevel = (count: any) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 8) return 3;
    return 4;
  };

  // Get color based on contribution level
  const getColor = (level: any) => {
    switch (level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-green-100';
      case 2: return 'bg-green-300';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-700';
      default: return 'bg-gray-100';
    }
  };

  // Calculate total contributions
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  const activeCount = contributions.filter(day => day.count > 0).length;

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="w-5 h-5" />
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {totalContributions} contributions in {activeCount} active days
        </p>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-[3px]">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs text-gray-500 h-4 text-center mb-1">
              {day}
            </div>
          ))}

          {/* Empty cells for proper calendar alignment */}
          {Array(new Date(contributions[0].date).getDay()).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="w-[10px] h-[10px]" />
          ))}

          {/* Contribution cells */}
          {contributions.map((day) => {
            const level = getContributionLevel(day.count);
            return (
              <div
                key={day.date}
                className="relative group"
              >
                <div
                  className={`w-[10px] h-[10px] rounded-sm ${getColor(level)} 
                    hover:ring-1 hover:ring-gray-300 transition-all cursor-pointer`}
                />
                <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded p-2 -mt-8 -ml-2 z-10 whitespace-nowrap">
                  {day.count} contributions on {day.weekday}, {day.date}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-6 text-xs text-gray-600 justify-center">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-sm ${getColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
