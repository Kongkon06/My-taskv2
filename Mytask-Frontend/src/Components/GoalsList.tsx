import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { parentid, todoatom } from "@/Atoms/Atoms";
import { GradientCard } from "@/Components/FancyCard";
import Hook from "./Hook";
import { useNavigate } from "react-router-dom";

export default function (){
    const goals= useRecoilValue(todoatom);
    return ( (goals.length !=0 ?  <Card className="min-h-64 relative overflow-hidden text-white border bg-slate-900 border-none">
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
      id={task.id}
    />))}
        </div>
      </CardContent>
    </Card>:<div></div>)
      )
}
function Todo({id, name}:{ id:number,name:string}){
  const setParentId = useSetRecoilState(parentid);
  const navigate = useNavigate();
    return <div className={`relative border border-black font-dm-sans rounded-md font-semibold text-white p-2 w-full h-auto`}>
      <div className="absolute inset-0 overflow-hidden">
        <GradientCard/>
      </div>
      <div className="relativeblur-xl"></div>
      <div className="relative sm:col-span-1 hidden sm:block">
      <div role="button" onClick={()=>{setParentId(id);navigate(`/plans/${name}`)}} className="flex justify-center items-center">
        <Hook name={name}/>
      </div>
    </div>
    </div>
}