import '../App.css';

const WeeklyProgress = ({ taskName, progressData }:{taskName:string,progressData:any}) => {
  const totalWeeks = progressData.length;
  const totalProgress = progressData.reduce((acc:any, curr:any) => acc + curr, 0);
  const averageProgress = totalWeeks ? (totalProgress / totalWeeks).toFixed(2) : 0;

  return (
    <div className="weekly-progress-container">
      <h2 className="task-name">{taskName}</h2>
      <div className="progress-bar-container">
        {progressData.map((progress:any, index:any) => (
          <div
            key={index}
            className="progress-bar"
            style={{ width: `${progress}%` }}
            title={`Week ${index + 1}: ${progress}%`}
          />
        ))}
      </div>
      <div className="progress-summary">
        <p>Total Progress: {totalProgress}%</p>
        <p>Average Progress: {averageProgress}%</p>
      </div>
    </div>
  );
};

export default WeeklyProgress;