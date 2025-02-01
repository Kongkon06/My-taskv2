import { useNavigate } from "react-router-dom";
import '../App.css';
import { Appbar } from "../Components/Appbar";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { parentid, task_com, todoatom } from "../Atoms/Atoms";
import { DATABASE_URL } from "../config";
import { NewSidebar } from "../Components/NewSidebar";
import axios from "axios";
import { Dailypage } from "./NewDailyList";
import { NewAppbar } from "../Components/NewAppbar";
export function NewHome() {
  const navigate = useNavigate();
  const userid = useRecoilValue(parentid);
  const [todo, settodo] = useRecoilState(todoatom);
  useEffect(() => {
    axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`, {
      userId: userid
    }).then(response => {
      settodo(response.data.Todos);
      console.log(response.data.Todos);
    })
  }, [todoatom, userid]);
  return <div className="h-screen ">
    <NewAppbar/>
    <div className="h-1/4">
    <img src="/fix.jpg" className="h-full w-full object-cover object-custom" />
    </div>
    <div className=" px-4 flex bg-slate-800 h-full">
      <div className="h-auto w-1/5 p-2 mr-5 mt-4 border border-red-700 rounded-xl">
        <NewSidebar />
      </div>
      <div className="h-full w-full font-dm-sans pt-4 grid grid-cols-8 grid-rows-3 gap-5">
        <div role="button" onClick={() => { navigate('/Create') }} className="col-span-2 flex items-center justify-center rounded-xl bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 sm:size-20 stroke-slate-200">
            <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div className="col-span-4 p-4 rounded-xl bg-slate-200">
          <div className="text-xl text-slate-900 ">Week Progress</div>
          <div className="text-medium font-dm-sans mt-2">Goal 1</div>
          <div className="w-full flex justify-center mt-2"> <Week /> </div>
          <div className="w-full flex justify-center mt-2"> <Week_Names /> </div>
          <div className="text-medium font-dm-sans mt-4">Goal 2</div>
          <div className="w-full flex justify-center mt-2"> <Week /> </div>
          <div className="w-full flex justify-center mt-2"> <Week_Names /> </div>
        </div>
        <div className="col-span-2 flex justify-center items-center rounded-xl bg-slate-200">
          <div className="w-56 h-56 b-4 b-green-400 flex justify-center items-center rounded-full bg-slate-900 text-slate-200">
            Number of task completed
          </div>
        </div>
        <div className="col-span-3 row-span-2 p-4 rounded-xl bg-slate-200">
          <div role="button" onClick={() => {
            navigate('/goals');
          }} className="w-1/5 text-xl p-2 bg-slate-900 text-slate-200 flex justify-between items-center rounded-3xl">Goals
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" />
              </svg>
            </div>
          </div>
          <div className="h-auto mt-4 w-full grid grid-cols-2 gap-4">
            {todo.map((task) => (
              <Todo
                key={task.id}
                name={task.name}
                id={task.id}
                status={task.status}
                fn={() => { }}
                del={() => { }}
              />
            ))}

          </div>
        </div>
        <div className="col-span-5 row-span-2 p-4 rounded-xl bg-slate-200">
          <div className="text-medium text-slate-900 text-xl">Daily task</div>
          <div className=" flex gap-5 h-full w-full">
            <div className="mt-2 w-1/2">
              <Dailypage />
            </div>
            <div className="bg-red-400 w-1/2 h-auto"> hi there</div>
          </div>
        </div>
      </div>
    </div>

  </div>
}

function Week() {
  return <div className="w-auto h-auto flex gap-8">
    <div className="w-16 h-6 rounded-3xl bg-slate-700"></div>
    <div className="w-16 h-6 rounded-3xl bg-green-400"></div>
    <div className="w-16 h-6 rounded-3xl bg-slate-700"></div>
    <div className="w-16 h-6 rounded-3xl bg-slate-700"></div>
    <div className="w-16 h-6 rounded-3xl bg-green-400"></div>
    <div className="w-16 h-6 rounded-3xl bg-green-400"></div>
    <div className="w-16 h-6 rounded-3xl bg-slate-700"></div>
  </div>
}
function Week_Names() {
  return <div className="w-auto font-dm-sans flex gap-8">
    <div className="w-16 h-6 flex justify-center">Mon</div>
    <div className="w-16 h-6 flex justify-center">Tues</div>
    <div className="w-16 h-6 flex justify-center">Wed</div>
    <div className="w-16 h-6 flex justify-center">Thur</div>
    <div className="w-16 h-6 flex justify-center">Fri</div>
    <div className="w-16 h-6 flex justify-center">Sat</div>
    <div className="w-16 h-6 flex justify-center">Sun</div>
  </div>
}
function Todo({ id, name, fn, status, del }: { id: number, name: string, fn: () => void, status: boolean, del: () => void }) {
  const [is_com, set_com] = useRecoilState(task_com(id));
  const [color, setColor] = useState("bg-slate-950");
  useEffect(() => {
    set_com(status);
    setColor(is_com ? "bg-green-600" : "bg-indigo-900");
  }, [status, set_com, is_com]);
  return <div className={` ${color} font-dm-sans rounded-xl flex justify-center items-center font-semibold text-white p-2 w-full h-36`}>
    {name}
  </div>
}
