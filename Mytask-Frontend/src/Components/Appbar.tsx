import { useNavigate } from "react-router-dom"
import DrawerNavigation from "./Sidebar";

export const Appbar = ()=>{
    const navigate = useNavigate();
    return<div  className="w-sm flex justify-between items-center mb-5 p-2 border-b border-blue-800 bg-slate-950 p-2 sm:w-full border-b bg-indigo-950 flex justify-center md:text-lg lg:text-3xl">
        <div className="w-md"><DrawerNavigation/></div>
        <div onClick={()=>{navigate('/')}} className=" font-semibold text-white cursor-pointer font-dm-sans">My Task</div>
        <div className="w-md text-md text-white cursor-pointer">{`(▀̿ĺ̯▀̿ ̿)`}</div>
    </div>
}