import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DATABASE_URL } from "@/config";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoatom } from "@/Atoms/Atoms";
import Hook from "./Hook";
import { GradientCard } from "@/Components/FancyCard";

export default function (){
    const [goals,setGoals]= useRecoilState(todoatom);
    useEffect(()=>{
        axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`,{
            userId:0
        }).then(response=>{
            setGoals(response.data.Todos);
        })
    },[]);
    return (
        <Card className="min-h-64 text-white border bg-slate-900 border-purple-800">
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
            {goals.map((task) => (
        <Todo
          key={task.id}
          name={task.name}
          id={task.id}
          status={task.status}
          fn={() => {}}
          del={() => {}}
        />))}
            </div>
          </CardContent>
        </Card>
      )
}
function Todo({ id, name, fn,del}:{id:number, name:string, fn:()=>void, status:boolean,del:()=>void}){
    return <div className={`relative font-dm-sans rounded-md font-semibold text-white p-2 w-full h-auto`}>
      <div className="absolute inset-0 overflow-hidden">
        <GradientCard/>
      </div>
      <div className="relativeblur-xl"></div>
      <div className="relative sm:col-span-1 hidden sm:block">
      <div className="flex justify-center items-center">
        <Hook del={del} fn={fn} name={name} id={id}/>
      </div>
    </div>
    </div>
}