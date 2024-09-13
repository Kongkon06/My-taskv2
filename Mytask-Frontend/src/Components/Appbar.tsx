import { useNavigate } from "react-router-dom"
import DrawerNavigation from "./Sidebar";
import { useRecoilState } from "recoil";
import { parentid } from "../Atoms/Atoms";

export const Appbar = ()=>{
    const navigate = useNavigate();
    const [userid,setid] = useRecoilState(parentid);
    return<div  className="w-sm flex justify-between items-center mb-5 p-2 border-b border-blue-800 bg-slate-950 p-2 sm:w-full border-b bg-indigo-950 flex justify-center ">
        <div className="w-md"><DrawerNavigation/></div>
        <div onClick={()=>{navigate('/')}} className=" font-semibold text-white cursor-pointer font-dm-sans md:text-lg lg:text-3xl">My Task</div>
        <div role="button" onClick={()=>{
            if(userid === 0){
                setid(0)
            }
            navigate('/signin');

        }} className="w-md font-dm-sans rounded-3xl bg-slate-700 mr-2 px-2 py-1 text-md font-semibold text-white cursor-pointer">{userid === 0?"Signin":"Logout"}</div>
    </div>
}