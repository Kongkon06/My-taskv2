import { Sidebar } from "@/Components/Sidebar"
import { TaskList } from "@/Components/TaskList"
import { PlusCircle } from "lucide-react"
import TaskProgressCircle from "@/Components/TaskCircle"
import Goals from "@/Components/GoalsList";
import WeeklyProgress from "@/Components/WeeklyProgress";
import { Appbar } from "@/Components/Appbar"
import TaskCreationOverlay from "@/Components/TaskCreation";
import { useEffect, useState } from "react";
import axios from "axios";
import { DATABASE_URL } from "@/config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dailyatom, todoatom, userAtom } from "@/Atoms/Atoms";
const GradientCard = () => (
  <svg 
    className="absolute top-0 left-0 w-full" 
    style={{ 
      height: '150%',
      minHeight: '400px'
    }} 
    preserveAspectRatio="xMidYMin slice" 
    viewBox="0 0 283 290" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H151H216H249.5H263C274.046 0 283 8.95431 283 20V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
      fill="url(#paint0_linear_98_2)"
    />
    <g clipPath="url(#paint1_angular_98_2_clip_path)">
      <g transform="matrix(-0.1225 0.178 -0.178 -0.1225 122.5 112)">
        <foreignObject x="-1085.33" y="-1085.33" width="2170.67" height="2170.67">
          <div
            style={{
              background:
                "conic-gradient(from 90deg, rgba(166, 20, 44, 0.3158) 0deg, rgba(190, 22, 22, 0.2) 12.8811deg, rgba(19, 0, 127, 1) 61.2748deg, rgba(0, 0, 0, 1) 186.719deg, rgba(28, 2, 173, 1) 283.916deg, rgba(166, 20, 44, 0.3158) 360deg)",
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          />
        </foreignObject>
      </g>
    </g>
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
    />
    <defs>
      <clipPath id="paint1_angular_98_2_clip_path">
        <path d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5V16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z" />
      </clipPath>
      <linearGradient id="paint0_linear_98_2" x1="150" y1="118.5" x2="422" y2="-179" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000FB9" />
        <stop offset="0.295" stopColor="#D1466D" />
        <stop offset="0.640786" stopColor="#FF0048" />
      </linearGradient>
    </defs>
  </svg>
);

interface CreateTask{
  title:string,
  category:string,
  description:string,
  userId:string,
}
export function Home() {
  const [isTaskOverlayOpen, setIsTaskOverlayOpen] = useState(false);
  const userId = useRecoilValue(userAtom);
  const setParent = useSetRecoilState(todoatom);
  const setDaily = useSetRecoilState(dailyatom);
  const handleTaskSubmit = async (taskData: CreateTask) => { 
    if(taskData.category == 'Todo'){
      await axios.post(`${DATABASE_URL}/api/v2/${taskData.category}`,{
        name:taskData.title,
        description:taskData.description,
        userId:userId
      })
    }else{
      await axios.post(`${DATABASE_URL}/api/v2/${taskData.category}/create`,{
        title:taskData.title,
        description:taskData.description,
        userId:userId
      })
    }
  }
  const fetchParent = async () =>{
    const res =await axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`,{
      id:Number(userId)
    })
    console.log(res.data);
    setParent(res.data.Todos);
  }

  const fetchChild = async ()=>{
    const res = await axios.post(`${DATABASE_URL}/api/v2/Daily`,{
      userId:Number(userId)
    });
    console.log(res.data);
    setDaily(res.data);
  }
  useEffect(()=>{
    fetchChild();
    fetchParent();
  },[])
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Appbar />
        <main className="flex-1 mt-16 p-6 overflow-auto">
          <div className="grid grid-cols-8 gap-6">
            {/* First row */}
            <div className="col-span-2 space-y-4 min-h-64">
              <button onClick={()=>setIsTaskOverlayOpen(true)} className="relative w-full h-full min-h-[200px] overflow-hidden rounded-lg group">
                <GradientCard />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-transform duration-200 group-hover:scale-105">
                  <PlusCircle className="w-8 h-8 mb-2" />
                  <span className="text-3xl font-kubo">Add Task</span>
                </div>
              </button>
            </div>
            <div className="col-span-4 min-h-64 h-full">
              <WeeklyProgress/>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <TaskProgressCircle progress={62.5} total={8} completed={5} />
            </div>
            {/* Second row */}
            <div className="col-span-3">
              <Goals />
            </div>
            <div className="col-span-3 h-full">
              <TaskList />
            </div>
          </div>
        </main>
      </div>
      <TaskCreationOverlay
        isOpen={isTaskOverlayOpen}
        onClose={() => setIsTaskOverlayOpen(false)}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
}

