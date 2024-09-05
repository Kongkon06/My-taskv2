import { useEffect, useState } from "react";
import { Dailytask } from "../Components/Dailytask";
import axios from "axios";
import { DATABASE_URL } from "../config";
interface Daily{
        "id": number,
        "title": string,
        "description": string
        "dueDate": string
        "repeatDaily": boolean,
        "createdAt": string,
        "updatedAt": string,
        "completions": []
}

export function Dailypage(){
    const [daily,setdaily] = useState<Daily[]>([]);
    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v2/Daily`).then((res)=>{
            setdaily(res.data);
        });
    },[])
    return <div className="w-full h-auto border-2  border-indigo-900 p-3 bg-slate-900">
        <div className="mb-2">
        {daily.map((task)=>(
            <Dailytask key={task.id} name={task.title}/>
        ))}
        </div>
    </div>
}