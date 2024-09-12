import { useEffect } from "react";
import { Dailytask } from "../Components/Dailytask"; 
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { dailyatom, parentid } from "../Atoms/Atoms";
import { isOpen } from "../Atoms/Atoms";
import { Editpanel } from "./Editpanel";
import { DATABASE_URL } from "../config";
export function Dailypage(){
    const userid = useRecoilValue(parentid)
    const [daily,setdaily] = useRecoilState(dailyatom)
    useEffect(()=>{
        axios.post(`${DATABASE_URL}/api/v2/Daily`,{
            userId:userid
        }).then((res)=>{
            setdaily(res.data);
        });
    },[dailyatom])
    return <div className="w-full h-auto border-2  border-indigo-900 p-3 bg-slate-900">
        <div className="flex justify-center font-dm-sans font-semibold mb-2 text-xl text-white">Daily task</div>
        <div className="mb-2">
        {daily.map((task)=>(
            <Dailytask key={task.id} id={task.id} name={task.title} completions={task.completions}/>
        ))}
        </div>
        <div><Addbutton/></div>
    </div>
}
function Addbutton() {
    const [Open, setIsOpen] = useRecoilState(isOpen('Editpanel'));
    const toggleDropdown = () => {
        setIsOpen(!Open);
    };

    return (
        <div className="w-full relative inline-block text-left">
            {Open && (
                <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black bg-opacity-0" onClick={toggleDropdown}></div>
            )}

            <div
                role={'button'}
                className={`z-20 flex justify-center items-center bg-indigo-900 font-dm-sans rounded-md font-semibold text-white p-2 w-full mobile:h-full mobile:text-sm lg:h-full lg:text-2xl`}
                onClick={toggleDropdown}
                aria-expanded={Open}
                aria-haspopup="true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 sm:size-10">
                    <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

            {Open && (
                <div className="fixed inset-0 z-20 flex justify-center items-center">
                    <Editpanel />
                </div>
            )}
        </div>
    );
}