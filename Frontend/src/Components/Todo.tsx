import { useEffect,useState } from "react";
import { task_com } from "../Atoms/Atoms";
import { useRecoilState } from "recoil";
import { Deleteicon } from "./Deleteicon";
import { Threedots } from "./Threedots";
export function Todo({ id, name, fn, status,del}:{id:number, name:string, fn:()=>void, status:boolean,del:()=>void}){
    const [is_com, set_com] = useRecoilState(task_com(id));  
    const [color, setColor] = useState("bg-slate-950");
    useEffect(() => {
      set_com(status);
      setColor(is_com ? "bg-green-600" : "bg-indigo-950");
    }, [status, set_com,is_com]);
    return <div className={`shadow-lg shadow-slate-700 ${color} font-dm-sans rounded-md font-semibold text-white p-2 w-full mobile:h-auto mobile:text-sm mobile:grid grid-rows-2 lg:grid-rows-3 lg:h-48 lg:text-2xl`}>
      <div className="sm:col-span-1 hidden sm:block">
        <div className="w-full p-1 flex justify-between">
          <Deleteicon del={del}/>
          <Threedots parentId={id}/>
          </div>
      </div>
      <div role="button"
      onClick={fn} className="row-span-1 flex justify-center items-center">{name}</div>
    </div>
}