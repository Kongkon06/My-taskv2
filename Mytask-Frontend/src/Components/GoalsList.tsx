import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DATABASE_URL } from "@/config";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoatom, userAtom } from "@/Atoms/Atoms";
import { GradientCard } from "@/Components/FancyCard";
import Hook from "./Hook";

export default function (){
    const [goals,setGoals]= useRecoilState(todoatom);
    const userId = useRecoilValue(userAtom);
    useEffect(()=>{
      console.log(userId);
        axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`,{
            userId:userId
        }).then(response=>{
            setGoals(response.data.Todos);
        })
    },[]);
    return (
        <Card className="min-h-64 relative overflow-hidden text-white border bg-slate-900 border-none">
          <div className="absolute inset-0">
          <GradientCard/>
          </div>
          <CardHeader>
            <CardTitle className="relative font-kubo">Goals</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-2 gap-4">
            {goals.map((task) => (
        <Todo
          key={task.id}
          name={task.name}
        />))}
            </div>
          </CardContent>
        </Card>
      )
}
function Todo({ name}:{ name:string}){
    return <div className={`relative border border-black font-dm-sans rounded-md font-semibold text-white p-2 w-full h-auto`}>
      <div className="absolute inset-0 overflow-hidden">
        <GradientCard/>
      </div>
      <div className="relativeblur-xl"></div>
      <div className="relative sm:col-span-1 hidden sm:block">
      <div className="flex justify-center items-center">
        <Hook name={name}/>
      </div>
    </div>
    </div>
}